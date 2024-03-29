require("dotenv").config();
const path = require("path");

const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const crypto = require("crypto");
const passport = require("passport");
const { User } = require("./model/User");

const { createProduct } = require("./controller/Product");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const LocalStrategy = require("passport-local").Strategy;

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { isAuth, sanitizeUser, cookieExtractor } = require("./Services/common");
const { Order } = require("./model/Order");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    credentials: true,

    origin: [
      "https://main--shoppinghub12.netlify.app",
      "https://ecommerce-frontend-testing-server.onrender.com",
      "http://localhost:3000",
      "https://shoppinghub12.netlify.app",
    ],
  })
);

//middlewares
// server.use(express.static(path.resolve(__dirname, "build")));
server.use(cookieParser());
server.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

// server.use(express.raw({ types: "application/json" }));

server.use(passport.authenticate("session"));
server.use("/webhook", express.raw({ type: "application/json" }));
server.use(express.json()); // to parse req.body
server.use("/products", isAuth(), productsRouter.router); // We can also use JWT token for client-only auth
server.use("/categories", isAuth(), categoriesRouter.router);
server.use("/brands", isAuth(), brandsRouter.router);
server.use("/users", isAuth(), usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);

// ========================Build Section===============================
// this /order is clashing with react /orders
server.use("/orders", isAuth(), ordersRouter.router);
// This line we add to make react router work in case of other routes doesn't match
// server.get("*", (req, res) =>
//   res.sendFile(path.resolve("build", "index.html"))
// );

// passport strategy
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      console.log("user in local", { email, password, user });

      if (!user) {
        // arguments inside done : done( error , user , message)
        return done(null, false, { message: "Invalid credentials!" });
      }

      //  here we generate the hashedPassword with same parameters and compare the password that stored in database.
      // whene use llogin the it will run to athenticate the user
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          var token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          return done(null, { token });
        }
      );
    } catch (err) {
      return done(err);
    }
  })
);
//  Jwt strategy
//JWT options
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY; // shold not be in code in env file .
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

//   this creates session variable req.user on being called

passport.serializeUser(function (user, cb) {
  console.log("Serialize : ", user);
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      role: user.role,
    });
  });
});

//   this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log("Serialize : ", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

//========================  Payments Integration========================

const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);

// const calculateOrderAmount = (items) => {

//   return 1400;
// };

server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount, orderId } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, // for decimal compantation multiply (amount by 100  :-  eg. Rs 87 then send Rs.8700 )
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId, // This info will goto stripe => and then to our webhook
      //  so we can conclude that payment was successfull, even if client closes window after payf
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//  Payments Ends here

// Stripe Webhook

//TODO  :  we will capture actual order after deploying out server live on public

const endpointSecret = process.env.ENDPOINT_SECRET;

server.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;

        const order = await Order.findById(
          paymentIntentSucceeded.metadata.orderId
        );

        order.paymentStatus = "received";
        await order.save();
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("database connected");
}

server.get("/", (req, res) => {
  res
    .cookie("jwt", "thisisjwttoken", {
      sameSite: "none",
      secure: "true",
      maxAge: 3600000,
    })
    .json({ status: "success" });
});

server.listen(process.env.PORT, () => {
  console.log("server started");
});

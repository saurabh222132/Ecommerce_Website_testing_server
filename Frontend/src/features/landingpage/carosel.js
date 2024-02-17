import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Carousel } from "react-bootstrap"; // Import Bootstrap Carousel component

export const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div style={{ width: "100%", height: "500px", objectFit: "fill" }}>
      {/* Set the width of the container */}

      <Carousel
        className="carousel"
        activeIndex={index}
        onSelect={handleSelect}
        style={{ height: "400px" }}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dukaesoiy/image/upload/v1704802755/ecommerce/woman-3040029_1920_in74rc.jpg"
            alt="First slide"
            style={{ width: "100%", height: "500px", objectFit: "fill" }}
          />
          <Carousel.Caption>
            <h2 className=" text-2xl text-black font-bold">
              Discover Our Latest Collection!
            </h2>
            <p className=" text-black">
              Explore trendy styles and fresh arrivals for the season. Find your
              new favorites now!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src="https://res.cloudinary.com/dukaesoiy/image/upload/v1704804036/ecommerce/im1_sf5vcb.jpg"
            alt="Second slide"
            style={{ width: "100%", height: "500px", objectFit: "fill" }}
          />

          <Carousel.Caption>
            <h2 className=" text-2xl text-black font-bold">
              Unbeatable Deals Await!
            </h2>
            <p className=" text-black">
              Don't miss out on exclusive discounts and limited-time offers.
              Shop now and save big!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block "
            src="https://res.cloudinary.com/dukaesoiy/image/upload/v1704802753/ecommerce/ecommerce-3530785_1920_cla9oy.jpg"
            alt="Third slide"
            style={{ width: "100%", height: "500px", objectFit: "fill" }}
          />

          <Carousel.Caption>
            <h3 className=" text-2xl text-black font-bold">
              Tried, Tested, and Loved!
            </h3>
            <p className=" text-black">
              Check out our top-rated products that our customers can't get
              enough of. Find out what's hot right now!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send email to server)
    console.log("Submitted email:", email);
    // You can add your logic to send the email or perform other actions here
    setEmail(""); // Clear the email input after submission
  };

  return (
    <div className="container   mt-5">
      <h2 className="text-center mb-4">Subscribe to Our Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email Address"
                value={email}
                onChange={handleInputChange}
                required
              />
              <div className="input-group-append">
                <button className="btn bg-teal-600  btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsletterSignup;

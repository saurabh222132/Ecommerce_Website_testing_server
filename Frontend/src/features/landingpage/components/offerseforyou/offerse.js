import { useEffect, useState } from "react";
import { fetchProductByCategory } from "../../landAPI";
import ProductCardSkeleton from "../loading scalaton/scalaton";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

export const Offers = () => {
  const [products, setData] = useState([]);
  useEffect(() => {
    const response = fetchProductByCategory("laptops");
    response.then((res) => {
      setData(res.data.products);
    });
  }, []);

  return (
    <div>
      <div className="mb-2 mt-2 bg-slate-200  p-2">
        <h1 className=" text-2xl font-bold text-center p-3 ">Offers For You</h1>
      </div>
      {!products.length ? (
        <div className="col-lg-3 col-md-4 col-sm-12 p-2 mb-4">
          <ProductCardSkeleton />
        </div>
      ) : (
        <Row className="px-2">
          {products.map((item, index) => {
            return (
              <>
                <Col className="col-lg-3 col-md-4 col-sm-12  mb-4">
                  <div className="card h-100">
                    <img
                      src={item.thumbnail ? item.thumbnail : ""}
                      style={{ height: "70%" }}
                      className="card-img-top"
                      alt="---"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {item.title}
                        <p className="card-text float-lg-end  text-red-600 ">
                          {item.discountPercentage
                            ? `${item.discountPercentage}% `
                            : ""}
                          Off
                        </p>
                      </h5>

                      <p className="card-text float-lg-end text-green-600">
                        {item.price ? `₹${item.price}` : ""}
                      </p>
                      {item.rating ? (
                        <div className="d-flex align-items-center">
                          <span className="text-warning">&#9733;</span>
                          <span className="text-warning">&#9733;</span>
                          <span className="text-warning">&#9733;</span>
                          <span className="text-muted">&#9733;</span>
                          <span className="text-muted">&#9733;</span>
                          <small className="text-muted ml-2">
                            {item.rating}
                          </small>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Col>
              </>
            );
          })}
        </Row>
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import { fetchProductByCategory } from "../../landAPI";
import ProductCardSkeleton from "../loading scalaton/scalaton";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row } from "react-bootstrap";
import { Cards } from "../../Card/commonCards";

export const Featured = () => {
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
        <h1 className=" text-2xl font-bold text-center p-3 ">
          Featured Product
        </h1>
      </div>
      {!products.length ? (
        <div className="col-lg-3 col-md-4 col-sm-12 p-2 mb-4">
          <ProductCardSkeleton />
        </div>
      ) : (
        <Row className="px-2">
          {products.map((item, index) => {
            if (index == 4) return; // to show only 4 prducts
            return (
              <Cards
                productName={item.title}
                productPrice={item.price}
                proudctRating={item.rating}
                prodctThumbnails={item.thumbnail}
              ></Cards>
            );
          })}
        </Row>
      )}
    </div>
  );
};

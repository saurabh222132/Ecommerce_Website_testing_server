import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { Cards } from "../../Card/commonCards";

const products = [
  {
    title: "Smartphones",
    thumbnail:
      "https://images.samsung.com/is/image/samsung/p6pim/in/sm-e135flbdins/gallery/in-galaxy%C2%A0f13-sm-e135flbdins-532860868?$1300_1038_PNG$",
  },
  {
    title: "Laptops",
    thumbnail:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697017457/Croma%20Assets/Computers%20Peripherals/Laptop/Images/274071_0_mjqyby.png?tr=w-360",
  },
  {
    title: "Grocecies",
    thumbnail:
      "https://freepngimg.com/thumb/grocery/41619-7-groceries-free-download-image.png",
  },
  {
    title: "Furniture",
    thumbnail:
      "https://media.istockphoto.com/id/943910360/photo/posters-in-cozy-apartment-interior.jpg?s=612x612&w=0&k=20&c=QzNjsxCNMcFNxpn4E2ocPvSU8Ud2S3B_mHyo5L-HOLo=",
  },
];
export const Categories = () => {
  return (
    <>
      <div className="mb-2 mt-2 bg-slate-200  p-2">
        <h1 className=" text-2xl font-bold text-center p-3">
          Explore Our Categories
        </h1>
      </div>
      <Row className="px-2  text-center font-bold">
        {products.map((item, index) => {
          if (index == 4) return; // to show only 4 prducts
          return (
            <Cards
              key={index}
              productName={item.title}
              productPrice=""
              prudctRating=""
              prodctThumbnails={item.thumbnail}
            ></Cards>
          );
        })}
      </Row>{" "}
    </>
  );
};

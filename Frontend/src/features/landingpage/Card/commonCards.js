import { Row, Col } from "react-bootstrap";

export const Cards = ({
  productName,
  productPrice,
  proudctRating,
  prodctThumbnails,
}) => {
  return (
    <Col className="col-lg-3 col-md-4 col-sm-12  mb-4">
      <div className="card h-100">
        <img
          src={prodctThumbnails ? prodctThumbnails : ""}
          style={{ height: "70%" }}
          className="card-img-top"
          alt="---"
        />
        <div className="card-body">
          <h5 className="card-title">{productName}</h5>
          <p className="card-text float-lg-end text-green-600">
            {productPrice ? `₹${productPrice}` : ""}
          </p>
          {proudctRating ? (
            <div className="d-flex align-items-center">
              <span className="text-warning">&#9733;</span>
              <span className="text-warning">&#9733;</span>
              <span className="text-warning">&#9733;</span>
              <span className="text-muted">&#9733;</span>
              <span className="text-muted">&#9733;</span>
              <small className="text-muted ml-2">{proudctRating}</small>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Col>
  );
};

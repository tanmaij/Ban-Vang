import React, { useContext } from "react";
import demo from "../../Asset/demo.png";
import "./OneProduct.css";
import {
  Container,
  Row,
  InputGroup,
  FormControl,
  Col,
  Dropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom";
import CartContext from "../../context/CartContext";

const OneProduct = ({ data }) => {
  const cartContext = useContext(CartContext);
  const history = useHistory();
  return (
    <div
      className="OneProduct"
      style={{ padding: "10px", position: "relative" }}
    >
      <div
        className="detail"
        onClick={() => {
          history.push("/details/" + data.ProductId);
        }}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </div>
      <Row>
        <Col xs={12} xl={12} lg={12} sm={12}>
          <img className="OneProductThumbnail" src={data.Image} />
        </Col>
        <Col xs={12} xl={12} lg={12} sm={12}>
          <p
            className="info"
            style={{ textAlign: "center", fontWeight: "700" }}
          >
            {data.Name}
          </p>
        </Col>
        <Col xs={12} xl={12} lg={12} sm={12}>
          <p
            className="info"
            style={{ textAlign: "center", fontWeight: "700", color: "#c29958" }}
          >
            {data.Price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </Col>
      </Row>
      <div
        onClick={() => {
          cartContext.addProduct(data.ProductId);
        }}
        className="AddToCart"
      >
        Thêm vào giỏ
      </div>
    </div>
  );
};

export default OneProduct;

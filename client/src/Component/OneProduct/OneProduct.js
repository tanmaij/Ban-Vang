import React from "react";
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
const OneProduct = () => {
  return (
    <div
      className="OneProduct"
      style={{ padding: "10px", position: "relative" }}
    >
      <Row>
        <Col xs={4} xl={12} lg={12} sm={4}>
          <img className="OneProductThumbnail" src={demo} />
        </Col>
        <Col xs={4} xl={12} lg={12} sm={4}>
          <p
            className="info"
            style={{ textAlign: "center", fontWeight: "700" }}
          >
            Nhẫn Hoàng Kim
          </p>
        </Col>
        <Col xs={4} xl={12} lg={12} sm={4}>
          <p
            className="info"
            style={{ textAlign: "center", fontWeight: "700", color: "#c29958" }}
          >
            2.000.000 vnđ
          </p>
        </Col>
      </Row>
      <div className="AddToCart">Thêm vào giỏ</div>
    </div>
  );
};

export default OneProduct;

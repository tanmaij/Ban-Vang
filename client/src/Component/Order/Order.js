import React from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import "./Order.css";
import Status from "./Status";
const Oder = () => {
  return (
    <>
      <h3 style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
        Đơn hàng
      </h3>
      <Row
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <Col xs={12} xl={4} lg={4} sm={12}>
          <Form.Label>Chọn đơn hàng của bạn</Form.Label>
          <Form.Select aria-label="Chọn đơn hàng của bạn">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
      </Row>
      <div className="fix-table">
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sản phẩm</th>
              <th>Giá sản phẩm</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td className="status-td">Nhẫn hoàng kim</td>
              <td className="status-td">2.000.000 vnđ</td>
              <td className=" status-td">x2</td>
            </tr>
            <tr>
              <td>2</td>
              <td className="status-td">Nhẫn hoàng kim</td>
              <td className="status-td">2.000.000 vnđ</td>
              <td className=" status-td">x2</td>
            </tr>
            <tr>
              <td>3</td>

              <td className="status-td">Nhẫn hoàng kim</td>
              <td className="status-td">2.000.000 vnđ</td>
              <td className=" status-td">x2</td>
            </tr>
            <tr style={{ fontWeight: "650" }}>
              <td></td>
              <td></td>
              <td>Tổng thành tiền</td>
              <td>2.000.000 vnđ</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Status />
    </>
  );
};

export default Oder;

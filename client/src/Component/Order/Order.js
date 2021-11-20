import React from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import "./Order.css";
import Status from "./Status";
const Oder = ({ data, detailData, getById }) => {
  let sum = 0;
  console.log(detailData);
  if (detailData != null)
    for (let i = 0; i < detailData.Details.length; i++) {
      sum += detailData.Details[i].Quantity * detailData.Details[i].Price;
    }
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
          <Form.Select
            onChange={(e) => getById(e.target.value)}
            aria-label="Chọn đơn hàng của bạn"
          >
            {data.map((item) => (
              <option value={item.ReceiptId}>
                Đơn hàng{" "}
                {`${new Date(item.CreatedAt).getDate()}-${
                  new Date(item.CreatedAt).getMonth() + 1
                }-${new Date(item.CreatedAt).getFullYear()}`}
              </option>
            ))}
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
            {detailData != null
              ? detailData.Details.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td className="status-td">{item.Name}</td>
                    <td className="status-td">
                      {item.Price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td className=" status-td">{item.Quantity}</td>
                  </tr>
                ))
              : null}
            <tr style={{ fontWeight: "650" }}>
              <td></td>
              <td></td>
              <td>Tổng thành tiền</td>
              <td>
                {sum.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
      {detailData != null ? (
        <Status
          status={detailData.Receipt.Status}
          payment={detailData.Receipt.PaymentMethod}
        />
      ) : null}
    </>
  );
};

export default Oder;

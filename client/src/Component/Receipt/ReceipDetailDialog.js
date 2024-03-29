import React, { useState } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import "./Receipt.css";
const ProductDialog = ({ dialogDetails, setdialogDetails }) => {
  let sum = 0;
  if (dialogDetails.data != null)
    for (let i = 0; i < dialogDetails.data.Details.length; i++) {
      sum +=
        dialogDetails.data.Details[i].Quantity *
        dialogDetails.data.Details[i].Price;
    }
  if (dialogDetails.dialogDetailShow && dialogDetails.data != null)
    return (
      <div className="account-dialog">
        <div
          onClick={() => {
            setdialogDetails({ ...dialogDetails, dialogDetailShow: false });
          }}
          className="close-dialog"
        ></div>
        <div className="dialog">
          <div className="profile">
            <div>
              Tài khoản:{" "}
              <span className="infor-user">
                {dialogDetails.data.Receipt.Username}
              </span>
            </div>
            <div>
              Họ và tên:{" "}
              <span className="infor-user">
                {dialogDetails.data.Receipt.Name}
              </span>
            </div>
            <div>
              CMND/CCCD:{" "}
              <span className="infor-user">
                {dialogDetails.data.Receipt.Identity}
              </span>
            </div>
            <div>
              Số điện thoại:{" "}
              <span className="infor-user">
                {dialogDetails.data.Receipt.Phone}
              </span>
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            Địa chỉ :{" "}
            <span className="infor-user">
              {dialogDetails.data.Receipt.CustomerAddress}
            </span>
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá sản phẩm</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {dialogDetails.data.Details.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img className="ImageProductCart" src={item.Image} />
                  </td>
                  <td>{item.Name}</td>
                  <td>
                    {item.Price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>{item.Quantity}</td>
                </tr>
              ))}

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
      </div>
    );
  else return null;
};

export default ProductDialog;

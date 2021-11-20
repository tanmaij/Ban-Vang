import React, { useState } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import demo from "../../Asset/demo.png";
import "../Receipt/Receipt.css";
const ProductDialog = ({ cartData, setcartData, handleSubmitReceipt }) => {
  let sum = 0;
  if (cartData.data != null)
    for (let i = 0; i < cartData.data.Carts.length; i++) {
      sum += cartData.data.Carts[i].Price * cartData.data.Carts[i].Num;
    }
  if (cartData.dialogShow == true && cartData.data != null)
    return (
      <div className="account-dialog">
        <div
          className="close-dialog"
          onClick={() => {
            setcartData({ ...cartData, dialogShow: false });
          }}
        ></div>
        <div className="dialog cartDialog">
          <div className="profile">
            <div>
              Tài khoản:{" "}
              <span className="infor-user">
                {cartData.data.Account.Username}
              </span>
            </div>
            <div>
              Họ và tên:{" "}
              <span className="infor-user">{cartData.data.Account.Name}</span>
            </div>
            <div>
              CMND/CCCD:{" "}
              <span className="infor-user">
                {cartData.data.Account.Identity}
              </span>
            </div>
            <div>
              Số điện thoại:{" "}
              <span className="infor-user">{cartData.data.Account.Phone}</span>
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            Địa chỉ :{" "}
            <span className="infor-user">{cartData.data.Address}</span>
          </div>
          <div style={{ marginBottom: "20px" }}>
            Cách thanh toán :
            <span className="infor-user">
              {cartData.data.Payment == "0" ? " Trực tiếp" : "Ví Mô Mô"}
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
              {cartData.data.Carts.map((item, index) => (
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
                  <td>{item.Num}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td style={{ fontWeight: "650" }}>Thành tiền</td>
                <td style={{ fontWeight: "650" }}>
                  {sum.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td></td>
              </tr>
            </tbody>
          </Table>
          <Button
            onClick={() => {
              handleSubmitReceipt();
            }}
            style={{ marginTop: "20px", float: "right" }}
            variant="light"
          >
            Xác nhận đơn
          </Button>
        </div>
      </div>
    );
  else return null;
};

export default ProductDialog;

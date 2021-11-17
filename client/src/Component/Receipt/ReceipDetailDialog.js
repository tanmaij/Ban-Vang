import React, { useState } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import demo from "../../Asset/demo.png";
import "./Receipt.css";
const ProductDialog = ({ dialogDetailShow, setdialogDetailShow }) => {
  if (dialogDetailShow)
    return (
      <div className="account-dialog">
        <div
          onClick={() => {
            setdialogDetailShow(false);
          }}
          className="close-dialog"
        ></div>
        <div className="dialog">
          <div className="profile">
            <div>
              Username: <span className="infor-user">Nguyễn Tấn Mãi</span>
            </div>
            <div>
              Họ và tên: <span className="infor-user">Nguyễn Tấn Mãi</span>
            </div>
            <div>
              CMND/CCCD: <span className="infor-user">123456789</span>
            </div>
            <div>
              Số điện thoại: <span className="infor-user">0986544321</span>
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            Địa chỉ : <span className="infor-user">Nguyễn Tấn Mãi</span>
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
              <tr>
                <td>1</td>
                <td>
                  <img className="ImageProductCart" src={demo} />
                </td>
                <td>Nhẫn hoàng kim</td>
                <td>2.000.000 vnđ</td>
                <td>
                  <Button variant="light">-</Button> x2{" "}
                  <Button variant="light">+</Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <img className="ImageProductCart" src={demo} />
                </td>
                <td>Nhẫn hoàng kim</td>
                <td>2.000.000 vnđ</td>
                <td>
                  <Button variant="light">-</Button> x2{" "}
                  <Button variant="light">+</Button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <img className="ImageProductCart" src={demo} />
                </td>
                <td>Nhẫn hoàng kim</td>
                <td>2.000.000 vnđ</td>
                <td>
                  <Button variant="light">-</Button> x2{" "}
                  <Button variant="light">+</Button>
                </td>
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
      </div>
    );
  else return null;
};

export default ProductDialog;

import React, { useState } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import ReceiptDiaLog from "./ReceiptDialog";
import ReceiptDetailDiaLog from "./ReceipDetailDialog";
import Pagination from "../Pagination/Pagination";
const Receipt = ({
  receiptState,
  setreceiptState,
  query,
  setquery,
  dialogDetails,
  setdialogDetails,
  getById,
  pagination,
  deleteReceipt,
  dialogUpdate,
  setdialogUpdate,
  updateReceipt,
}) => {
  const fixToPayment = (p, s) => {
    if (p == 0) {
      if (s == 1) return "Trên đường vận chuyển";
      else if (s == 2) return "Đã thanh toán";
      if (s == 3) return "Đã nhận hàng";
    } else if (p == 1) {
      if (s == 1) return "Đã thanh toán";
      else if (s == 2) return "Trên đường vận chuyển";
      if (s == 3) return "Đã nhận hàng";
    }
  };
  const fixToDate = (date) => {
    return `${new Date(date).getDate()}-${
      new Date(date).getMonth() + 1
    }-${new Date(date).getFullYear()}`;
  };
  const handleChangeQuery = (e) => {
    setquery({ ...query, [e.target.name]: e.target.value });
  };

  return (
    <div className="dashboard-page">
      <ReceiptDiaLog
        dialogUpdate={dialogUpdate}
        setdialogUpdate={setdialogUpdate}
        updateReceipt={updateReceipt}
      />
      <ReceiptDetailDiaLog
        dialogDetails={dialogDetails}
        setdialogDetails={setdialogDetails}
      />
      <Row>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Thanh toán</Form.Label>{" "}
          <Form.Select
            name="payment"
            value={query.payment}
            defaultValue={query.payment}
            aria-label="Payment"
            onChange={handleChangeQuery}
          >
            <option value="0">Trực tiếp</option>
            <option value="1">Ví mô mô</option>
          </Form.Select>{" "}
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Sắp xếp</Form.Label>{" "}
          <Form.Select
            name="order"
            value={query.order}
            defaultValue={query.order}
            aria-label="Sắp xếp"
            onChange={handleChangeQuery}
          >
            <option value="money">Thành tiền</option>
            <option value="createdAt">Ngày nhập</option>
          </Form.Select>{" "}
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Sắp xếp</Form.Label>{" "}
          <Form.Select
            name="sort"
            value={query.sort}
            defaultValue={query.sort}
            aria-label="Sắp xếp"
            onChange={handleChangeQuery}
          >
            <option value="asc">Tăng</option>
            <option value="desc">Giảm</option>
          </Form.Select>{" "}
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Tìm kiếm</Form.Label>{" "}
          <Form.Control
            name="like"
            value={query.like}
            defaultValue={query.like}
            type="text"
            placeholder="Nhập vào từ khóa"
            onChange={handleChangeQuery}
          />
        </Col>
      </Row>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tài khoản</th>
            <th>Ngày tạo</th>
            <th>Thanh toán</th>
            <th>Trạng thái</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {receiptState.data.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.Username}</td>
              <td>{fixToDate(item.CreatedAt)}</td>
              <td>{item.PaymentMethod == 0 ? "Trực tiếp" : "Ví Mô Mô"}</td>
              <td>{fixToPayment(item.PaymentMethod, item.Status)}</td>
              <td>
                {item.Money.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td>
                <Button
                  onClick={() => {
                    const warning = window.confirm(
                      "Bạn có chắc muốn xóa hóa đơn này?"
                    );
                    if (warning) deleteReceipt(item.ReceiptId);
                  }}
                  variant="danger"
                >
                  Xóa
                </Button>
                <Button
                  onClick={() => {
                    setdialogUpdate({
                      dialogReceiptShow: true,
                      data: {
                        payment: item.PaymentMethod,
                        id: item.ReceiptId,
                        status: item.Status,
                      },
                    });
                  }}
                  variant="light"
                >
                  Sửa
                </Button>
                <Button
                  onClick={() => {
                    getById(item.ReceiptId);
                  }}
                  variant="warning"
                >
                  Chi tiết
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination pagination={pagination} query={query} setquery={setquery} />
    </div>
  );
};

export default Receipt;

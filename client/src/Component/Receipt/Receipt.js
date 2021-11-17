import React, { useState } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import ReceiptDiaLog from "./ReceiptDialog";
import ReceiptDetailDiaLog from "./ReceipDetailDialog";
const Receipt = () => {
  const [dialogReceiptShow, setdialogReceiptShow] = useState(false);
  const [dialogDetailShow, setdialogDetailShow] = useState(false);
  return (
    <div className="dashboard-page">
      <ReceiptDiaLog
        dialogReceiptShow={dialogReceiptShow}
        setdialogReceiptShow={setdialogReceiptShow}
      />
      <ReceiptDetailDiaLog
        dialogDetailShow={dialogDetailShow}
        setdialogDetailShow={setdialogDetailShow}
      />
      <Row>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Thanh toán</Form.Label>{" "}
          <Form.Select aria-label="Admin/User">
            <option value="0">Đã thanh toán</option>
            <option value="1">Chưa thanh toán</option>
          </Form.Select>{" "}
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Sắp xếp</Form.Label>{" "}
          <Form.Select aria-label="Sắp xếp">
            <option value="0">Thành tiền</option>
            <option value="1">Ngày nhập</option>
          </Form.Select>{" "}
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Sắp xếp</Form.Label>{" "}
          <Form.Select aria-label="Sắp xếp">
            <option value="0">Tăng</option>
            <option value="1">Giảm</option>
          </Form.Select>{" "}
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Tìm kiếm</Form.Label>{" "}
          <Form.Control type="text" placeholder="Nhập vào từ khóa" />
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
          <tr>
            <th>1</th>
            <th>Maideptrai</th>
            <th>31-12-2021</th>
            <th>Ví mô mô</th>
            <th>Trên đường vận chuyển</th>
            <th>2.000.000 vnđ</th>
            <th>
              <Button
                onClick={() => {
                  window.confirm("Bạn có chắc muốn xóa hóa đơn này?");
                }}
                variant="danger"
              >
                Xóa
              </Button>
              <Button
                onClick={() => {
                  setdialogReceiptShow(true);
                }}
                variant="light"
              >
                Sửa
              </Button>
              <Button
                onClick={() => {
                  setdialogDetailShow(true);
                }}
                variant="warning"
              >
                Chi tiết
              </Button>
            </th>
          </tr>
          <tr>
            <th>1</th>
            <th>Maideptrai</th>
            <th>31-12-2021</th>
            <th>Ví mô mô</th>
            <th>Trên đường vận chuyển</th>
            <th>2.000.000 vnđ</th>
            <th>
              <Button variant="danger">Xóa</Button>
              <Button variant="light">Sửa</Button>
              <Button variant="warning">Chi tiết</Button>
            </th>
          </tr>

          <tr>
            <th>1</th>
            <th>Maideptrai</th>
            <th>31-12-2021</th>
            <th>Ví mô mô</th>
            <th>Trên đường vận chuyển</th>
            <th>2.000.000 vnđ</th>
            <th>
              <Button variant="danger">Xóa</Button>
              <Button variant="light">Sửa</Button>
              <Button variant="warning">Chi tiết</Button>
            </th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Receipt;

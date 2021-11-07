import React from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import demo from "../../Asset/demo.png";
import "./Cart.css";
const Cart = () => {
  return (
    <Container style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <h3 style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
        Giỏ hàng
      </h3>
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
      <Form style={{ padding: "40px" }}>
        <Row>
          <Col
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
            xs={6}
            xl={6}
            lg={6}
            sm={6}
          >
            <Form.Label>Họ tên</Form.Label>
            <Form.Control type="text" placeholder="Nguyễn Văn A . . ." />
          </Col>
          <Col
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
            xs={6}
            xl={6}
            lg={6}
            sm={6}
          >
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control type="text" placeholder="0898989898" />
          </Col>
          <Col
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
            xs={12}
            xl={12}
            lg={12}
            sm={12}
          >
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control type="text" placeholder="123 Hồ Tây ... " />
          </Col>
          <Col
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
            xs={6}
            xl={6}
            lg={6}
            sm={6}
          >
            <Form.Label>CMND/CCCD</Form.Label>
            <Form.Control type="text" placeholder="312488967" />
          </Col>

          <Col
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
            xs={6}
            xl={6}
            lg={6}
            sm={6}
          >
            <Form.Label>Cách thanh toán</Form.Label>
            <Form.Select aria-label="Thanh toán">
              <option>Trực tiếp</option>
              <option value="1">Ví momo</option>
            </Form.Select>
          </Col>
        </Row>
        <Button
          style={{ float: "right", padding: "10px", marginRight: "50px" }}
          variant="light"
          type="submit"
        >
          Xác nhận đơn
        </Button>
      </Form>
    </Container>
  );
};

export default Cart;

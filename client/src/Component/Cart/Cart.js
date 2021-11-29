import React from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import "./Cart.css";
const Cart = ({
  cartState,
  setCartstate,
  incProduct,
  authContext,
  handleSubmitCart,
  bill,
  setbill,
}) => {
  let sum = 0;
  if (cartState.data)
    for (let i = 0; i < cartState.data.length; i++) {
      sum += cartState.data[i].Price * cartState.data[i].Num;
    }
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
          {cartState.data
            ? cartState.data.map((item, index) => {
                return (
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
                    <td>
                      <Button
                        onClick={() => {
                          incProduct(item.ProductId, -1);
                        }}
                        variant="light"
                      >
                        -
                      </Button>{" "}
                      x{item.Num}
                      <Button
                        onClick={() => {
                          incProduct(item.ProductId, 1);
                        }}
                        variant="light"
                      >
                        +
                      </Button>
                    </td>
                  </tr>
                );
              })
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
      <Form onSubmit={handleSubmitCart} style={{ padding: "40px" }}>
        <Row>
          {/* <Col
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
          </Col> */}
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
            {" "}
            <h5>
              Thanh toán với tư cách{" "}
              {authContext.accountData != null
                ? authContext.accountData.Name
                : null}
            </h5>
          </Col>

          <Col
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
            xs={12}
            xl={6}
            lg={6}
            sm={12}
          >
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              defaultValue={bill.address}
              onChange={(e) => {
                setbill({ ...bill, address: e.target.value });
              }}
              type="text"
              placeholder="123 Hồ Tây ... "
            />
          </Col>

          <Col
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
            xs={12}
            xl={6}
            lg={6}
            sm={12}
          >
            <Form.Label>Cách thanh toán</Form.Label>
            <Form.Select
              defaultValue={bill.payment}
              onChange={(e) => {
                setbill({ ...bill, payment: e.target.value });
              }}
              aria-label="Thanh toán"
            >
              <option value="0">Trực tiếp</option>
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

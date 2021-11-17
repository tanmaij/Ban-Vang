import React, { useState } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import demo from "../../Asset/demo.png";
import ProductDialog from "./ProductDialog";
const Product = () => {
  const [dialogShow, setdialogShow] = useState(false);
  return (
    <Container
      className="dashboard-page"
      style={{
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <ProductDialog dialogShow={dialogShow} setdialogShow={setdialogShow} />
      <Row>
        <Col xs={12} xl={2} lg={2} sm={12}>
          <Form.Label></Form.Label>
          <Button
            style={{ marginTop: "20px" }}
            onClick={() => {
              setdialogShow(true);
            }}
            variant="light"
          >
            Thêm sản phẩm
          </Button>
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Sắp xếp</Form.Label>{" "}
          <Form.Select aria-label="Sắp xếp">
            <option value="0">Ngày tạo</option>
            <option value="1">Số lượng bán</option>
            <option value="3">Giá</option>
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
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá sản phẩm</th>
            <th>Số lượng</th>
            <th>Size</th>
            <th>Mô tả</th>
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
            <td>12</td>
            <td>17</td>
            <td>asndawdwd</td>
            <td>
              <Button
                onClick={() => {
                  window.confirm("Bạn có chắc muốn xóa sản phẩm này");
                }}
                variant="danger"
              >
                Xóa
              </Button>
              <Button
                onClick={() => {
                  setdialogShow(true);
                }}
                variant="light"
              >
                Sửa
              </Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <img className="ImageProductCart" src={demo} />
            </td>
            <td>Nhẫn hoàng kim</td>
            <td>2.000.000 vnđ</td>
            <td>12</td>
            <td>17</td>
            <td>asndawdwd</td>
            <td>
              <Button variant="danger">Xóa</Button>
              <Button variant="light">Sửa</Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              <img className="ImageProductCart" src={demo} />
            </td>
            <td>Nhẫn hoàng kim</td>
            <td>2.000.000 vnđ</td>
            <td>12</td>
            <td>17</td>
            <td>asndawdwd</td>
            <td>
              <Button variant="danger">Xóa</Button>
              <Button variant="light">Sửa</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      {/* <Form style={{ padding: "40px" }}>
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
      </Form> */}
    </Container>
  );
};

export default Product;

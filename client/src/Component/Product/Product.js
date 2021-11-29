import React, { useCallback, useState } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import demo from "../../Asset/demo.png";
import ProductDialog from "./ProductDialog";
import Pagination from "../Pagination/Pagination";

const Product = ({
  data,
  dataDialog,
  setdataDialog,
  handleSubmitForm,
  query,
  setquery,
  pagination,
  setPagination,
  deletePoduct,
}) => {
  const [dialogShow, setdialogShow] = useState(false);
  const handleChangeQuery = (e) => {
    setquery({ ...query, [e.target.name]: e.target.value });
  };
  let timer = setTimeout(() => {}, 1000);
  const changeInputQuery = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setquery({ ...query, [e.target.name]: e.target.value });
    }, 2000);
  };
  return (
    <Container
      className="dashboard-page"
      style={{
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <ProductDialog
        dialogShow={dialogShow}
        setdialogShow={setdialogShow}
        dataDialog={dataDialog}
        setdataDialog={setdataDialog}
        handleSubmitForm={handleSubmitForm}
      />
      <Row>
        <Col xs={12} xl={2} lg={2} sm={12}>
          <Form.Label></Form.Label>
          <Button
            style={{ marginTop: "20px" }}
            onClick={() => {
              setdialogShow(true);
              setdataDialog({ ...dataDialog, type: 0 });
            }}
            variant="light"
          >
            Thêm sản phẩm
          </Button>
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Sắp xếp</Form.Label>{" "}
          <Form.Select
            onChange={handleChangeQuery}
            name="order"
            aria-label="Sắp xếp"
            defaultValue={query.order}
          >
            <option value="createdAt">Ngày tạo</option>
            <option value="receipt">Số lượng bán</option>
            <option value="price">Giá</option>
          </Form.Select>{" "}
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Sắp xếp</Form.Label>{" "}
          <Form.Select
            onChange={handleChangeQuery}
            name="sort"
            aria-label="Sắp xếp"
            defaultValue={query.sort}
          >
            <option value="asc">Tăng</option>
            <option value="desc">Giảm</option>
          </Form.Select>{" "}
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Tìm kiếm</Form.Label>{" "}
          <Form.Control
            onChange={changeInputQuery}
            name="like"
            type="text"
            placeholder="Nhập vào từ khóa"
            defaultValue={query.like}
          />
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
          {data.map((item, index) => {
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
                <td>{item.Quantity}</td>
                <td>{item.Size}</td>
                <td>{item.Desc}</td>
                <td>
                  <Button
                    onClick={() => {
                      const warning = window.confirm(
                        "Bạn có chắc muốn xóa sản phẩm này"
                      );
                      if (warning) deletePoduct(item.ProductId);
                    }}
                    variant="danger"
                  >
                    Xóa
                  </Button>
                  <Button
                    onClick={() => {
                      setdialogShow(true);
                      setdataDialog({
                        productId: item.ProductId,
                        name: item.Name,
                        desc: item.Desc,
                        size: item.Size,
                        quantity: item.Quantity,
                        price: item.Price,
                        file: null,
                        type: 1,
                        display: item.Image,
                      });
                    }}
                    variant="light"
                  >
                    Sửa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination pagination={pagination} setquery={setquery} query={query} />
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

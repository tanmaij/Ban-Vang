import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
const ProductDialog = ({
  dialogShow,
  setdialogShow,
  dataDialog,
  setdataDialog,
  handleSubmitForm,
}) => {
  const handleChangeDialog = (e) => {
    setdataDialog({ ...dataDialog, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    setdialogShow(false);
    handleSubmitForm(e);
  };
  if (dialogShow)
    return (
      <div className="account-dialog">
        <div
          onClick={() => {
            setdialogShow(false);
          }}
          className="close-dialog"
        ></div>
        <div className="dialog">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                value={dataDialog.name}
                onChange={handleChangeDialog}
                placeholder="Nhập tên . . ."
                name="name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Label>Mô tả sản phẩm</Form.Label>
              <Form.Control
                value={dataDialog.desc}
                as="textarea"
                onChange={handleChangeDialog}
                name="desc"
              />
            </Form.Group>
            <Row>
              <Col xs={6} xl={6} lg={6} sm={6}>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    value={dataDialog.size}
                    type="number"
                    onChange={handleChangeDialog}
                    name="size"
                  />
                </Form.Group>
              </Col>
              <Col xs={6} xl={6} lg={6} sm={6}>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Label>Số lượng</Form.Label>
                  <Form.Control
                    value={dataDialog.quantity}
                    onChange={handleChangeDialog}
                    type="number"
                    name="quantity"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                value={dataDialog.price}
                onChange={handleChangeDialog}
                type="number"
                name="price"
              />
            </Form.Group>

            <Form.Group className="position-relative mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setdataDialog({
                    ...dataDialog,
                    file: e.target.files[0],
                    display: URL.createObjectURL(e.target.files[0]),
                  });
                }}
                type="file"
                name="file"
              />
            </Form.Group>

            <img
              style={
                dataDialog.display == ""
                  ? { display: "none", height: "200px", width: "auto" }
                  : { display: "block", height: "200px", width: "auto" }
              }
              src={dataDialog.display}
            />
            <Button type="submit" style={{ float: "right" }} variant="light">
              Xác nhận
            </Button>
          </Form>
        </div>
      </div>
    );
  else return null;
};

export default ProductDialog;

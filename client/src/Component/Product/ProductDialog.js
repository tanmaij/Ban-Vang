import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const ProductDialog = ({ dialogShow, setdialogShow }) => {
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
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control type="text" placeholder="Nhập tên . . ." />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Label>Mô tả sản phẩm</Form.Label>
              <Form.Control as="textarea" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Label>Size</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control type="file" required name="file" />
            </Form.Group>
            <Button style={{ float: "right" }} variant="light">
              Xác nhận
            </Button>
          </Form>
        </div>
      </div>
    );
  else return null;
};

export default ProductDialog;

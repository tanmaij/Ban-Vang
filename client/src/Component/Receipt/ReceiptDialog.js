import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
const AccountDialog = ({ dialogReceiptShow, setdialogReceiptShow }) => {
  if (dialogReceiptShow == true)
    return (
      <div className="account-dialog">
        <div
          onClick={() => {
            setdialogReceiptShow(false);
          }}
          className="close-dialog"
        ></div>
        <div className="dialog">
          <h5>Cập nhận trạng thái cho hóa đơn</h5>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton id="tbg-radio-1" value={1}>
              Trên đường vận chuyển
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" value={2}>
              Đã thanh toán
            </ToggleButton>
            <ToggleButton id="tbg-radio-1" value={1}>
              Đã nhận hàng
            </ToggleButton>
          </ToggleButtonGroup>
          <div>
            <Button style={{ float: "right" }} variant="light">
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    );
  else return null;
};

export default AccountDialog;

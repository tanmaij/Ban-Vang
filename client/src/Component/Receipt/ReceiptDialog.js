import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
const AccountDialog = ({ dialogUpdate, setdialogUpdate, updateReceipt }) => {
  if (dialogUpdate.dialogReceiptShow == true)
    return (
      <div className="account-dialog">
        <div
          onClick={() => {
            setdialogUpdate({ ...dialogUpdate, dialogReceiptShow: false });
          }}
          className="close-dialog"
        ></div>
        <div className="dialog">
          <h5>Cập nhận trạng thái cho hóa đơn</h5>
          <ToggleButtonGroup
            type="radio"
            name="options"
            value={dialogUpdate.data.status}
            onChange={(e) => {
              console.log(e);
              setdialogUpdate({
                ...dialogUpdate,
                data: { ...dialogUpdate.data, status: e },
              });
            }}
          >
            <ToggleButton id="tbg-radio-1" value="1">
              {dialogUpdate.data.payment == 0
                ? "Trên đường vận chuyển"
                : "Đã thanh toán"}
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" value="2">
              {dialogUpdate.data.payment == 1
                ? "Trên đường vận chuyển"
                : "Đã thanh toán"}
            </ToggleButton>
            <ToggleButton id="tbg-radio-3" value="3">
              Đã nhận hàng
            </ToggleButton>
          </ToggleButtonGroup>
          <div>
            <Button
              onClick={() => {
                setdialogUpdate({ ...dialogUpdate, dialogReceiptShow: false });
                updateReceipt();
              }}
              style={{ float: "right" }}
              variant="light"
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    );
  else return null;
};

export default AccountDialog;

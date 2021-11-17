import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Account.css";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
const AccountDialog = ({ dialogShow, setdialogShow, updateAccount }) => {
  const [roleUpdate, setroleUpdate] = useState(0);
  if (dialogShow.onShow == true)
    return (
      <div className="account-dialog">
        <div
          onClick={() => {
            setdialogShow({ ...dialogShow, onShow: false });
          }}
          className="close-dialog"
        ></div>
        <div className="dialog">
          <h5>Thay đổi quyền hạn user {dialogShow.userUpdate} này</h5>
          <ToggleButtonGroup
            onChange={(e) => {
              setroleUpdate(e);
            }}
            type="radio"
            name="options"
            defaultValue={roleUpdate}
          >
            <ToggleButton id="tbg-radio-1" value={1}>
              Admin
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" value={0}>
              User
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            onClick={() => {
              updateAccount(dialogShow.userUpdate, roleUpdate);
              setdialogShow({ ...dialogShow, onShow: false });
            }}
            variant="light"
          >
            Xác nhận
          </Button>
        </div>
      </div>
    );
  else return null;
};

export default AccountDialog;

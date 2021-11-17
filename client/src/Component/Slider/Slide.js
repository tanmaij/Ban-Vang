import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./Slide.css";
const Slide = () => {
  const history = useHistory();
  const [active, setActive] = useState({
    btnAccount: "slideButton slideButton-active",
    btnProduct: "slideButton",
    btnReceipt: "slideButton",
  });
  const authContext = useContext(AuthContext);
  const [show, setShow] = useState("slide");
  return (
    <>
      <Button
        onClick={() => {
          if (show == "slide") setShow("slide slide-show");
          else setShow("slide");
        }}
        className="opinion"
        variant="dark"
      >
        Thêm
      </Button>
      <div
        onClick={() => {
          setShow("slide");
        }}
        className={show}
      >
        <div style={{ borderBottom: "2px solid #333", height: "30px" }}></div>
        <div>
          <button
            onClick={() => {
              setActive({
                btnAccount: "slideButton slideButton-active",
                btnProduct: "slideButton",
                btnReceipt: "slideButton",
              });
              history.push("/dashboards/accounts");
            }}
            className={active.btnAccount}
          >
            Tài khoản
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setActive({
                btnAccount: "slideButton",
                btnProduct: "slideButton slideButton-active",
                btnReceipt: "slideButton",
              });
              history.push("/dashboards/products");
            }}
            className={active.btnProduct}
          >
            Sản phẩm
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setActive({
                btnAccount: "slideButton",
                btnProduct: "slideButton",
                btnReceipt: "slideButton slideButton-active",
              });
              history.push("/dashboards/receipts");
            }}
            className={active.btnReceipt}
          >
            Đơn hàng
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              authContext.authLogout();
            }}
            className="slideButton"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </>
  );
};

export default Slide;

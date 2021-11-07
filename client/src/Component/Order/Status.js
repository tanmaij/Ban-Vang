import React from "react";
import payment from "../../Asset/pay.png";
import delivery from "../../Asset/delivery.png";
import shipping from "../../Asset/shipping.png";
import "./Order.css";
const Status = () => {
  return (
    <div className="order-status">
      <div className="line"></div>
      <div style={{ backgroundColor: "#ffffff" }}>
        <img src={payment} className="status payment" />
        <p className="status-info">Đã thanh toán</p>
      </div>
      <div style={{ backgroundColor: "#ffffff" }}>
        <img src={shipping} className="status shipping" />
        <p className="status-info">Trên đường vận chuyển</p>
      </div>
      <div style={{ backgroundColor: "#ffffff" }}>
        <img src={delivery} className="status delivery" />
        <p className="status-info">Đã nhận hàng</p>
      </div>
    </div>
  );
};

export default Status;

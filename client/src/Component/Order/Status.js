import React from "react";
import paymentImg from "../../Asset/pay.png";
import delivery from "../../Asset/delivery.png";
import shipping from "../../Asset/shipping.png";
import "./Order.css";
const Status = ({ status, payment }) => {
  if (payment == 1)
    return (
      <div className="order-status">
        <div className="line"></div>
        <div
          style={
            status < 1
              ? { opacity: 0.4, backgroundColor: "#ffffff" }
              : { backgroundColor: "#ffffff" }
          }
        >
          <img src={paymentImg} className="status payment" />
          <p className="status-info">Đã thanh toán</p>
        </div>
        <div
          style={
            status < 2
              ? { opacity: 0.4, backgroundColor: "#ffffff" }
              : { backgroundColor: "#ffffff" }
          }
        >
          <img src={shipping} className="status shipping" />
          <p className="status-info">Trên đường vận chuyển</p>
        </div>
        <div
          style={
            status < 3
              ? { opacity: 0.4, backgroundColor: "#ffffff" }
              : { backgroundColor: "#ffffff" }
          }
        >
          <img src={delivery} className="status delivery" />
          <p className="status-info">Đã nhận hàng</p>
        </div>
      </div>
    );
  else
    return (
      <div className="order-status">
        <div className="line"></div>
        <div
          style={
            status < 1
              ? { opacity: 0.4, backgroundColor: "#ffffff" }
              : { backgroundColor: "#ffffff" }
          }
        >
          <img src={shipping} className="status shipping" />
          <p className="status-info">Trên đường vận chuyển</p>
        </div>
        <div
          style={
            status < 2
              ? { opacity: 0.4, backgroundColor: "#ffffff" }
              : { backgroundColor: "#ffffff" }
          }
        >
          <img src={paymentImg} className="status payment" />
          <p className="status-info">Đã thanh toán</p>
        </div>

        <div
          style={
            status < 3
              ? { opacity: 0.4, backgroundColor: "#ffffff" }
              : { backgroundColor: "#ffffff" }
          }
        >
          <img src={delivery} className="status delivery" />
          <p className="status-info">Đã nhận hàng</p>
        </div>
      </div>
    );
};

export default Status;

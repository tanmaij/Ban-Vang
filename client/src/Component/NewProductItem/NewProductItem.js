import React from "react";
import demo from "../../Asset/demo.png";
import "./NewProductItem.css";
const NewProductItem = () => {
  return (
    <div className="NewProductItem">
      <img className="NewProductItemImg" src={demo} />
      <p className="NewProductItemName">Vòng tay gia truyền</p>
      <p className="NewProductItemPrice">2.000.000 vnđ</p>
      <div className="AddToCart">Thêm vào giỏ</div>
    </div>
  );
};

export default NewProductItem;

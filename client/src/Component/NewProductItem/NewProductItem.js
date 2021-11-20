import React, { useContext } from "react";
import "./NewProductItem.css";
import CartContext from "../../context/CartContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
const NewProductItem = ({ data, width }) => {
  const cartContext = useContext(CartContext);
  const history = useHistory();
  return (
    <div className="NewProductItem" style={{ width: width }}>
      <div
        className="detail"
        onClick={() => {
          history.push("/details/" + data.ProductId);
        }}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </div>
      <img className="NewProductItemImg" src={data.Image} />
      <p className="NewProductItemName">{data.Name}</p>
      <p className="NewProductItemPrice">
        {data.Price.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </p>
      <div
        onClick={() => {
          cartContext.addProduct(data.ProductId);
        }}
        className="AddToCart"
      >
        Thêm vào giỏ
      </div>
    </div>
  );
};

export default NewProductItem;

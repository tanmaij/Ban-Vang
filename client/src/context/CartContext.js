import React, { createContext, useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "./AuthContext";
import axios from "axios";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
  const [cartCookie, setcartCookie] = useState(cookies.cart);

  useEffect(() => {
    setCookie("cart", cartCookie, { maxAge: 30 * 24 * 60 * 60 });
  }, [cartCookie]);

  const checkProduct = async (id) => {
    try {
      if (id == -1) alert("Không thể thêm sản phẩm này");
      const getProduct = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/products/${id}`
      );
      const quantity = getProduct.data.data[0].Quantity;
      if (quantity == 0) return 0;
      else return 1;
    } catch (error) {
      if (error.response) return -1;
    }
  };
  const addProduct = async (id) => {
    if (!authContext.accountData)
      alert("Vui lòng đăng nhập để sử dụng tính năng");
    const check = await checkProduct(id);
    if (check == -1) alert("Có lỗi xảy ra");
    else if (check == 0) alert("Xin lỗi, sản phẩm đã hết hàng");
    else if (check == 1) {
      if (new RegExp(id, "i").test(cartCookie))
        alert("Mặt hàng này đã thêm vào giỏ rồi !");
      else {
        setcartCookie(`${cartCookie}-${id}`);
        alert("Đã thêm vào giỏ");
      }
    }
  };
  return (
    <CartContext.Provider value={{ cartCookie, setcartCookie, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

import React, { useContext, useEffect, useState } from "react";
import CartPage from "../Component/Cart/Cart";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Loading from "../Component/Loading/Loading";
import SubmitCartDialog from "../Component/Cart/SubmitCartDialog";
const Cart = () => {
  const [cartState, setCartstate] = useState({ data: [], onLoading: false });
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const [bill, setbill] = useState({ address: "", payment: "0" });
  const [cartData, setcartData] = useState({
    dialogShow: false,
    data: null,
  });
  const getDataToCart = async () => {
    setCartstate({ onLoading: true, data: [...cartState.data] });
    try {
      const getProducts = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/products/${cartContext.cartCookie}`
      );
      if (getProducts.data.data.some((item) => item.Quantity == 0))
        alert(
          "Trong danh sách đã tự động xóa sản phẩm hết hàng hoặc đã bị xóa"
        );
      const data = getProducts.data.data.map((item) => {
        return { ...item, Num: 1 };
      });

      setCartstate({ onLoading: false, data: data });
    } catch (error) {
      setCartstate({ onLoading: false, data: [...cartState.data] });
      if (error.response) alert(error.response.data.message);
      else alert("Lỗi không xác định");
    }
  };
  const incProduct = async (id, quantity) => {
    setCartstate({ onLoading: true, data: [...cartState.data] });

    try {
      const getProduct = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/products/${id}`
      );
      const findProduct = cartState.data.find((item) => item.ProductId == id);
      if (parseInt(findProduct.Num) + parseInt(quantity) == 0) {
        let ids = cartContext.cartCookie.split("-");
        ids = ids.filter(
          (item) => parseInt(item) != parseInt(findProduct.ProductId)
        );
        setCartstate({
          onLoading: false,
          data: cartState.data.filter(
            (item) => item.ProductId != findProduct.ProductId
          ),
        });
        cartContext.setcartCookie(ids.join("-"));
        return;
      }
      if (
        parseInt(getProduct.data.data[0].Quantity) -
          (findProduct.Num + parseInt(quantity)) <
        0
      ) {
        alert("Sản phẩm không đủ hàng");
        setCartstate({
          onLoading: false,
          data: cartState.data.map((item) => {
            if (item.ProductId == getProduct.data.data[0].ProductId)
              return {
                ...getProduct.data.data[0],
                Num: getProduct.data.data[0].Quantity,
              };
            else return item;
          }),
        });
      } else
        setCartstate({
          onLoading: false,
          data: cartState.data.map((item) => {
            if (item.ProductId == getProduct.data.data[0].ProductId)
              return { ...getProduct.data.data[0], Num: item.Num + quantity };
            else return item;
          }),
        });
    } catch (error) {
      if (error.response) alert(error.response.data.message);
      else {
        console.log(error);
        alert("Lỗi không xác định");
      }
    }
  };
  const handleSubmitCart = async (e) => {
    const cart = cartState.data;
    const address = bill.address;
    const payment = bill.payment;
    setCartstate({ onLoading: true, data: [...cartState.data] });

    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/receipts/carts`,
        { cart, address, payment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );
      setcartData({ data: response.data.data, dialogShow: true });
      setCartstate({ onLoading: false, data: [...cartState.data] });
    } catch (error) {
      if (error.response) alert(error.response.data.message);
      else alert("Lỗi không xác định");
      setCartstate({ onLoading: false, data: [...cartState.data] });
    }
  };

  const handleSubmitReceipt = async () => {
    const data = cartData.data;
    setCartstate({ onLoading: true, data: [...cartState.data] });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/receipts`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );

      if (response.data.data) {
        window.location.replace(response.data.data);
        return;
      }
      alert(
        "Gửi đơn hàng thành công! Chúng tôi sẽ vận chuyển sớm nhất, chân thành cảm ơn!!!!!!!"
      );
      setcartData({ ...cartData, dialogShow: false });

      setCartstate({ onLoading: false, data: [] });
      cartContext.setcartCookie("");
    } catch (error) {
      if (error.response.status == 403 || error.response.status == 401) {
        alert("Vui lòng đăng nhập");
        window.replace("/auth/login");
      }
      if (error.response) alert(error.response.data.message);
      else alert("Lỗi không xác định");

      setCartstate({ onLoading: false, data: [...cartState.data] });
    }
  };
  useEffect(async () => {
    const search = window.location.search;
    const orderId = new URLSearchParams(search).get("orderId");
    if (orderId != null)
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/receipts/momo`,
          { orderId: orderId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Basic " +
                localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
            },
          }
        );

        alert("Thanh toán thành công! Chúng tôi xin chân thành cảm ơn");
      } catch (error) {
        if (error.response) {
          if (error.response.status == 401 || error.response.status == 403) {
            alert("Vui lòng đăng nhập");
            window.location.replace("/auth/login");
          } else alert(error.response.data.message);
        } else alert("Lỗi không xác định");
      }
  }, []);
  useEffect(async () => {
    const checkLogin = await authContext.checkLogin();
    console.log(checkLogin);
    if (!checkLogin) {
      cartContext.setcartCookie("");
      alert("Vui lòng đăng nhập");
      window.location.replace("/");
    }
    await getDataToCart();
  }, [authContext]);
  return (
    <div
      style={
        cartState.onLoading || cartData.dialogShow
          ? { PointerEvent: "none", position: "relative" }
          : { position: "relative" }
      }
    >
      <Loading onLoading={cartState.onLoading} />
      <SubmitCartDialog
        cartData={cartData}
        setcartData={setcartData}
        handleSubmitReceipt={handleSubmitReceipt}
      />
      <CartPage
        cartState={cartState}
        setCartstate={setCartstate}
        incProduct={incProduct}
        authContext={authContext}
        handleSubmitCart={handleSubmitCart}
        bill={bill}
        setbill={setbill}
      />
    </div>
  );
};

export default Cart;

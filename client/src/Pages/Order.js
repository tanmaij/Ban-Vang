import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../Component/Loading/Loading";
import OrderPage from "../Component/Order/Order";
import AuthContext from "../context/AuthContext";
const Order = () => {
  const authContext = useContext(AuthContext);
  const [receiptState, setreceiptState] = useState({
    onLoading: false,
    data: [],
  });
  const [detailData, setdetailData] = useState(null);

  const getById = async (id, receipts) => {
    setreceiptState({ data: [...receiptState.data], onLoading: true });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/receipts/${id}`,
        {
          headers: {
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );
      const data = response.data.data;
      if (!receipts)
        setreceiptState({ data: [...receiptState.data], onLoading: false });
      else setreceiptState({ data: receipts, onLoading: false });
      setdetailData(data);
    } catch (error) {
      if (error.response) alert(error.response.data.message);
      else alert("Lỗi không xác định");
      setreceiptState({ data: [...receiptState.data], onLoading: false });
    }
  };

  const getReceipts = async () => {
    setreceiptState({ data: [...receiptState.data], onLoading: true });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/receipts/users`,
        {
          headers: {
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );

      if (response.data.data.length > 0)
        await getById(response.data.data[0].ReceiptId, response.data.data);
    } catch (error) {
      if (error.response)
        if (error.response.status == 403 || error.response.status == 401) {
          alert("Vui lòng đăng nhập");
          window.location.replace("/auth/login");
        }
      if (error.response) alert(error.response.data.message);
      else alert("Lỗi không xác định");
      setreceiptState({ data: [...receiptState.data], onLoading: false });
    }
  };
  useEffect(async () => {
    const checkLogin = await authContext.checkLogin();
    if (checkLogin == false) {
      alert("Vui lòng đăng nhập");
    }
    await getReceipts();
  }, [authContext]);

  return (
    <div
      style={
        receiptState.onLoading
          ? { PointerEvent: "none", position: "relative" }
          : { position: "relative" }
      }
    >
      <Loading onLoading={receiptState.onLoading} />
      <OrderPage
        data={receiptState.data}
        detailData={detailData}
        getById={getById}
      />
    </div>
  );
};

export default Order;

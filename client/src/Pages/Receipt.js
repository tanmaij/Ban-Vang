import axios from "axios";
import React, { useEffect, useState } from "react";
import ReceiptPage from "../Component/Receipt/Receipt";
import Loading from "../Component/Loading/Loading";
const Receipt = () => {
  const [query, setquery] = useState({
    order: "createdAt",
    sort: "asc",
    like: "",
    payment: "0",
    limit: 9,
    page: 1,
  });

  const [pagination, setPagination] = useState(null);
  const [receiptState, setreceiptState] = useState({
    data: [],
    onLoading: false,
  });
  const [dialogUpdate, setdialogUpdate] = useState({
    dialogReceiptShow: false,
    data: null,
  });
  const [dialogDetails, setdialogDetails] = useState({
    dialogDetailShow: false,
    data: null,
  });
  const getById = async (id) => {
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
      setreceiptState({ data: [...receiptState.data], onLoading: false });
      setdialogDetails({ dialogDetailShow: true, data: data });
    } catch (error) {
      if (error.response) alert(error.response.data.message);
      else alert("Lỗi không xác định");
      setreceiptState({ data: [...receiptState.data], onLoading: false });
    }
  };
  const updateReceipt = async () => {
    setreceiptState({ data: [...receiptState.data], onLoading: true });
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/receipts/${dialogUpdate.data.id}`,
        { status: dialogUpdate.data.status },
        {
          headers: {
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );
      alert("Đã cập nhật thành công");
      setreceiptState({ data: [...receiptState.data], onLoading: false });
      setquery({ ...query });
    } catch (error) {
      if (error.response) alert(error.response.data.message);
      else alert("Lỗi không xác định");
      setreceiptState({ data: [...receiptState.data], onLoading: false });
    }
  };
  const deleteReceipt = async (id) => {
    setreceiptState({ data: [...receiptState.data], onLoading: true });
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/receipts/${id}`, {
        headers: {
          Authorization:
            "Basic " +
            localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
        },
      });
      alert("Đã xóa thành công");
      setreceiptState({ data: [...receiptState.data], onLoading: false });
      setquery({ ...query });
    } catch (error) {
      if (error.response) alert(error.response.data.message);
      else alert("Lỗi không xác định");
      setreceiptState({ data: [...receiptState.data], onLoading: false });
    }
  };
  const getData = async () => {
    setreceiptState({ data: [...receiptState.data], onLoading: true });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/receipts?_order=${query.order}&_sort=${query.sort}&_page=${query.page}&_limit=${query.limit}&_payment=${query.payment}`,
        {
          headers: {
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );
      setPagination({ ...response.data.pagination });
      setreceiptState({ data: response.data.data, onLoading: false });
    } catch (error) {
      if (error.response)
        if (error.response.status == 403 || error.response.status == 401) {
          alert("Vui lòng đăng nhập");
          window.replace("/auth/login");
        }
      if (error.response) alert(error.response.data.message);
      else alert("Lỗi không xác định");
      setreceiptState({ data: [...receiptState.data], onLoading: false });
    }
  };
  useEffect(async () => {
    await getData();
  }, [query]);
  const { innerHeight: height } = window;

  return (
    <div
      style={
        receiptState.onLoading
          ? { PointerEvent: "none", position: "relative", height: height }
          : { position: "relative", height: height }
      }
    >
      <Loading onLoading={receiptState.onLoading} />
      <ReceiptPage
        receiptState={receiptState}
        query={query}
        setquery={setquery}
        dialogDetails={dialogDetails}
        setdialogDetails={setdialogDetails}
        getById={getById}
        pagination={pagination}
        deleteReceipt={deleteReceipt}
        dialogUpdate={dialogUpdate}
        setdialogUpdate={setdialogUpdate}
        updateReceipt={updateReceipt}
      />
    </div>
  );
};

export default Receipt;

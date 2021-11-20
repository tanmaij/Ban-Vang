import axios from "axios";
import React, { useEffect, useState } from "react";
import DetailPage from "../Component/Detail/Detail";
import Loading from "../Component/Loading/Loading";
const Detail = ({ match }) => {
  const [detailState, setdetailState] = useState({
    onLoading: false,
    data: null,
  });
  const id = match.params.id;
  const getData = async () => {
    setdetailState({ onLoading: true, data: null });
    try {
      const getProducts = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/products/${id}`
      );
      if (getProducts.data.data.length == 0) {
        alert("Sản phẩm này không tồn tại");
        window.location.replace("/");
      }
      const data = getProducts.data.data[0];

      setdetailState({ onLoading: false, data: data });
    } catch (error) {
      setdetailState({ onLoading: false, data: null });
      if (error.response) alert(error.response.data.message);
      else alert("Lỗi không xác định");
      window.location.replace("/");
    }
  };
  useEffect(async () => {
    await getData();
  }, []);
  return (
    <div
      style={
        detailState.onLoading
          ? { PointerEvent: "none", position: "relative" }
          : { position: "relative" }
      }
    >
      <Loading onLoading={detailState.onLoading} />
      <DetailPage data={detailState.data} />
    </div>
  );
};

export default Detail;

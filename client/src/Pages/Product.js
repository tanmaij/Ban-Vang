import React, { useEffect, useState } from "react";
import Loading from "../Component/Loading/Loading";
import ProductPage from "../Component/Product/Product";
import axios from "axios";
const Product = () => {
  const [stateProduct, setstateProduct] = useState({
    data: [],
    onLoading: false,
  });
  const [pagination, setPagination] = useState(null);
  const [query, setquery] = useState({
    order: "createdAt",
    sort: "asc",
    like: "",
    page: 1,
    limit: 9,
  });
  const [dataDialog, setdataDialog] = useState({
    productId: "",
    name: "",
    desc: "",
    size: 0,
    quantity: 0,
    price: 0,
    file: null,
    type: 0,
    display: "",
  });
  const add = async () => {
    const newForm = new FormData();
    newForm.append("name", dataDialog.name);
    newForm.append("desc", dataDialog.desc);
    newForm.append("size", dataDialog.size);
    newForm.append("quantity", dataDialog.quantity);
    newForm.append("price", dataDialog.price);
    newForm.append("file", dataDialog.file);
    setstateProduct({ data: [...stateProduct.data], onLoading: true });
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/products/`,
        newForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );
      alert("Đã thêm sản phẩm thành công");
      setquery({ ...query });
    } catch (error) {
      setstateProduct({ data: [...stateProduct.data], onLoading: false });
      alert(error.response.data.message);
    }
  };
  const get = async () => {
    setstateProduct({ data: [...stateProduct.data], onLoading: true });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/products?_order=${query.order}&_sort=${query.sort}&_like=${query.like}&_page=${query.page}&_limit=${query.limit}`
      );

      setPagination(response.data.pagination);
      setstateProduct({ onLoading: false, data: response.data.data });
    } catch (error) {
      setstateProduct({ data: [...stateProduct.data], onLoading: false });
      alert(error.response.data.message);
      if (error.response.status == 401 || error.response.status == 403) {
        window.location.replace("/");
      }
    }
  };
  const update = async () => {
    const newForm = new FormData();
    newForm.append("name", dataDialog.name);
    newForm.append("desc", dataDialog.desc);
    newForm.append("size", dataDialog.size);
    newForm.append("quantity", dataDialog.quantity);
    newForm.append("price", dataDialog.price);
    newForm.append("file", dataDialog.file);
    setstateProduct({ data: [...stateProduct.data], onLoading: true });
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/products/${dataDialog.productId}`,
        newForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );

      setquery({ ...query });
      setstateProduct({ onLoading: false, data: response.data.data });
      alert("Đã cập nhật sản phẩm");
    } catch (error) {
      setstateProduct({ data: [...stateProduct.data], onLoading: false });
      alert(error.response.data.message);
      if (error.response.status == 401 || error.response.status == 403) {
        window.location.replace("/");
      }
    }
  };
  const deletePoduct = async (productId) => {
    setstateProduct({ onLoading: true, data: [...stateProduct.data] });
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/products/${productId}`,
        {
          headers: {
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );

      setquery({ ...query });
      setstateProduct({ onLoading: false, data: [...stateProduct.data] });
      alert("Đã xóa sản phẩm");
    } catch (error) {
      setstateProduct({ data: [...stateProduct.data], onLoading: false });
      alert(error.response.data.message);
      if (error.response.status == 401 || error.response.status == 403) {
        window.location.replace("/");
      }
    }
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (dataDialog.type == 0) await add();
    else if (dataDialog.type == 1) await update();
  };
  useEffect(async () => {
    await get();
  }, [query]);
  const { innerHeight: height } = window;
  return (
    <div
      style={
        stateProduct.onLoading
          ? { PointerEvent: "none", position: "relative", height: height }
          : { position: "relative", height: height }
      }
    >
      <Loading onLoading={stateProduct.onLoading} />
      <ProductPage
        data={stateProduct.data}
        dataDialog={dataDialog}
        setdataDialog={setdataDialog}
        handleSubmitForm={handleSubmitForm}
        query={query}
        setquery={setquery}
        pagination={pagination}
        setPagination={setPagination}
        deletePoduct={deletePoduct}
      />
    </div>
  );
};

export default Product;

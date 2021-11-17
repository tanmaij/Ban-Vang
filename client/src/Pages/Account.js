import React, { useEffect, useReducer, useState } from "react";
import AccountPage from "../Component/Account/Account";
import { AccountReducer } from "../reducer/AccountReducer";
import Loading from "../Component/Loading/Loading";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Account = () => {
  const history = useHistory();
  const [query, setQuery] = useState({ sort: "asc", like: "", role: "-1" });
  const [stateAccount, setStateAccount] = useState({
    data: [],
    onLoading: true,
  });
  const handleGetData = async (sort, like, role) => {
    try {
      setStateAccount({ onLoading: true, data: [...stateAccount.data] });
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/accounts?_sort=${sort}&_like=${like}&_role=${role}`,
        {
          headers: {
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );
      setStateAccount({ data: response.data.data, onLoading: false });
    } catch (error) {
      alert(error.response.data.message);
      if (error.response.status == 401 || error.response.status == 403) {
        history.push("/");
        return;
      }
      setStateAccount({ onLoading: false, data: { ...stateAccount.data } });
    }
  };
  const deleteAccount = async (username) => {
    setStateAccount({ onLoading: true, data: [...stateAccount.data] });
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/accounts/${username}`,
        {
          headers: {
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );
      alert("Đã xóa thành công");
      setQuery({ ...query });
    } catch (error) {
      alert(error.response.data.message);
      if (error.response.status == 401 || error.response.status == 403) {
        history.push("/");
        return;
      }
      setStateAccount({ onLoading: false, data: [...stateAccount.data] });
    }
  };
  const updateAccount = async (username, role) => {
    setStateAccount({ onLoading: true, data: [...stateAccount.data] });
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/accounts/${username}`,
        { role: role },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic " +
              localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME),
          },
        }
      );
      alert("Đã cập nhật thành công");
      setQuery({ ...query });
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.message);
      console.log(error.response.data);
      if (error.response.status == 401 || error.response.status == 403) {
        history.push("/");
        return;
      }
      setStateAccount({ onLoading: false, data: [...stateAccount.data] });
    }
  };
  useEffect(() => {
    handleGetData(query.sort, query.like, query.role);
  }, [query]);

  const { innerHeight: height } = window;

  return (
    <div
      style={
        stateAccount.onloading
          ? { PointerEvent: "none", position: "relative", height: height }
          : { position: "relative", height: height }
      }
    >
      <Loading onLoading={stateAccount.onLoading} />
      <AccountPage
        data={stateAccount.data}
        query={query}
        deleteAccount={deleteAccount}
        setQuery={setQuery}
        updateAccount={updateAccount}
      />
    </div>
  );
};

export default Account;

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [accountData, setaccountData] = useState(null);
  useEffect(() => {
    const base64String = localStorage.getItem(
      process.env.REACT_APP_BASIC_AUTH_NAME
    );
    if (base64String) {
      if (base64String !== "") {
        axios
          .post(
            `${process.env.REACT_APP_SERVER_URL}/auth/login`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64String,
              },
            }
          )
          .then((res) => {
            setaccountData(res.data.data);
          })
          .catch((error) => setaccountData(null));
      } else setaccountData(null);
    } else setaccountData(null);
  }, []);

  const authLogout = () => {
    localStorage.setItem(process.env.REACT_APP_BASIC_AUTH_NAME, "");
    setaccountData(null);
  };

  const checkLogin = async () => {
    const base64 = localStorage.getItem(process.env.REACT_APP_BASIC_AUTH_NAME);
    if (!base64) return false;
    try {
      if (base64)
        if (base64 !== undefined)
          await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/auth/login`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + base64,
              },
            }
          );
        else return false;
      if (base64 == "") return false;
      return true;
    } catch (error) {
      if (error.response) return false;
      return false;
    }
  };

  const authLogin = async (loginData) => {
    const { username, password } = loginData;
    const authBase64 = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + authBase64,
          },
        }
      );
      localStorage.setItem(process.env.REACT_APP_BASIC_AUTH_NAME, authBase64);
      return { success: true, data: response.data.data };
    } catch (error) {
      if (error.response)
        return { success: false, message: error.response.data.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ accountData, setaccountData, authLogin, checkLogin, authLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

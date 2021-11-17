import React from "react";
import LogIn from "./LogIn";
import Register from "./Register";
import "./Auth.css";
const Auth = ({ authRouter }) => {
  return (
    <div className="auth">
      <div>
        <h4 style={{ textAlign: "center" }}>Kết nối với chúng tôi</h4>
        {authRouter === "login" ? <LogIn /> : <Register />}
      </div>
    </div>
  );
};

export default Auth;

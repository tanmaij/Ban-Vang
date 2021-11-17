import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import "./Auth.css";
import { useHistory, Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import AuthContext from "../../context/AuthContext";
const LogIn = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const [loginData, setloginData] = useState({ username: "", password: "" });
  const [loading, setloading] = useState(false);

  const handleChangeLoginData = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setloading(true);
    const responseLogin = await authContext.authLogin(loginData);
    setloading(false);
    if (responseLogin.success) {
      authContext.setaccountData(responseLogin.data);
      alert("Đăng nhập thành công!");
      responseLogin.data.IsAdmin == 1
        ? history.push("dashboards/accounts")
        : history.push("/");
    } else alert(responseLogin.message);
  };
  return (
    <Form
      onSubmit={handleSubmitLogin}
      style={!loading ? { PointerEvent: "none" } : {}}
      className="login"
    >
      <Loading onLoading={loading} />
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Tài khoản</Form.Label>
        <Form.Control
          type="text"
          placeholder="Tên tài khoản . . ."
          onChange={handleChangeLoginData}
          value={loginData.username}
          name="username"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="***"
          onChange={handleChangeLoginData}
          value={loginData.password}
          name="password"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      Bạn chưa có tài khoản? <Link to="/auth/register">Đăng ký</Link>
      <Button className="auth-btn" variant="primary" type="submit">
        Đăng nhập
      </Button>
    </Form>
  );
};

export default LogIn;

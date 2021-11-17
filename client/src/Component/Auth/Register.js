import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Auth.css";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const [registerData, setregisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    identity: "",
    phone: "",
  });
  const [loading, setloading] = useState(false);
  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("Mật khẩu xác nhận không trùng khớp");
      return;
    }
    try {
      setloading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/register`,
        registerData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Chúc mừng bạn đã đăng ký thành công");
      setloading(false);
    } catch (error) {
      alert(error.response.data.message);
      setloading(false);
    }
  };
  const handleChangeRegister = (e) => {
    if (
      (e.target.name === "phone" || e.target.name === "identity") &&
      !/^\d+$/.test(e.target.value)
    )
      setregisterData({ ...registerData });
    else setregisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const { username, password, confirmPassword, name, identity, phone } =
    registerData;
  return (
    <Form onSubmit={handleSubmitRegister} className="register">
      <Loading onLoading={loading} />
      <Form.Group
        style={!loading ? { PointerEvent: "none" } : {}}
        className="mb-3"
        controlId="formBasicUsername"
      >
        <Form.Label>Tài khoản</Form.Label>
        <Form.Control
          type="text"
          placeholder="Tên tài khoản . . ."
          value={username}
          name="username"
          onChange={handleChangeRegister}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="***"
          value={password}
          name="password"
          onChange={handleChangeRegister}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Xác Nhận Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="***"
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChangeRegister}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Họ và tên</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nguyễn Văn . . ."
          value={name}
          name="name"
          onChange={handleChangeRegister}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>CMND/CCCD</Form.Label>
        <Form.Control
          type="text"
          placeholder="12345678"
          value={identity}
          name="identity"
          onChange={handleChangeRegister}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Số điện thoại</Form.Label>
        <Form.Control
          type="text"
          placeholder="0987654321"
          value={phone}
          name="phone"
          onChange={handleChangeRegister}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      Bạn đã có tài khoản? <Link to="/auth/login"> Đăng nhập</Link>
      <Button className=" auth-btn" variant="primary" type="submit">
        Đăng ký
      </Button>
    </Form>
  );
};

export default Register;

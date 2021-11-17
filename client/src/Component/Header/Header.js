import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import logo from "../../Asset/logo.ico";
import AuthContext from "../../context/AuthContext";
const Header = () => {
  const authContext = useContext(AuthContext);

  const [authState, setauthState] = useState(authContext.accountData);

  useEffect(() => {
    setauthState(authContext.accountData);
  }, [authContext]);

  return (
    <div>
      <div className="logo">
        <img className="logo-img" src={logo} />
      </div>
      <div className="logo">Mascara</div>
      <Navbar bg="light" expand="lg">
        <Container
          style={{
            paddingLeft: "10%",
            paddingRight: "10%",
            fontSize: "23xp",
            color: "black",
            fontWeight: "700",
          }}
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Trang chủ</Nav.Link>
              <Nav.Link href="#link">Giỏ hàng</Nav.Link>
              <Nav.Link href="#link">Đơn hàng</Nav.Link>
              {authState == null ? (
                <Nav.Link href="/auth/login">Đăng nhập</Nav.Link>
              ) : (
                <NavDropdown title={authState.Name} id="basic-nav-dropdown">
                  <NavDropdown.Item
                    onClick={() => {
                      authContext.authLogout();
                    }}
                  >
                    Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

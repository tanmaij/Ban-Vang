import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import logo from "../../Asset/logo.ico";
const Header = () => {
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
              <NavDropdown title="Thông báo" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#link">Đơn hàng</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;

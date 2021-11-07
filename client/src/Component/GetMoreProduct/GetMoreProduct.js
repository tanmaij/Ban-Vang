import React from "react";
import {
  Container,
  Row,
  InputGroup,
  FormControl,
  Col,
  Dropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import OneProduct from "../OneProduct/OneProduct";
import Pagination from "../Pagination/Pagination";
const GetMoreProduct = () => {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col xs={1} xl={4} lg={4} sm={2}></Col>
        <Col xs={10} xl={4} lg={4} sm={8}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <FormControl
              placeholder="Nhập từ khóa cần tìm"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Col>
        <Col xs={1} xl={4} lg={4} sm={2}></Col>
      </Row>
      <Row>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Row>
            <Col xs={6} xl={12} lg={12} sm={6}>
              <Dropdown style={{ width: "auto", margin: "10px" }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Ngày nhập
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={6} xl={12} lg={12} sm={6}>
              <Dropdown style={{ width: "auto", margin: "10px" }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Giá
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={6} xl={12} lg={12} sm={6}>
              <Dropdown style={{ width: "auto", margin: "10px" }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Size
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={6} xl={12} lg={12} sm={6}>
              <Dropdown style={{ width: "auto", margin: "10px" }}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Số đơn hàng
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Col>
        <Col xs={12} xl={9} lg={9} sm={12}>
          <Row>
            <Col xs={12} xl={4} lg={4} sm={12}>
              <OneProduct />
            </Col>
            <Col xs={12} xl={4} lg={4} sm={12}>
              <OneProduct />
            </Col>
            <Col xs={12} xl={4} lg={4} sm={12}>
              <OneProduct />
            </Col>
            <Col xs={12} xl={4} lg={4} sm={12}>
              <OneProduct />
            </Col>
            <Col xs={12} xl={4} lg={4} sm={12}>
              <OneProduct />
            </Col>
            <Col xs={12} xl={4} lg={4} sm={12}>
              <OneProduct />
            </Col>
            <Col xs={12} xl={4} lg={4} sm={12}>
              <OneProduct />
            </Col>
            <Col xs={12} xl={4} lg={4} sm={12}>
              <OneProduct />
            </Col>
            <Col xs={12} xl={4} lg={4} sm={12}>
              <OneProduct />
            </Col>
          </Row>
        </Col>
      </Row>
      <Pagination />
    </Container>
  );
};

export default GetMoreProduct;

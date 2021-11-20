import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  InputGroup,
  FormControl,
  Col,
  Dropdown,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import OneProduct from "../OneProduct/OneProduct";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import axios from "axios";
const GetMoreProduct = () => {
  const [query, setquery] = useState({
    order: "createdAt",
    sort: "asc",
    like: "",
    price: "0.-1",
    quantity: "-1",
    page: 1,
    limit: 9,
  });

  const [pagination, setPagination] = useState(null);
  const [getState, setgetState] = useState({ onLoading: false, data: [] });

  const get = async () => {
    setgetState({ data: [...getState.data], onLoading: true });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/products?_order=${query.order}&_sort=${query.sort}&_like=${query.like}&_page=${query.page}&_limit=${query.limit}&_price=${query.price}&_quantity=${query.quantity}`
      );
      setPagination(response.data.pagination);
      setgetState({ onLoading: false, data: response.data.data });
    } catch (error) {
      setgetState({ data: [...getState.data], onLoading: false });
      alert(error.response.data.message);
    }
  };

  const handleChangeQuery = (e) => {
    setquery({ ...query, [e.target.name]: e.target.value });
  };
  let timer = setTimeout(() => {}, 1000);
  const changeInputQuery = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setquery({ ...query, [e.target.name]: e.target.value });
    }, 2000);
  };
  useEffect(async () => {
    await get();
  }, [query]);
  return (
    <Container style={{ marginTop: "20px", position: "relative" }}>
      <Loading onLoading={getState.onLoading} />
      <Row>
        <Col xs={1} xl={4} lg={4} sm={2}></Col>
        <Col xs={10} xl={4} lg={4} sm={8}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <FormControl
              name="like"
              placeholder="Nhập từ khóa cần tìm"
              aria-label="Search"
              aria-describedby="basic-addon1"
              defaultValue={query.like}
              onChange={changeInputQuery}
            />
          </InputGroup>
        </Col>
        <Col xs={1} xl={4} lg={4} sm={2}></Col>
      </Row>
      <Row>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Row>
            <Col xs={6} xl={12} lg={12} sm={6}>
              <FloatingLabel controlId="floatingSelect" label="Loại sắp xếp">
                <Form.Select
                  name="order"
                  aria-label="Floating label select example"
                  defaultValue={query.order}
                  value={query.order}
                  onChange={handleChangeQuery}
                >
                  <option value="createdAt">Ngày nhập</option>
                  <option value="receipt">Bán chạy</option>
                  <option value="price">Giá</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs={6} xl={12} lg={12} sm={6}>
              <FloatingLabel controlId="floatingSelect" label="Sắp xếp">
                <Form.Select
                  name="sort"
                  aria-label="Floating label select example"
                  defaultValue={query.sort}
                  value={query.sort}
                  onChange={handleChangeQuery}
                >
                  <option value="asc">Tăng</option>
                  <option value="desc">Giảm</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs={6} xl={12} lg={12} sm={6}>
              <FloatingLabel controlId="floatingSelect" label="Giá">
                <Form.Select
                  name="price"
                  aria-label="Floating label select example"
                  value={query.price}
                  onChange={handleChangeQuery}
                >
                  <option value="0.-1">Tất cả</option>
                  <option value="0.100000">0-100.000 VND</option>
                  <option value="100000.1000000">
                    100.000 VND - 1.000.000 VND
                  </option>
                  <option value="1000000.10000000">
                    1.000.000 VND - 10.000.000 VND
                  </option>
                  <option value="10000000.100000000">
                    10.000.000 VND - 100.000.000 VND
                  </option>
                  <option value="-1.100000000">Trên 100.000.000 VND</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col xs={6} xl={12} lg={12} sm={6}>
              <FloatingLabel controlId="floatingSelect" label="Số lượng">
                <Form.Select
                  name="quantity"
                  aria-label="Số lượng"
                  defaultValue={query.quantity}
                  value={query.quantity}
                  onChange={handleChangeQuery}
                >
                  <option value="-1">Tất cả</option>
                  <option value="1">Còn hàng</option>
                  <option value="0">Hết hàng</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col xs={6} xl={12} lg={12} sm={6}></Col>
            {/* <Col xs={6} xl={12} lg={12} sm={6}>
              <Button
                onClick={(e) => {
                  get();
                }}
                style={{ width: "100%" }}
              >
                Xác nhận
              </Button>
            </Col> */}
          </Row>
        </Col>
        <Col xs={12} xl={9} lg={9} sm={12}>
          <Row>
            {getState.data.map((item) => {
              return (
                <Col xs={6} xl={4} lg={4} sm={6}>
                  <OneProduct data={item} />
                </Col>
              );
            })}
            {/* <Col xs={12} xl={4} lg={4} sm={12}>
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
            </Col> */}
          </Row>
        </Col>
      </Row>
      <Pagination pagination={pagination} setquery={setquery} query={query} />
    </Container>
  );
};

export default GetMoreProduct;

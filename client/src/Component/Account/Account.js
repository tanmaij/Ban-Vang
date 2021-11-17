import React, { useState } from "react";
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import AccountDialog from "./AccountDialog";
const Account = ({ data, query, deleteAccount, setQuery, updateAccount }) => {
  const [dialogShow, setdialogShow] = useState({
    onShow: false,
    userUpdate: "",
  });
  const handleChangeQuery = (e) => {
    query[e.target.name] = e.target.value;
    setQuery({ ...query });
  };
  const handleDeleteAccount = (e) => {
    const warning = window.confirm(
      "Bạn có thật sự muốn xóa " + e.target.id + "?"
    );
    if (warning) deleteAccount(e.target.id);
    //xóa
  };
  return (
    <div
      className="dashboard-page"
      style={{
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <AccountDialog
        dialogShow={dialogShow}
        setdialogShow={setdialogShow}
        updateAccount={updateAccount}
      />
      <Row>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Admin/User</Form.Label>{" "}
          <Form.Select
            name="role"
            onChange={handleChangeQuery}
            aria-label="Admin/User"
          >
            <option value="1">Admin</option>
            <option value="0">User</option>
          </Form.Select>
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Sắp xếp</Form.Label>
          <Form.Select aria-label="Sắp xếp">
            <option value="0">Ngày đăng ký</option>
          </Form.Select>
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Sắp xếp</Form.Label>{" "}
          <Form.Select
            name="sort"
            onChange={handleChangeQuery}
            aria-label="Sắp xếp"
          >
            <option value="asc">Tăng</option>
            <option value="desc">Giảm</option>
          </Form.Select>{" "}
        </Col>
        <Col xs={12} xl={3} lg={3} sm={12}>
          <Form.Label>Tìm kiếm</Form.Label>
          <Form.Control
            name="like"
            type="text"
            onChange={handleChangeQuery}
            placeholder="Nhập vào từ khóa"
          />
        </Col>
      </Row>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tài khoản</th>
            <th>Họ tên</th>
            <th>CMND/CCCD</th>
            <th>SĐT</th>
            <th>Admin/User</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.Username}</td>
                <td>{item.Name}</td>
                <td>{item.Phone}</td>
                <td>{item.Identity}</td>
                <td>{item.IsAdmin == 1 ? "Admin" : "User"}</td>
                <td>
                  <Button
                    id={item.Username}
                    onClick={handleDeleteAccount}
                    variant="danger"
                  >
                    Xóa
                  </Button>
                  <Button
                    onClick={() => {
                      setdialogShow({
                        userUpdate: item.Username,
                        onShow: true,
                      });
                    }}
                    variant="light"
                  >
                    Sửa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Account;

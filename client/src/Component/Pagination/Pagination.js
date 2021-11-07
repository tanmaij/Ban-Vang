import React from "react";
import { Pagination } from "react-bootstrap";
const Page = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Pagination>
        <Pagination.First />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Last />
      </Pagination>
    </div>
  );
};

export default Page;

import React from "react";
import { Pagination } from "react-bootstrap";
const Page = ({ pagination, query, setquery }) => {
  let totalPage;
  if (pagination != null) {
    totalPage =
      Math.floor(parseInt(pagination.total) / parseInt(pagination.limit)) + 1;
    console.log(parseInt(pagination.limit), parseInt(pagination.total));
    if (parseInt(pagination.total) % parseInt(pagination.limit) == 0)
      totalPage--;
  }
  if (pagination == null)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
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
  else {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Pagination>
          <Pagination.First
            onClick={(e) => {
              setquery({ ...query, page: 1 });
            }}
          />
          {pagination.page > 1 ? (
            <Pagination.Item
              onClick={(e) => {
                setquery({ ...query, page: 1 });
              }}
            >
              {1}
            </Pagination.Item>
          ) : null}
          {pagination.page > 3 ? <Pagination.Ellipsis /> : null}
          {pagination.page > 2 ? (
            <Pagination.Item
              onClick={(e) => {
                setquery({ ...query, page: pagination.page - 1 });
              }}
            >
              {pagination.page - 1}
            </Pagination.Item>
          ) : null}
          <Pagination.Item active>{pagination.page}</Pagination.Item>
          {pagination.page < totalPage - 1 ? (
            <Pagination.Item
              onClick={(e) => {
                setquery({ ...query, page: pagination.page + 1 });
              }}
            >
              {pagination.page + 1}
            </Pagination.Item>
          ) : null}
          {pagination.page < totalPage - 3 ? <Pagination.Ellipsis /> : null}
          {pagination.page < totalPage ? (
            <Pagination.Item
              onClick={(e) => {
                setquery({ ...query, page: totalPage });
              }}
            >
              {totalPage}
            </Pagination.Item>
          ) : null}
          <Pagination.Last
            onClick={(e) => {
              setquery({ ...query, page: totalPage });
            }}
          />
        </Pagination>
      </div>
    );
  }
};

export default Page;

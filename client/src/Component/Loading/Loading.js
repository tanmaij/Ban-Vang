import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loading.css";
const Loading = ({ onLoading }) => {
  return (
    <>
      {onLoading == true ? (
        <div className="loading">
          <Spinner animation="grow" variant="secondary" />
        </div>
      ) : null}
    </>
  );
};

export default Loading;

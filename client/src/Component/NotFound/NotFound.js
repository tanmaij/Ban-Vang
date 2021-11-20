import React from "react";

export const NotFound = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: "1001",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center" }}>404</h1>
        <h2 style={{ textAligh: "center" }}>Địa chỉ không xác định</h2>
      </div>
    </div>
  );
};

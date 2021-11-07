import React, { useReducer } from "react";
import introduceReducer from "../../reducer/introduceReducer";
import item1Src from "../../Asset/Introduce/item1.png";
import "./Introduce.css";
import item2Src from "../../Asset/Introduce/item2.png";
import item3Src from "../../Asset/Introduce/item3.png";
const Introduce = () => {
  const [introduceState, dispatch] = useReducer(introduceReducer, {
    item1: "introduceItem1 introduceItem start",
    item2: "introduceItem2 introduceItem hide",
    item3: "introduceItem introduceItem3 hide",
  });

  setTimeout(() => {
    if (introduceState.item3 === "introduceItem introduceItem3 show")
      dispatch("next1");
    else if (
      introduceState.item1 === "introduceItem1 introduceItem show" ||
      introduceState.item1 === "introduceItem1 introduceItem start"
    )
      dispatch("next2");
    else if (introduceState.item2 === "introduceItem2 introduceItem show")
      dispatch("next3");
  }, 6000);
  return (
    <div className="introduceContainer">
      <div className={introduceState.item1}>
        <img className="item1" src={item1Src} />
        <div className="sloganItem1">
          <h3 className="slogan1">KHO TRANG SỨC</h3>
          <h4 className="slogan1-2">Quý phái trong tầm tay</h4>
          <div className="buttonHeader1">Đặt hàng ngay</div>
        </div>
      </div>
      <div className={introduceState.item2}>
        <div className="sloganItem1">
          <h3 className="slogan2">BƯỚC ĐỘT PHÁ</h3>
          <h4 className="slogan2-2">Từ trong phong cách</h4>
        </div>
        <img className="item2" src={item2Src} />
      </div>
      <div className={introduceState.item3}>
        <h3 className="slogan1">NHANH CHÓNG TÌM HIỂU NGAY</h3>
        <img className="item1" src={item3Src} />
        <div className="sloganItem1"></div>
      </div>
    </div>
  );
};

export default Introduce;

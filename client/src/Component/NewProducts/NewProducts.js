import React, { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import NewProductItem from "../NewProductItem/NewProductItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faLevelDownAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./NewProducts.css";
const NewProducts = () => {
  const resizeCarousel = (e) => {
    if (e.target.innerWidth <= 576)
      setQuatity(1) /* width:"2952px",translate:328*/;
    else if (e.target.innerWidth >= 576 && e.target.innerWidth <= 768)
      setQuatity(2);
    else if (e.target.innerWidth >= 768 && e.target.innerWidth <= 992)
      setQuatity(3);
    else if (e.target.innerWidth >= 992 && e.target.innerWidth <= 1200)
      setQuatity(3);
    else if (e.target.innerWidth >= 1200) setQuatity(3); //456
  };
  const { innerWidth: widthScreen } = window;

  const [quatity, setQuatity] = useState(() => {
    if (widthScreen <= 576) return 1 /* width:"2952px",translate:328*/;
    else if (widthScreen >= 576 && widthScreen <= 768) return 2;
    else if (widthScreen >= 768 && widthScreen <= 992) return 3;
    else if (widthScreen >= 992 && widthScreen <= 1200) return 3;
    else if (widthScreen >= 1200) return 3; //456
  });
  const paragraphWidth = 12 / quatity;
  const listWidth = paragraphWidth * widthScreen * 0.9 + "px";
  const [count, setCount] = useState(0);
  const next = () => {
    if (count + 1 > 12 - quatity) setCount(0);
    else setCount(count + 1);
  };
  const prev = () => {
    if (count - 1 < 0) setCount(12 - quatity);
    else setCount(count - 1);
  };
  const translate =
    "translateX(-" +
    ((paragraphWidth * widthScreen * 0.9) / 12) * count +
    "px)";

  useEffect(() => {
    window.addEventListener("resize", resizeCarousel);
    return () => {
      window.removeEventListener("resize", resizeCarousel);
    };
  }, []);
  let myCarousel;
  useEffect(() => {
    myCarousel = setTimeout(next, 4000);
    return () => {
      clearTimeout(myCarousel);
    };
  });

  return (
    <div className="NewProduct">
      <h4 style={{ textAlign: "center", marginTop: "20px" }}>Sản phẩm mới</h4>
      <h6 style={{ textAlign: "center" }}>Nhanh chóng bắt kịp xu hướng</h6>
      <div className="fix">
        <Button onClick={next} className="btnSlide nextSlide">
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
        <div
          style={{ width: listWidth, transform: translate }}
          className="List-NewProducts"
        >
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
          <NewProductItem />
        </div>
        <Button onClick={prev} className="btnSlide prevSlide">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button className="more">
          Xem thêm <FontAwesomeIcon icon={faLevelDownAlt} />
        </Button>
      </div>
    </div>
  );
};

export default NewProducts;

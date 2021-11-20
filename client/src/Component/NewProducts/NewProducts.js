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
import axios from "axios";
const NewProducts = () => {
  const [data, setdata] = useState([]);
  const getNewProducts = async () => {
    const newProducts = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/products?_order=createdAt&_sort=desc&_like=&_page=1&_limit=12`
    );
    let data = newProducts.data.data;
    const numItem = 12 - data.length;
    if (data.length < 12)
      for (let i = 0; i < numItem; i++) {
        data.push({
          ProductId: -1,
          Name: "Không có sản phẩm",
          Image:
            "https://res.cloudinary.com/dwqgjj2hp/image/upload/v1637212820/3d09cad6a03f0bad68c8e2454af4f87e_rh3nkh.jpg",
          Price: 0,
        });
      }
    setdata(data);
  };
  useEffect(() => {
    getNewProducts();
  }, []);
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
  const width = (paragraphWidth * widthScreen * 0.9) / 12;
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
        <Button onClick={next} variant="light" className="btnSlide nextSlide">
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
        <div
          style={{ width: listWidth, transform: translate }}
          className="List-NewProducts"
        >
          {data.map((item) => {
            return <NewProductItem data={item} width={width} />;
          })}
          {/* <NewProductItem />
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
          <NewProductItem /> */}
        </div>
        <Button onClick={prev} variant="light" className="btnSlide prevSlide">
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

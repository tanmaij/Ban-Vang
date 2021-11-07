import React from "react";
import GetMoreProduct from "../GetMoreProduct/GetMoreProduct";
import Introduce from "../Introduce/Introduce";
import NewProducts from "../NewProducts/NewProducts";
const Home = () => {
  return (
    <div>
      <Introduce />
      <NewProducts />
      <GetMoreProduct />
    </div>
  );
};

export default Home;

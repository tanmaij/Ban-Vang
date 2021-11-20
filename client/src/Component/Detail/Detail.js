import React, { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import demo from "../../Asset/demo.png";
import "./Detail.css";
import CartContext from "../../context/CartContext";
const Detail = ({ data }) => {
  const cartContext = useContext(CartContext);
  const canvasRef = React.useRef(null);
  const imageRef = React.useRef(null);
  React.useEffect(() => {
    console.log(canvasRef);
    console.log(imageRef);
  }, []);
  const handleMouseMove = (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let { clientHeight, clientWidth } = e.target;
    let destinationX = (x / clientWidth) * 600;
    let destinationY = (y / clientHeight) * 600;
    let destinationWidth =
      (imageRef.current.naturalWidth * 600) / imageRef.current.naturalHeight;
    if (destinationX > destinationWidth - 300)
      destinationX = destinationWidth - 300;
    if (destinationY > (600 * 1) / 2) destinationY = (600 * 1) / 2;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 300, 300);
    ctx.drawImage(
      imageRef.current,
      -destinationX,
      -destinationY,
      destinationWidth,
      600
    );
  };
  if (data) console.log(data);
  if (data)
    return (
      <Container style={{ marginBottom: "5rem" }}>
        <h3
          style={{
            fontFamily: "Times New Roman",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Sản phẩm
        </h3>
        <div className="Detail">
          <div className="ProductDetail">
            <div className="ImageBox" style={{ position: "relative" }}>
              <img
                ref={imageRef}
                onMouseMove={handleMouseMove}
                className="ImageDetail"
                src={data.Image}
              />
              <canvas
                className="canva"
                ref={canvasRef}
                width={300}
                height={300}
              ></canvas>
            </div>
            <div className="infoDetail">
              <h4>{data.Name}</h4>
              <p>
                {data.Price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p>Số lượng: {data.Quantity}</p>
              <p>Size: {data.Size}</p>
              <Button
                onClick={() => {
                  cartContext.addProduct(data.ProductId);
                }}
                variant="outline-secondary"
              >
                Thêm vào giỏ
              </Button>
            </div>
          </div>
        </div>
        <div className="Describe">
          <h4>Thông tin chi tiết</h4>
          <p>{data.Desc}</p>
        </div>
      </Container>
    );
  else return null;
};

export default Detail;

import React from "react";
import { Button, Container } from "react-bootstrap";
import demo from "../../Asset/demo.png";
import "./Detail.css";
const Detail = () => {
  const canvasRef = React.useRef(null);
  const imageRef = React.useRef(null);
  React.useEffect(() => {
    console.log(canvasRef);
    console.log(imageRef);
  }, [])
  const handleMouseMove=(e)=>{
    let rect = e.target.getBoundingClientRect();
              let x = e.clientX - rect.left; 
              let y = e.clientY - rect.top; 
              let {clientHeight,clientWidth}=e.target;
   let destinationX=(x/clientWidth)*600;
   let destinationY=(y/clientHeight)*600;
   let destinationWidth=(imageRef.current.naturalWidth*600)/(imageRef.current.naturalHeight)
   if(destinationX>destinationWidth-300)
      destinationX=destinationWidth-300;
   if(destinationY>600*1/2)
      destinationY=600*1/2;
   const ctx=canvasRef.current.getContext("2d");
   ctx.clearRect(0,0,300,300);
   ctx.fillStyle="#ffffff";
   ctx.fillRect(0,0,300,300);
   ctx.drawImage(imageRef.current,-destinationX,-destinationY,destinationWidth,600);
  }
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
          <div className="ImageBox" style={{position:"relative"}}>
            <img ref={imageRef} onMouseMove={handleMouseMove} className="ImageDetail" src={demo} />
            <canvas className="canva" ref={canvasRef} width={300} height={300}></canvas>
          </div>
          <div className="infoDetail">
            <h4>Nhẫn hoàng gia</h4>
            <p>2.000.000 vnđ</p>
            <p>Số lượng: 6</p>
            <p>Size: 6</p>
            <Button variant="outline-secondary">Thêm vào giỏ</Button>
          </div>
        </div>
      </div>
      <div className="Describe">
        <h4>Thông tin chi tiết</h4>
        <p>
          Phần mềm quản lý bán hàng SUNO giúp bạn kiểm soát tồn kho chặt chẽ,
          giảm thất thoát lên đến 30%. Nhập kho và cập nhật giá tiện lợi, bán
          hàng được ngay. Biết được hàng nào bán chạy, hàng nào nên ngừng, công
          nợ với nhà cung cấp, phân phối.
        </p>
      </div>
    </Container>
  );
};

export default Detail;

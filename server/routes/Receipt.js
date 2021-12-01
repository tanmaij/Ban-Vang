const productModel = require("../models/Product");
const receiptModel = require("../models/Receipt");
const express = require("express");
const basicAuth = require("../middleware/basicAuth");
const accountModel = require("../models/Account");
const receiptDetailsModel = require("../models/ReceiptDetails");
const router = express.Router();

class payment {
  constructor(Carts, Address, Id, User) {
    this.Carts = Carts;
    this.Address = Address;
    this.Id = Id;
    this.User = User;
  }
}

let paymentData = [];
router.post("/momo", basicAuth, async (req, res) => {
  const orderId = await req.body.orderId;
  const getPayment = paymentData.find((item) => {
    return item.Id === orderId;
  });

  if (!getPayment) {
    return res
      .status(400)
      .json({ success: false, message: "Không tìm thấy hóa đơn của bạn" });
  }
  if (req.user.username !== getPayment.User)
    return res
      .status(400)
      .json({ success: false, message: "Bạn không đủ quyền" });
  const Carts = getPayment.Carts;
  const Address = getPayment.Address;
  const User = getPayment.User;
  const date = new Date();
  const createdAt = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  try {
    const newReceipt = await receiptModel.add(createdAt, Address, 1, 1, User);
    const newId = newReceipt.insertId;
    try {
      for (let i = 0; i < Carts.length; i++) {
        const getProduct = await productModel.getById(Carts[i].ProductId);
        if (getProduct[0].Quantity - Carts[i].Num < 0) {
          await receiptModel.delete(newId);
          return res
            .status(400)
            .json({ success: false, message: "Không đủ số lượng" });
        }
        await receiptDetailsModel.add(Carts[i].ProductId, Carts[i].Num, newId);

        await productModel.updateQuantity(
          Carts[i].ProductId,
          getProduct[0].Quantity - Carts[i].Num
        );
      }
      return res
        .status(200)
        .json({ success: true, message: "Successful!!!!!!!!!!!!!!!!!!!!!" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, message: "ERROR" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "ERROR" });
  }
});
router.delete("/:id", basicAuth, async (req, res) => {
  const getReceipts = await receiptModel.getById(req.params.id);
  if (getReceipts.length == 0)
    return res
      .status(400)
      .json({ message: "Sản phẩm không tồn tại", success: false });
  if (req.user.IsAdmin == 0 && req.user.username !== getReceipts[0].Username)
    return res
      .status(400)
      .json({ message: "Không thể thực hiện ", success: false });
  try {
    await receiptModel.delete(getReceipts[0].ReceiptId);
    res.status(200).json({
      success: true,
      message: "Thành công",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Lỗi không xác định" });
  }
});
router.get("/users", basicAuth, async (req, res) => {
  const getReceipts = await receiptModel.getByUsername(req.user.username);
  if (getReceipts.length == 0)
    return res
      .status(400)
      .json({ message: "Đơn hàng không tồn tại", success: false });
  if (req.user.IsAdmin == 0 && req.user.username !== getReceipts[0].Username)
    return res.status(400).json({ message: "Không thể xem ", success: false });
  try {
    res.status(200).json({
      success: true,
      data: getReceipts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Lỗi không xác định" });
  }
});
router.get("/:id", basicAuth, async (req, res) => {
  const getReceipts = await receiptModel.getById(req.params.id);
  if (getReceipts.length == 0)
    return res
      .status(400)
      .json({ message: "Sản phẩm không tồn tại", success: false });
  if (req.user.IsAdmin == 0 && req.user.username !== getReceipts[0].Username)
    return res.status(400).json({ message: "Không thể xem ", success: false });
  try {
    const getReceiptDetails = await receiptDetailsModel.getById(
      getReceipts[0].ReceiptId
    );
    res.status(200).json({
      success: true,
      data: { Receipt: getReceipts[0], Details: getReceiptDetails },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Lỗi không xác định" });
  }
});
router.patch("/:id", basicAuth, async (req, res) => {
  const { status } = req.body;
  const getReceipts = await receiptModel.getById(req.params.id);
  if (!status)
    return res.status(400).json({ message: "Yêu cầu dữ liệu", success: false });
  if (getReceipts.length == 0)
    return res
      .status(400)
      .json({ message: "Sản phẩm không tồn tại", success: false });
  try {
    await receiptModel.update(
      getReceipts[0].CustomerAddress,
      status,
      getReceipts[0].PaymentMethod,
      getReceipts[0].ReceiptId
    );
    res.status(200).json({ success: true, message: "Đã xóa thành công" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Lỗi không xác định" });
  }
});
router.get("/", basicAuth, async (req, res) => {
  const { _payment, _order, _sort, _like, _limit, _page } = req.query;
  if (req.user.IsAdmin == 0)
    return res
      .status(403)
      .json({ success: false, message: "Bạn không có quyền" });
  try {
    const getReceipts = await receiptModel.get();
    let responseReceipts = [...getReceipts];
    if (typeof parseInt(_payment) === "number") {
      responseReceipts = responseReceipts.filter((item) => {
        return item.PaymentMethod.toString() == _payment;
      });
    }

    if (_order && _sort)
      if (_order === "createdAt") {
        if (_sort === "asc")
          responseReceipts = responseReceipts.sort((r1, r2) => {
            return new Date(r1.CreatedAt) - new Date(r2.CreatedAt);
          });
        else if (_sort === "desc")
          responseReceipts = responseReceipts.sort((r1, r2) => {
            return new Date(r2.CreatedAt) - new Date(r1.CreatedAt);
          });
      } else if (_order == "money") {
        {
          if (_sort === "asc")
            responseReceipts = responseReceipts.sort((r1, r2) => {
              return new Date(r1.Money) - new Date(r2.Money);
            });
          else if (_sort === "desc")
            responseReceipts = responseReceipts.sort((r1, r2) => {
              return new Date(r2.Money) - new Date(r1.Money);
            });
        }
      }
    let limit = responseReceipts.length;
    let page = 1;
    let total = responseReceipts.length;
    if (_limit && _page)
      if (
        typeof parseInt(_limit) === "number" &&
        typeof parseInt(_page) === "number"
      ) {
        limit = parseInt(_limit);
        page = parseInt(_page);
      }

    responseReceipts = responseReceipts.slice((page - 1) * limit, page * limit);
    return res.status(200).json({
      success: true,
      data: responseReceipts,
      pagination: {
        page: page,
        limit: limit,
        total: total,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Lỗi không xác định", success: false });
  }
});
router.post("/", basicAuth, async (req, res) => {
  console.log("rrrrrrrrrrrrrrrrr");
  const { Carts, Address, Payment } = req.body;
  const username = req.user.username;
  if (!Carts)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng cung cấp giỏ hàng của bạn" });
  if (!Address)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền vào địa chỉ" });
  if (!Payment)
    return res.status(400).json({
      success: false,
      message: "Vui lòng cho biết cách bạn thanh toán",
    });
  if (parseInt(Payment) != 0 && parseInt(Payment) != 1)
    return res.status(400).json({
      success: false,
      message: "Vui lòng cho biết phương thức thanh toán",
    });
  const date = new Date();
  const createdAt = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  if (parseInt(Payment) == 0) {
    try {
      const newReceipt = await receiptModel.add(
        createdAt,
        Address,
        1,
        Payment,
        req.user.username
      );
      const newId = newReceipt.insertId;
      try {
        for (let i = 0; i < Carts.length; i++) {
          const getProduct = await productModel.getById(Carts[i].ProductId);
          if (getProduct[0].Quantity - Carts[i].Num < 0) {
            await receiptModel.delete(newId);
            return res
              .status(400)
              .json({ success: false, message: "Không đủ số lượng" });
          }
          await receiptDetailsModel.add(
            Carts[i].ProductId,
            Carts[i].Num,
            newId
          );

          await productModel.updateQuantity(
            Carts[i].ProductId,
            getProduct[0].Quantity - Carts[i].Num
          );
        }
      } catch {
        await receiptModel.delete(newId);
      }
      return res.status(200).json({ success: true, message: "Ok" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Lỗi không xác định" });
    }
  } else if (parseInt(Payment) == 1) {
    let money = 0;
    for (let i = 0; i < Carts.length; i++) {
      const getProduct = await productModel.getById(Carts[i].ProductId);
      if (getProduct[0].Quantity - Carts[i].Num < 0) {
        await receiptModel.delete(newId);
        return res
          .status(400)
          .json({ success: false, message: "Không đủ số lượng" });
      }
      money += Carts[i].Num * getProduct[0].Price;
    }
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretkey = process.env.MOMO_SECRET_KEY;
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = "Đơn hàng của " + username;
    const redirectUrl = "http://localhost:3000/carts";
    const ipnUrl = "https://callback.url/notify";
    // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    const amount = money;
    const requestType = "captureWallet";
    const extraData = ""; //pass empty value if your merchant does not have stores
    console.log(Carts);
    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    //puts raw signature
    // console.log("--------------------RAW SIGNATURE----------------");
    // console.log(rawSignature);
    // //signature
    const crypto = require("crypto");
    const signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");
    // console.log("--------------------SIGNATURE----------------");
    // console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: "en",
    });
    //Create the HTTPS objects
    const https = require("https");
    const options = {
      hostname: "test-payment.momo.vn",
      port: 443,
      path: "/v2/gateway/api/create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };
    //Send the request and get the response

    const req = https.request(options, (response) => {
      //  console.log(`Status: ${response.statusCode}`);
      //  console.log(`Headers: ${JSON.stringify(response.headers)}`);
      response.setEncoding("utf8");
      response.on("data", (body) => {
        // console.log("Body: ");
        // console.log(body);
        // console.log("payUrl: ");
        // console.log(JSON.parse(body).payUrl);
        const newPayment = new payment(Carts, Address, orderId, username);
        paymentData.push(newPayment);
        setTimeout(() => {
          paymentData = paymentData.filter((item) => {
            return item !== newPayment;
          });
        }, 10 * 60 * 1000);
        return res
          .status(200)
          .json({ success: true, data: JSON.parse(body).payUrl });
      });
      res.on("end", () => {
        console.log("No more data in response.");
      });
    });
    req.on("error", (e) => {
      console.log(`problem with request: ${e.message}`);
      return res
        .status(500)
        .json({ success: false, message: "Lỗi không xác định" });
    });
    // write data to request body
    //  console.log("Sending....");
    req.write(requestBody);
    req.end();
  }
});
router.post("/carts", basicAuth, async (req, res) => {
  try {
    const { address, cart, payment } = req.body;
    if (!address)
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng điền vào địa chỉ" });
    const productsId = cart.map((item) => item.ProductId);
    const products = await productModel.getByArrayId(productsId);
    const accountData = await accountModel.getByUserName(req.user.username);
    const newReceipt = {
      Carts: products.map((item) => {
        const findProduct = cart.find((c) => c.ProductId == item.ProductId);
        return {
          ...item,
          Num: findProduct.Num,
        };
      }),
      Address: address,
      Account: accountData[0],
      Payment: payment,
    };
    res.status(200).json({ success: true, data: newReceipt });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Lỗi không xác định" });
  }
});

module.exports = router;

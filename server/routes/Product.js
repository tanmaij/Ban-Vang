const productModel = require("../models/Product");
const express = require("express");
const basicAuth = require("../middleware/basicAuth");
const upload = require("../middleware/upload");
const unlink = require("../unlink");
const router = express.Router();

const middleware = {
  basicAuth,
  upload,
};
router.get("/:id", async (req, res) => {
  try {
    const ids = req.params.id;
    let arrayId = ids.split("-");
    const getProducts = await productModel.getByArrayId(arrayId);
    if (getProducts.length == 0)
      return res
        .status(400)
        .json({ success: false, message: "Không tìm thấy" });
    res.status(200).json({ success: true, data: getProducts });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Lỗi không xác định" });
  }
});
router.get("/", async (req, res) => {
  try {
    const { _order, _sort, _like, _price, _page, _limit, _quantity } =
      req.query;
    let response = await productModel.get(_like);
    if (_price)
      if (
        parseInt(_price.split(".")[0]) > -1 &&
        parseInt(_price.split(".")[1]) > -1
      ) {
        response = response.filter((item) => {
          return (
            item.Price >= parseInt(_price.split(".")[0]) &&
            item.Price <= parseInt(_price.split(".")[1])
          );
        });
      } else if (
        parseInt(_price.split(".")[0] > -1) &&
        parseInt(_price.split(".")[1] == -1)
      ) {
        response = response.filter((item) => {
          return item.Price > 0;
        });
      } else if (
        parseInt(_price.split(".")[0]) == -1 &&
        parseInt(_price.split(".")[1]) > -1
      ) {
        response = response.filter((item) => {
          return item.Price > 100000000;
        });
      }
    if (_quantity) {
      if (parseInt(_quantity) == -1) {
      } else if (parseInt(_quantity) == 0) {
        response = response.filter((item) => {
          return item.Quantity == 0;
        });
      } else if (parseInt(_quantity) == 1) {
        response = response.filter((item) => {
          return item.Quantity > 0;
        });
      }
    }
    if (_order == "createdAt") {
      if (_sort == "asc")
        response = response.sort((item1, item2) => {
          return new Date(item1.CreatedAt) - new Date(item2.CreatedAt);
        });
      if (_sort == "desc")
        response = response.sort((item1, item2) => {
          return new Date(item2.CreatedAt) - new Date(item1.CreatedAt);
        });
    } else if (_order == "price") {
      if (_sort == "asc")
        response = response.sort((item1, item2) => {
          return item1.Price - item2.Price;
        });
      if (_sort == "desc")
        response = response.sort((item1, item2) => {
          return item2.Price - item1.Price;
        });
    } else if (_order === "receipt") {
      const productReceipt = await productModel.getQuantityReceipt(_like);
      for (let i = 0; i < response.length; i++) {
        let sum = 0;
        for (let j = 0; j < productReceipt.length; j++) {
          if (response[i].ProductId === productReceipt[i].ProductId)
            sum = productReceipt[i].ReceiptQuantity;
        }
        response[i].Sum = sum;
      }
      if (_sort == "asc")
        response = response.sort((item1, item2) => {
          return item1.Sum - item2.Sum;
        });
      if (_sort == "desc")
        response = response.sort((item1, item2) => {
          return item2.Sum - item1.Sum;
        });
    }
    let page = 1,
      limit = response.length,
      total = response.length;
    if (_page && _limit) {
      page = parseInt(_page);
      limit = parseInt(_limit);
    }
    response = response.slice((page - 1) * limit, page * limit);
    return res.status(200).json({
      success: true,
      data: response,
      pagination: { page: page, limit: limit, total: total },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Lỗi không xác định" });
  }
});
router.post(
  "/",
  [middleware.basicAuth, middleware.upload],
  async (req, res) => {
    if (req.user.isAdmin == 0)
      return res
        .status(403)
        .json({ success: false, message: "Bạn không đủ quyền hạn" });
    if (!req.result)
      return res
        .status(400)
        .json({ success: false, message: "Không tìm thấy file" });
    const { name, desc, size, quantity, price } = req.body;
    if (!name || !desc || !size || !quantity || !price) {
      await unlink(req.result.public_id);
      return res
        .status(400)
        .json({ success: true, message: "Vui lòng cung cấp đủ thông tin" });
    }
    if (
      name.length == 0 ||
      desc.length == 0 ||
      size < 1 ||
      quantity < 0 ||
      price < 0
    ) {
      await unlink(req.result.public_id);
      return res
        .status(400)
        .json({ success: true, message: "Vui lòng cung cấp thông tin hợp lệ" });
    }
    try {
      await productModel.add(
        name,
        req.result.url,
        desc,
        size,
        quantity,
        price,
        req.result.public_id
      );
      return res
        .status(200)
        .json({ message: "Thêm sản phẩm thành công", success: true });
    } catch (err) {
      console.log(err);
      await unlink(req.result.public_id);
      return res
        .status(500)
        .json({ message: "Lỗi không xác định", success: false });
    }
  }
);
router.patch(
  "/:id",
  [middleware.basicAuth, middleware.upload],
  async (req, res) => {
    if (req.user.isAdmin == 0)
      return res
        .status(403)
        .json({ success: false, message: "Bạn không đủ quyền hạn" });
    // if (!req.result)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Không tìm thấy file" });
    const { name, desc, size, quantity, price } = req.body;
    if (!name || !desc || !size || !quantity || !price) {
      if (req.result) await unlink(req.result.public_id);
      return res
        .status(400)
        .json({ success: true, message: "Vui lòng cung cấp đủ thông tin" });
    }
    if (
      name.length == 0 ||
      desc.length == 0 ||
      size < 1 ||
      quantity < 0 ||
      price < 0
    ) {
      if (req.result) await unlink(req.result.public_id);
      return res
        .status(400)
        .json({ success: true, message: "Vui lòng cung cấp thông tin hợp lệ" });
    }
    const getProduct = await productModel.getById(req.params.id);
    if (getProduct.length == 0)
      return res
        .status(400)
        .json({ success: true, message: "Không tìm thấy sản phẩm" });
    let check = false;
    if (req.result) check = true;
    if (!req.result)
      req.result = {
        url: getProduct[0].Image,
        public_id: getProduct[0].Public_Id,
      };
    try {
      await productModel.update(
        getProduct[0].ProductId,
        name,
        req.result.url,
        desc,
        size,
        quantity,
        price,
        req.result.public_id
      );
      if (check) await unlink(getProduct[0].Public_Id);
      return res
        .status(200)
        .json({ message: "Cập nhật thành công", success: true });
    } catch (err) {
      console.log(err);
      if (req.result) await unlink(req.result.public_id);
      return res
        .status(500)
        .json({ message: "Lỗi không xác định", success: false });
    }
  }
);
router.delete("/:id", basicAuth, async (req, res) => {
  if (req.user.isAdmin == 0)
    return res
      .status(403)
      .json({ success: false, message: "Bạn không đủ quyền hạn" });

  const getProduct = await productModel.getById(req.params.id);
  if (getProduct.length == 0)
    return res
      .status(400)
      .json({ success: true, message: "Không tìm thấy sản phẩm" });

  try {
    await productModel.delete(getProduct[0].ProductId);
    await unlink(getProduct[0].Public_Id);
    return res.status(200).json({ message: "Xóa thành công", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Lỗi không xác định", success: false });
  }
});
module.exports = router;

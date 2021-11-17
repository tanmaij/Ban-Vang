const accountModel = require("../models/Account");
const express = require("express");
const basicAuth = require("../middleware/basicAuth");
const router = express.Router();

router.patch("/:username", basicAuth, async (req, res) => {
  const role = req.body.role;
  if (req.user.isAdmin == 0)
    return res
      .status(403)
      .json({ success: false, message: "Bạn không đủ quyền hạn" });

  const getAccount = await accountModel.getByUserName(req.params.username);
  if (getAccount.length == 0)
    return res
      .status(400)
      .json({ message: "Không tìm thấy tài khoản này", success: false });
  try {
    await accountModel.updateRole(req.params.username, role);
    return res
      .status(200)
      .json({ success: true, message: "Đã cập nhật thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Lỗi không xác định" });
  }
});

router.delete("/:username", basicAuth, async (req, res) => {
  if (req.user.isAdmin == 0)
    return res
      .status(403)
      .json({ success: false, message: "Bạn không đủ quyền hạn" });
  const getAccount = await accountModel.getByUserName(req.params.username);
  if (getAccount.length == 0)
    return res
      .status(400)
      .json({ message: "Không tìm thấy tài khoản này", success: false });
  try {
    await accountModel.delete(req.params.username);
    return res
      .status(200)
      .json({ success: true, message: "Đã xóa thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Lỗi không xác định" });
  }
});
router.get("/", basicAuth, async (req, res) => {
  if (req.user.isAdmin == 0)
    return res
      .status(403)
      .json({ success: false, message: "Bạn không đủ quyền hạn" });
  const { _sort, _like, _role } = req.query;
  try {
    const allAccount = await accountModel.getAll(_sort, _like, parseInt(_role));
    return res.status(200).json({ success: true, data: allAccount });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Lỗi không xác định" });
  }
});
module.exports = router;

const accountModel = require("../models/Account");
const express = require("express");
const router = express.Router();
const bCrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const authBase64 = req.headers.authorization.split(" ")[1];
    const username = Buffer.from(authBase64, "base64")
      .toString("ascii")
      .split(":")[0];
    const password = Buffer.from(authBase64, "base64")
      .toString("ascii")
      .split(":")[1];
    if (!username)
      return res
        .status(401)
        .json({ success: false, message: "Username không được để trống" });
    if (username.length < 8)
      return res
        .status(401)
        .json({ success: false, message: "Tên đăng nhập tối thiểu 8 ký tự" });

    if (!password)
      return res
        .status(401)
        .json({ success: false, message: "Mật khẩu không được để trống" });
    if (/%|_/g.test(password) || /%|_/g.test(username))
      return res.status(400).json({
        success: false,
        message: "Thông tin không được chứa ký tự đặc biệt",
      });
    const getAccount = await accountModel.getByUserName(username);
    if (getAccount.length == 0)
      return res
        .status(401)
        .json({ success: false, message: "Tên đăng nhập không tồn tại" });
    const checkPassword = await bCrypt.compare(
      password,
      getAccount[0].Password
    );
    if (!checkPassword)
      return res
        .status(401)
        .json({ success: false, message: "Mật khẩu không chính xác" });
    res.status(200).json({ success: true, data: getAccount[0] });
  } catch {
    return res.status(401).json({ success: false, message: "Không chính xác" });
  }
});
router.post("/register", async (req, res) => {
  const { username, password, name, identity, phone } = req.body;

  if (!username)
    return res
      .status(400)
      .json({ success: false, message: "Username không được để trống" });
  if (username.length < 8)
    return res
      .status(400)
      .json({ success: false, message: "Tên đăng nhập tối thiểu 8 ký tự" });

  if (!password)
    return res
      .status(400)
      .json({ success: false, message: "Mật khẩu không được để trống" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ success: false, message: "Mật khẩu tối thiểu 6 ký tự" });
  if (!name || !identity || !phone)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin" });
  if (name.length < 0 || identity.length == 0 || phone.length == 0)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin" });

  if (
    /%|_/g.test(name) ||
    /%|_/g.test(password) ||
    /%|_/g.test(username) ||
    /%|_/g.test(identity) ||
    /%|_/g.test(phone)
  )
    return res.status(400).json({
      success: false,
      message: "Thông tin không được chứa ký tự đặc biệt",
    });
  const checkAccount = await accountModel.getByUserName(username);
  if (checkAccount.length > 0)
    return res
      .status(400)
      .json({ success: false, message: "Tên đăng nhập đã tồn tại" });
  const passwordHashed = await bCrypt.hash(
    password,
    parseInt(process.env.SETCRET_LENG)
  );
  try {
    await accountModel.add(username, passwordHashed, name, identity, phone);
    return res
      .status(200)
      .json({ success: true, message: "Đăng ký thành công" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Lỗi không xác định" });
  }
});

module.exports = router;

const bCrypt = require("bcrypt");
const accountModel = require("../models/Account");

const basicAuth = async (req, res, next) => {
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
    //good
    req.user = {
      username: getAccount[0].Username,
      isAdmin: getAccount[0].IsAdmin,
    };
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Không chính xác" });
  }
};

module.exports = basicAuth;

const cloudinary = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.CLOUND_API_KEY,
  api_secret: process.env.CLOUND_SETCRET,
});

const upload = async (req, res, next) => {
  if (!req.files) {
    next();
    return;
  }
  const file = req.files.file;
  file.tempFilePath =
    "./tmp/" +
    Date.now() +
    "." +
    file.mimetype.substr(file.mimetype.indexOf("/") + 1);
  try {
    await writeFile(file.tempFilePath, file.data);
    const result = await uploadToCloud(file.tempFilePath);
    req.result = { public_id: result.public_id, url: result.url };
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Xảy ra lỗi ghi file trong quá trình tải hình ảnh!",
    });
  }
};
function writeFile(filePath, fileData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileData, function (err) {
      if (err) reject(err);
      else resolve(true);
    });
  });
}
function uploadToCloud(filePath) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(filePath, function (error, result) {
      fs.unlink(filePath, (err) => {});
      if (error) reject(error);
      else resolve(result);
    });
  });
}
module.exports = upload;

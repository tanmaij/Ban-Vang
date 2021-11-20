const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUND_NAME,
  api_key: process.env.CLOUND_API_KEY,
  api_secret: process.env.CLOUND_SETCRET,
});
const unlink = async (public_id) => {
  const destroy = new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(public_id, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  destroy
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};
module.exports = unlink;

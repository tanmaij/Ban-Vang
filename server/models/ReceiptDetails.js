const db = require("../DBconnect");
const receiptDetailsModel = {
  add: (productId, quatity) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into receiptDetails(productId,quatity) values ('${productId}',${quatity})`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  update: (productId, quatity, receiptDetailsId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update receiptDetails set productId='${productId}',quatity=${quatity}) where receiptDetailsId=${receiptDetailsId}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  delete: (receiptDetailsId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `delete from receiptDetails where receiptDetailsId='${receiptDetailsId}'`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  getById: (ReceiptId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from receiptDetails where ReceiptId=${ReceiptId}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
module.exports = receiptDetailsModel;

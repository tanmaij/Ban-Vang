const db = require("../DBconnect");
const receiptDetailsModel = {
  add: (productId, quantity, receiptId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into receiptDetails(productId,quantity,ReceiptId) values ('${productId}',${quantity},'${receiptId}')`,
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
        `select p.Name as Name,p.Price as Price,r.Quantity as Quantity,Image from receiptDetails r, product p where r.ProductId=p.ProductId and ReceiptId=${ReceiptId}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
module.exports = receiptDetailsModel;

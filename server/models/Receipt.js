const db = require("../DBconnect");
const receiptModel = {
  add: (createdAt, customerAddress, status, paymentMethod, Username) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into Receipt(createdAt,customerAddress,status,paymentMethod,Username) values ('${createdAt}','${customerAddress}','${status}',${paymentMethod},${Username})`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  update: (customerAddress, status, paymentMethod, receiptId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update Receipt set customerAddress='${customerAddress}',status='${status}',desc='${desc}',paymentMethod=${paymentMethod},quatity=${quatity} where receiptId='${receiptId}'`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  delete: (receiptId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `delete from receipt where ProductId='${receiptId}'`,
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
        `select * from receipt where ReceiptId=${ReceiptId}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  getByUsername: (Username) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from receipt where Username='${Username}'`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
module.exports = receiptModel;

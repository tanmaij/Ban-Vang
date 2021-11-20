const db = require("../DBconnect");
const receiptModel = {
  add: (createdAt, customerAddress, status, paymentMethod, Username) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into Receipt(createdAt,customerAddress,status,paymentMethod,Username) values ('${createdAt}','${customerAddress}','${status}',${paymentMethod},'${Username}')`,
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
        `update Receipt set customerAddress='${customerAddress}',status=${status},paymentMethod=${paymentMethod} where receiptId='${receiptId}'`,
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
        `delete from receipt where receiptId='${receiptId}'`,
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
        `select * from receipt r, account a where r.username=a.username and ReceiptId=${ReceiptId}`,
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
        `select r.ReceiptId,r.CreatedAt,CustomerAddress,Status,	PaymentMethod,Username,SUM(d.quantity*price) as Money from receipt r,receiptDetails d,Product p where p.ProductId=d.ProductId and r.ReceiptId=d.ReceiptId and Username='${Username}' group by d.ReceiptId`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  get: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `select r.ReceiptId,r.CreatedAt,CustomerAddress,Status,PaymentMethod,Username,SUM(d.quantity*price) as Money from receipt r,receiptDetails d,Product p where p.ProductId=d.ProductId and r.ReceiptId=d.ReceiptId group by d.ReceiptId`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
module.exports = receiptModel;

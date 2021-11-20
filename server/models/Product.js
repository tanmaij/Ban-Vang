const db = require("../DBconnect");
const productModel = {
  add: (name, image, desc, size, quantity, price, public_id) => {
    const date = new Date();
    const createdAt = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return new Promise((resolve, reject) => {
      const descParams = "`Desc`";
      db.query(
        `insert into Product(Name,Image,${descParams},Size,Quantity,CreatedAt,price,public_id) values ('${name}','${image}','${desc}',${size},${quantity},'${createdAt}',${price},'${public_id}')`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  update: (productid, name, image, desc, size, quantity, price, public_id) => {
    const descParams = "`Desc`";
    return new Promise((resolve, reject) => {
      db.query(
        `update Product set name='${name}',image='${image}',${descParams}='${desc}',size=${size},quantity=${quantity},price=${price},public_id='${public_id}' where productid=${productid}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  delete: (productid) => {
    return new Promise((resolve, reject) => {
      db.query(
        `delete from Product where ProductId=${productid}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  get: (search) => {
    const desc = "`desc`";
    let like = "";
    if (search !== "") like = "where name like '%" + search + "%'";
    let sql = `Select * from product ${like} `;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  getQuantityReceipt: (search) => {
    let like = "";
    if (search !== "") like = "and name like '%" + search + "%'";
    let sql = `Select p.productid,SUM(r.Quantity) as ReceiptQuantity from receiptdetails r, product p where r.ProductId=p.ProductId ${like} group by r.ProductId`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  getById: (ProductId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from product where productid=${ProductId}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  getByArrayId: (arrayId) => {
    let ids = "";
    for (let i = 0; i < arrayId.length; i++) {
      if (i == 0) {
        ids += " ProductId='" + arrayId[i] + "'";
        continue;
      }
      ids += " or ProductId='" + arrayId[i] + "'";
    }

    return new Promise((resolve, reject) => {
      db.query(`select * from product where ${ids}`, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  updateQuantity: (productId, quantity) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update Product set quantity=${quantity} where productid=${productId}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
module.exports = productModel;

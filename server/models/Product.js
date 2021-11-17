const db = require("../DBconnect");
const productModel = {
  add: (name, image, desc, size, quatity, createdAt) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into Product(Name,Image,Desc,Size,Quatity,Size,CreatedAt) values ('${name}','${image}','${desc}',${size},${quatity},'${createdAt}')`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  update: (productid, name, image, desc, size, quatity) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update Product set name='${name}',image='${image}',desc='${desc}',size=${size},quatity=${quatity} where productid=${productid}`,
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
  get: (order, sort, page, limit, size, price, search) => {
    let receipt = "";
    let groupby = "";
    let condition = "";
    let orderby = "";
    let like = "%" + search + "%";
    if (order === "receipt") {
      receipt = `receiptdetails r,`;
      groupby = "group by r.productId ";
      condition = `and r.productId=p.productId `;
      orderby = "sum(r.quatity) " + sort;
    } else if (order === "createdat") {
      orderby = "createdat " + sort;
    }
    let sizeSQL = "";
    if (size > 0) sizeSQL = "and p.size=" + size;
    let priceSQL = "";
    if (price[0] > -1 && price[1] > -1)
      priceSQL = "and p.price between " + price[0] + " and " + price[1];
    const between = " between" + (page - 1) * limit + " and " + page * limit;
    let sql = `Select p.productid,name,image,price,p.quatity from ${receipt} product p where ${like} ${sizeSQL} ${priceSQL} ${condition} ${between} ${groupby} order by ${orderby})`;
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
};

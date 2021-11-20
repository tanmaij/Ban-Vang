const db = require("../DBconnect");
const accountModel = {
  add: (userName, password, name, identity, phone) => {
    const date = new Date();
    const createdAt = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO account(Username, Password, Name, Identity, Phone, IsAdmin,CreatedAt) VALUES ('${userName}','${password}','${name}','${identity}','${phone}',0,'${createdAt}')`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  update: (userName, password, name, identity, phone, isAdmin) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update account password=${password}),name=${name}),identity=${identity}),phone=${phone}),isAdmin=${isAdmin}) where userName=${userName}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  updateRole: (userName, role) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update account set isAdmin=${role} where userName='${userName}'`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  delete: (userName) => {
    return new Promise((resolve, reject) => {
      db.query(
        `delete from account where username='${userName}'`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  getByUserName: (userName) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from account where userName='${userName}'`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  getByUserNameAndPassword: (userName, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from account where userName='${userName}' and password='${password}'`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
  getAll: (sort, like, isAdmin) => {
    let filterAdmin = "";
    isAdmin == -1
      ? (filterAdmin = "")
      : isAdmin == 1
      ? (filterAdmin = " IsAdmin=1")
      : (filterAdmin = " IsAdmin=0");
    let filterLike = "";
    like != ""
      ? (filterLike = ` name like '%${like}%' or username like '%${like}%'`)
      : (filterLike = "");

    if (filterAdmin !== "" && filterLike !== "") filterLike += " and";
    let where = "";
    isAdmin == -1 && like == "" ? (where = "") : (where = "where");
    return new Promise((resolve, reject) => {
      db.query(
        `select * from account ${where} ${filterLike}${filterAdmin} order by createdAt ${sort}`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
module.exports = accountModel;

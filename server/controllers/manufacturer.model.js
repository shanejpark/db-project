var dbConn = require("../db.config");

var Manufacturer = function (manufacturer) {
  this.name = manufacturer.name;
  this.price = manufacturer.price;
};

// get treatments
Manufacturer.getManufacturer = (drug_name, result) => {
  return dbConn.query(
    "select name, price from manufacturers join manufacturers_make_drugs using(manufacturer_id) join drugs using(drug_id) where drugs.medical_name like ?;",
    [drug_name],
    (err, res) => {
      if (err) {
        console.log("No treatments for condition");
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Manufacturer;

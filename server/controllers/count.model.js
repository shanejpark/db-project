var dbConn = require("../db.config");

var Count = function (count) {
  this.size = count.size;
};

// get number side effects for a manufacturer
Count.countSideEffectForManufacturer = (manufacturer_name, result) => {
  return dbConn.query(
    "CALL count_side_effect_for_manufacturer(?)",
    [manufacturer_name],
    (err, res) => {
      if (err) {
        console.log("Manufacturer not in database");
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// get count of patients
Count.countOfPatientsForManufacturer = (manufacturer_name, result) => {
  return dbConn.query(
    "CALL count_patients_for_manufacturer(?)",
    [manufacturer_name],
    (err, res) => {
      if (err) {
        console.log("Manufacturer not in database");
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Count;

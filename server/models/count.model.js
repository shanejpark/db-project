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

// How many manufacturers make fentanyl?
Count.getCountManufacturerFentanyl = (result) => {
  return dbConn.query(
    "select count(manufacturers_make_drugs.manufacturer_id) " +
      "from drugs " +
      "join manufacturers_make_drugs using (drug_id) " +
      "where drugs.medical_name = 'fentanyl' " +
      "group by drug_id",
    (err, res) => {
      if (err) {
        console.log("No manufactuers for condition");
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Average price of every non generic drug
Count.getAvgNonGenDrugPrice = (result) => {
  return dbConn.query(
    "select drugs.medical_name, drugs.common_name, drugs.formula, ROUND(AVG(manufacturers_make_drugs.price), 2) as avg_price " +
      "from drugs " +
      "left join manufacturers_make_drugs using (drug_id) " +
      "where drugs.generic = 0 " +
      "group by drug_id " +
      "order by avg_price desc",
    (err, res) => {
      if (err) {
        console.log("No manufactuers for condition");
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Average age, weight, and height of patients being treated for a fever
Count.averagePatient = (result) => {
  return dbConn.query(
    "select ROUND(AVG(patients.age), 0) as avg_age, ROUND(AVG(patients.weight), 0) as avg_weight, ROUND(AVG(patients.height), 0) as avg_height " +
      "from conditions " +
      "left join patients_take_drugs using (condition_id) " +
      "left join patients using (patient_id) " +
      "where conditions.name = 'fever' " +
      "group by condition_id",
    (err, res) => {
      if (err) {
        console.log("Error while fetching patients", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Count;

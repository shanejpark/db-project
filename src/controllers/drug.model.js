var dbConn = require("../../config/db.config");

var Drug = function (drug) {
  this.common_name = drug.common_name;
  this.medical_name = drug.medical_name;
  this.formula = drug.formula;
  this.generic = drug.generic;
};

// get all patients
Drug.getAllPatients = (result) => {
  dbConn.query("SELECT * FROM drugs", (err, res) => {
    if (err) {
      console.log("Error while fetching drugs", err);
      result(null, err);
    } else {
      console.log("Drugs fetched successfully");
      result(null, res);
    }
  });
};

// get employee by Name for Search Data by name
Drug.getDrugByName = (medical_name, result) => {
  dbConn.query(
    "SELECT * FROM drugs WHERE medical_name=?",
    [medical_name],
    (err, res) => {
      if (err) {
        console.log("Error while fetching drug by name", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// create new drug
Drug.createDrug = (drugReqData, result) => {
  dbConn.query("INSERT INTO drugs SET ?", drugReqData, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Drug created successfully");
      result(null, res);
    }
  });
};

// get treatments
Drug.getTreatments = (condition_name, result) => {
  dbConn.query("CALL get_treaments(?)", [condition_name], (err, res) => {
    if (err) {
      console.log("No treatments for condition");
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Drug;

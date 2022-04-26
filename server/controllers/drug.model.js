var dbConn = require("../db.config");

var Drug = function (drug) {
  this.common_name = drug.common_name;
  this.medical_name = drug.medical_name;
  this.formula = drug.formula;
  this.generic = drug.generic;
};

// get all drugs
Drug.getAllPatients = (result) => {
  return dbConn.query("SELECT * FROM drugs", (err, res) => {
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
  return dbConn.query(
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
  return dbConn.query("INSERT INTO drugs SET ?", drugReqData, (err, res) => {
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
  return dbConn.query("CALL get_treaments(?)", [condition_name], (err, res) => {
    if (err) {
      console.log("No treatments for condition");
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// get all drugs
Drug.getDrugsWithSideEffects = (result) => {
  return dbConn.query("select drugs.medical_name as drug, drugs.common_name, side_effects.name as side_effect " +
  "from drugs " +
  "left join drugs_have_side_effects using (drug_id) " +
  "left join side_effects using (side_effects_id)", (err, res) => {
    if (err) {
      console.log("Error while fetching drugs", err);
      result(null, err);
    } else {
      console.log("Drugs fetched successfully");
      result(null, res);
    }
  });
};

// Drugs that have caused digestive issues for patients
Drug.getDrugsWithDigestiveIssue = (result) => {
  return dbConn.query("select drugs.medical_name as drug, patients.name as patient, side_effects.name as side_effect, patients_have_side_effects.severity " +
  "from patients_have_side_effects " +
  "join side_effects using (side_effects_id) " +
  "join drugs using (drug_id) " +
  "join patients using (patient_id) " +
  "where side_effects.classification = 'digestive'", (err, res) => {
    if (err) {
      console.log("Error while fetching drugs", err);
      result(null, err);
    } else {
      console.log("Drugs fetched successfully");
      result(null, res);
    }
  });
};


// Drugs which have no reported side effects for patients
Drug.getDrugsNoSideEffects = (result) => {
  return dbConn.query("select drugs.medical_name, drugs.common_name, drugs.formula " +
  "from drugs " +
  "where drug_id not in ( " +
  "select drug_id " +
  "from patients_have_side_effects)", (err, res) => {
    if (err) {
      console.log("Error while fetching drugs", err);
      result(null, err);
    } else {
      console.log("Drugs fetched successfully");
      result(null, res);
    }
  });
};

// Drugs which caused severe side effects for patients
Drug.getDrugsSevereSideEffects = (result) => {
  return dbConn.query("select drugs.medical_name, drugs.common_name, side_effects.name as side_effect " +
  "from patients_have_side_effects " +
  "join drugs using (drug_id) " +
  "join side_effects using (side_effects_id) " + 
  "where patients_have_side_effects.severity = 'SEVERE'", (err, res) => {
    if (err) {
      console.log("Error while fetching drugs", err);
      result(null, err);
    } else {
      console.log("Drugs fetched successfully");
      result(null, res);
    }
  });
};


// Drugs prescribed in 2022
Drug.getDrugsFrom2022 = (result) => {
  return dbConn.query("select drugs.medical_name, patients_take_drugs.dosage " +
  "from patients_take_drugs " +
  "join drugs using (drug_id) " +
  "where EXTRACT(YEAR from patients_take_drugs.prescribed) = 2022", (err, res) => {
    if (err) {
      console.log("Error while fetching drugs", err);
      result(null, err);
    } else {
      console.log("Drugs fetched successfully");
      result(null, res);
    }
  });
};



module.exports = Drug;

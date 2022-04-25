var dbConn = require("../db.config");

var Patient = function (patient) {
  this.name = patient.name;
  this.age = patient.age;
  this.ethnicity = patient.ethnicity;
  this.country = patient.country;
  this.state = patient.state;
  this.city = patient.city;
  this.sex = patient.sex;
  this.weight = patient.weight;
  this.height = patient.height;
};

// get all patients
Patient.getAllPatients = (result) => {
  return dbConn.query("SELECT * FROM patients", (err, res) => {
    if (err) {
      console.log("Error while fetching patients", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// get employee by Name for Search Data by name
Patient.getPatientByName = (name, result) => {
  return dbConn.query(
    "SELECT * FROM patients WHERE name=?",
    name,
    (err, res) => {
      if (err) {
        console.log("Error while fetching employee by id", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// create new patient
Patient.createPatient = (patientReqData, result) => {
  return dbConn.query(
    "INSERT INTO patients SET ?",
    patientReqData,
    (err, res) => {
      if (err) {
        console.log("Error while inserting data");
        result(null, err);
      } else {
        console.log("Patient created successfully");
        result(null, res);
      }
    }
  );
};

Patient.createSideEffectForPatient = (
  patient_name,
  drug_name,
  side_effect_name,
  result
) => {
  return dbConn.query(
    "CALL create_side_effect_for_patient(?,?,?)",
    [patient_name, drug_name, side_effect_name],
    (err, res) => {
      if (err) {
        console.log("Error while creating relationship", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// delete patient
Patient.deletePatient = (id, result) => {
  return dbConn.query("CALL remove_patient(?)", [id], (err, res) => {
    if (err) {
      console.log("Error while deleting the employee");
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Patient;

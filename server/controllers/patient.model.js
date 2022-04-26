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
  severity,
  result
) => {
  return dbConn.query(
    "CALL create_side_effect_for_patient(?,?,?,?)",
    [patient_name, drug_name, side_effect_name, severity],
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

// Which patient has the most side-effects?
Patient.mostSideEffectsPatient = (result) => {
  return dbConn.query("select patients.patient_id, patients.name, " +
  "count(patients_have_side_effects.side_effects_id) as num_side_effects " +
  "from patients left join patients_have_side_effects using (patient_id) " +
  "group by patient_id order by num_side_effects desc limit 1", (err, res) => {
    if (err) {
      console.log("Error while fetching patients", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};


// How many patients experience side effects from every drug?
Patient.patientsAlwaysSideEffects = (result) => {
  return dbConn.query("select drugs.medical_name as drug, drugs.common_name, count(patients_have_side_effects.patient_id) as num_patients " +
  "from drugs " +
  "left join patients_have_side_effects using (drug_id) " +
  "group by drugs.medical_name, drugs.common_name " +
  "order by num_patients desc", (err, res) => {
    if (err) {
      console.log("Error while fetching patients", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};


// All patients who are at risk of developing jaundice as a side effect (i.e. they dont already have jaundice as a side effect, but a drug they take may cause it)
Patient.patientsAtRiskOfJaundice = (result) => {
  return dbConn.query("select patients.name, drugs.medical_name as prescribed " +
  "from patients_take_drugs " +
  "left join patients using (patient_id) " +
  "left join drugs using (drug_id) " +
  "left join drugs_have_side_effects using (drug_id) " +
  "left join side_effects using (side_effects_id) " +
  "where side_effects.name = 'jaundice' and patient_id not in ( " +
  "select patient_id " +
  "from patients_have_side_effects " +
  "join side_effects using (side_effects_id) " +
  "where side_effects.name = 'jaundice')", (err, res) => {
    if (err) {
      console.log("Error while fetching patients", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// A patient, the conditions they have, the drugs they are taking, and the drug's side effects they experienced
Patient.patientConditionDrugSideEffect = (result) => {
  return dbConn.query("select patients.name as patient, patients.age, conditions.name as `condition`, conditions.cause, drugs.medical_name as drug, patients_take_drugs.dosage, side_effects.name as side_effect " +
  "from patients_take_drugs " +
  "left join patients using (patient_id) " +
  "left join conditions using (condition_id) " +
  "left join drugs using (drug_id) " +
  "left join patients_have_side_effects using (patient_id, drug_id) " +
  "left join side_effects using (side_effects_id)", (err, res) => {
    if (err) {
      console.log("Error while fetching patients", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Patient;

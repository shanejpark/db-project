const PatientModel = require("../models/patient.model");
const DrugModel = require("../models/drug.model");
const SideEffectModel = require("../models/sideeffect.model");
const CountModel = require("../models/count.model");
const ManufacturerModel = require("../models/manufacturer.model");

// get all patient list
exports.getPatientList = (req, res) => {
  //console.log('here all employees list');
  PatientModel.getAllPatients((err, patients) => {
    if (err) return res.send(err);

    res.send(patients);
  });
};

// get patient by Name for earch by Name
exports.getPatientByName = (req, res) => {
  //console.log('get emp by id');
  PatientModel.getPatientByName(req.params.first_name, (err, patients) => {
    if (err) return res.send(err);
    console.log("single patient data", patients);
    res.send(patients);
  });
};

// create new patient
exports.createNewPatient = (req, res) => {
  const patientReqData = new PatientModel(req.body);
  console.log("patientReqData", patientReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    PatientModel.createPatient(patientReqData, (err, patient) => {
      if (err) return res.send(err);
      res.json({
        status: true,
        message: "Patient Created Successfully",
        data: patient.insertId,
      });
    });
  }
};

// delete patient
exports.deletePatient = (req, res) => {
  PatientModel.deletePatient(req.params.id, (err, patient) => {
    if (err) return res.send(err);
    res.json({ success: true, message: "Patient deleted successully!" });
  });
};

// get table of side effects patient has experienced with a drug
exports.createSideEffectForPatient = (req, res) => {
  PatientModel.createSideEffectForPatient(
    req.params.patient_name,
    req.params.drug_name,
    req.params.sideeffect_name,
    req.params.severity,
    (err, patient) => {
      if (err) return res.send(err);
      res.json({ success: true, message: "Side effect created successully!" });
    }
  );
};

// get table of side effects patient has experienced with a drug
exports.getSideEffects = (req, res) => {
  SideEffectModel.getSideEffects(
    req.params.patient_name,
    req.params.drug_name,
    (err, sideEffect) => {
      if (err) return res.send(err);
      console.log("side effects found", sideEffect);
      res.send(sideEffect[0]);
    }
  );
};

// get all drug list
exports.getDrugList = (req, res) => {
  //console.log('here all employees list');
  DrugModel.getAllPatients((err, patients) => {
    console.log("We are here");
    if (err) return res.send(err);
    console.log("Patients", patients);
    res.send(patients);
  });
};

// get drug by Name
exports.getDrugByName = (req, res) => {
  //console.log('get emp by id');
  DrugModel.getDrugByName(req.params.name, (err, drug) => {
    if (err) return res.send(err);
    console.log("single drug data", drug);
    res.send(drug);
  });
};

// create new drug
exports.createNewDrug = (req, res) => {
  const drugReqData = new DrugModel(req.body);
  console.log("drugReqData", drugReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .setStatus(400)
      .send({ success: false, message: "Please fill all fields" });
  } else {
    DrugModel.createDrug(drugReqData, (err, drug) => {
      if (err) return res.send(err);
      res.json({
        status: true,
        message: "Drug Created Successfully",
        data: drug.insertId,
      });
    });
  }
};

// get table of drugs that treat given condition
exports.getTreatments = (req, res) => {
  DrugModel.getTreatments(req.params.condition_name, (err, drug) => {
    if (err) return res.send(err);
    console.log("always side effects", err, drug);
    res.send(drug[0]);
  });
};

// get count of side effects a manufactorer has
exports.countSideEffectForManufacturer = (req, res) => {
  CountModel.countSideEffectForManufacturer(
    req.params.manufacturer_name,
    (err, count) => {
      if (err) return res.send(err);
      console.log("count side effect for manufacturer", count);
      res.send(count[0]);
    }
  );
};

// get count of patients
exports.countPatientsForManufacturer = (req, res) => {
  CountModel.patientsForManufacturer(
    req.params.manufacturer_name,
    (err, count) => {
      if (err) return res.send(err);
      console.log("count patients for manufacturer", count);
      res.send(count[0]);
    }
  );
};

// get count of patients
exports.getManufacturer = (req, res) => {
  return ManufacturerModel.getManufacturer(
    req.params.drug_name,
    (err, manufacturer) => {
      if (err) return res.send(err);
      console.log("manufacturer", manufacturer);
      res.send(manufacturer);
    }
  );
};

// most side effects patient
exports.mostSideEffectsPatient = (req, res) => {
  return PatientModel.mostSideEffectsPatient((err, patient) => {
    if (err) return res.send(err);
    res.send(patient);
  });
};

// patients who always exprience side effects
exports.patientsAlwaysSideEffects = (req, res) => {
  return PatientModel.patientsAlwaysSideEffects((err, patient) => {
    if (err) return res.send(err);
    res.send(patient);
  });
};

// side effects of every drug
exports.getDrugsWithSideEffects = (req, res) => {
  return DrugModel.getDrugsWithSideEffects((err, drug) => {
    if (err) return res.send(err);
    console.log("always side effects", drug);
    res.send(drug);
  });
};

// drugs with digestive issues for patients
exports.getDrugsWithDigestiveIssue = (req, res) => {
  return DrugModel.getDrugsWithDigestiveIssue((err, drug) => {
    if (err) return res.send(err);
    res.send(drug);
  });
};

// drugs with no side effects
exports.getDrugsNoSideEffects = (req, res) => {
  return DrugModel.getDrugsNoSideEffects((err, drug) => {
    if (err) return res.send(err);
    res.send(drug);
  });
};

// drugs with severe side effects
exports.getDrugsSevereSideEffects = (req, res) => {
  return DrugModel.getDrugsSevereSideEffects((err, drug) => {
    if (err) return res.send(err);
    res.send(drug);
  });
};

// drugs with severe side effects
exports.getCountManufacturerFentanyl = (req, res) => {
  return CountModel.getCountManufacturerFentanyl((err, count) => {
    if (err) return res.send(err);
    res.send(count);
  });
};

// drugs perscribed in 2022
exports.getDrugsFrom2022 = (req, res) => {
  return DrugModel.getDrugsFrom2022((err, drug) => {
    if (err) return res.send(err);
    res.send(drug);
  });
};

// average price of drugs, non-generic
exports.getAvgNonGenDrugPrice = (req, res) => {
  return CountModel.getAvgNonGenDrugPrice((err, count) => {
    if (err) return res.send(err);
    res.send(count);
  });
};

// all patients at risk of jaundice
exports.patientsAtRiskOfJaundice = (req, res) => {
  return PatientModel.patientsAtRiskOfJaundice((err, patient) => {
    if (err) return res.send(err);
    res.send(patient);
  });
};

// average patient
exports.averagePatient = (req, res) => {
  return CountModel.averagePatient((err, count) => {
    if (err) return res.send(err);
    res.send(count);
  });
};

// all info on patients, drugs taken, conditions, and side effects
exports.patientConditionDrugSideEffect = (req, res) => {
  return PatientModel.patientConditionDrugSideEffect((err, patient) => {
    if (err) return res.send(err);
    res.send(patient);
  });
};

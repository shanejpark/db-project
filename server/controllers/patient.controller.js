const PatientModel = require("./patient.model");
const DrugModel = require("./drug.model");
const SideEffectModel = require("./sideeffect.model");
const CountModel = require("./count.model");
const ManufacturerModel = require("./manufacturer.model");

// get all patient list
exports.getPatientList = (req, res) => {
  //console.log('here all employees list');
  PatientModel.getAllPatients((err, patients) => {
    console.log("We are here");
    if (err) res.send(err);
    console.log("Patients", patients);
    res.send(patients);
  });
};

// get patient by Name for earch by Name
exports.getPatientByName = (req, res) => {
  //console.log('get emp by id');
  PatientModel.getPatientByName(req.params.first_name, (err, patients) => {
    if (err) res.send(err);
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
      if (err) res.send(err);
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
    if (err) res.send(err);
    res.json({ success: true, message: "Patient deleted successully!" });
  });
};

// get table of side effects patient has experienced with a drug
exports.createSideEffectForPatient = (req, res) => {
  PatientModel.createSideEffectForPatient(
    req.params.patient_name,
    req.params.drug_name,
    req.params.sideeffect_name,
    (err, patient) => {
      if (err) res.send(err);
      res.json({ success: true, message: "Side effect created successully!" });
      res.send(patient);
    }
  );
};

// get table of side effects patient has experienced with a drug
exports.getSideEffects = (req, res) => {
  SideEffectModel.getSideEffects(
    req.params.patient_name,
    req.params.drug_name,
    (err, patient) => {
      if (err) res.send(err);
      res.json({ success: true, message: "Side effects found successully!" });
      res.send(patient);
    }
  );
};

// get all drug list
exports.getDrugList = (req, res) => {
  //console.log('here all employees list');
  DrugModel.getAllPatients((err, patients) => {
    console.log("We are here");
    if (err) res.send(err);
    console.log("Patients", patients);
    res.send(patients);
  });
};

// get drug by Name
exports.getDrugByName = (req, res) => {
  //console.log('get emp by id');
  DrugModel.getDrugByName(req.params.name, (err, drug) => {
    if (err) res.send(err);
    console.log("single drug data", drug);
    res.send(drug);
  });
};

// create new patient
exports.createNewDrug = (req, res) => {
  const drugReqData = new DrugModel(req.body);
  console.log("drugReqData", drugReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    DrugModel.createDrug(drugReqData, (err, drug) => {
      if (err) res.send(err);
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
    if (err) res.send(err);
    res.send(drug);
  });
};

// get count of side effects a manufactorer has
exports.countSideEffectForManufacturer = (req, res) => {
  CountModel.countSideEffectForManufacturer(
    req.params.manufacturer_name,
    (err, count) => {
      if (err) res.send(err);
      res.send(count);
    }
  );
};

// get count of patients
exports.countPatientsForManufacturer = (req, res) => {
  CountModel.patientsForManufacturer(
    req.params.manufacturer_name,
    (err, count) => {
      if (err) res.send(err);
      res.json({ success: true, message: "Patients counted successully!" });
      res.send(count);
    }
  );
};

// get count of patients
exports.getManufacturer = (req, res) => {
  ManufacturerModel.getManufacturer(
    req.params.drug_name,
    (err, manufacturer) => {
      if (err) res.send(err);
      res.json({ success: true, message: "Patients counted successully!" });
      res.send(manufacturer);
    }
  );
};

const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patient.controller");

// get all patients
router.get("/patient", patientController.getPatientList);

// get patient by name
router.get("/patient/:first_name", patientController.getPatientByName);

// get side effects from a drug the patient has used
router.get(
  "/side_effect/:patient_name/:drug_name",
  patientController.getSideEffects
);

// number of patients a manufacturer is supplying drugs for
router.get(
  "/manufacturer/:manufacturer_name",
  patientController.countPatientsForManufacturer
);

// get all drugs
router.get("/drugs", patientController.getDrugList);

// get drug by name
router.get("/drugs/:first_name", patientController.getDrugByName);

// get drugs for a treatment
router.get("/condition/:condition_name", patientController.getTreatments);

// get side effects from a drug the patient has used
router.get(
  "/manufacturer/:manufacturer_name",
  patientController.countSideEffectForManufacturer
);

// get the manufacturers for a drug
router.get("/drugs/manufacturer/:drug_name", patientController.getManufacturer);

// create new side effect
router.get("/side_effect/create", patientController.createSideEffectForPatient);

// create new patient
router.post("/patient", patientController.createNewPatient);

// create new drug
router.post("/drugs", patientController.createNewDrug);

// delete patient
router.delete("/patient/delete/:id", patientController.deletePatient);

module.exports = router;

const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patient.controller");

// get all patients
router.get("/", patientController.getPatientList);

// get patient by name
router.get("/searchRecord/:first_name", patientController.getPatientByName);

// create new patient
router.post("/", patientController.createNewPatient);

// delete patient
router.delete("/:id", patientController.deletePatient);

// get side effects from a drug the patient has used
router.get(
 "/searchRecord/:patient_name/:drug_name",
 patientController.getSideEffects
);

// number of patients a manufacturer is supplying drugs for
router.get(
 "/searchRecord/:manufacturer_name",
 patientController.countPatientsForManufacturer
);

// get all drugs
router.get("/", patientController.getDrugList);

// get drug by name
router.get("/searchRecord/:first_name", patientController.getDrugByName);

// create new drug
router.post("/", patientController.createNewDrug);

// get side effects from a drug the patient has used
router.get("/searchRecord/:condition_name", patientController.getTreatments);

// get side effects from a drug the patient has used
router.get("/searchRecord/:manufacturer_name", patientController.getTreatments);

// get the manufacturers for a drug
router.get("/searchRecord/:drug_name", patientController.getManufacturer);

// create new side effect
router.get("/", patientController.createSideEffectForPatient);

module.exports = router;

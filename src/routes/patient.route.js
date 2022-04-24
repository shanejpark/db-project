const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patient.controller");

// get all employees
router.get("/", patientController.getPatientList);

// get patient by name
router.get("/searchRecord/:first_name", patientController.getEmployeeByName);

// create new employee
router.post("/", patientController.createNewPatient);

// delete employee
router.delete("/:id", patientController.deleteEmployee);

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

// get all employees
router.get("/", patientController.getDrugList);

// get patient by name
router.get("/searchRecord/:first_name", patientController.getDrugByName);

// create new employee
router.post("/", patientController.createNewDrug);

// delete employee
router.delete("/:id", patientController.deleteDrug);

// get side effects from a drug the patient has used
router.get("/searchRecord/:condition_name", patientController.getTreatments);

// get side effects from a drug the patient has used
router.get("/searchRecord/:manufacturer_name", patientController.getTreatments);

// get the manufacturers for a drug
router.get("/searchRecord/:drug_name", patientController.getManufactuer);

module.exports = router;

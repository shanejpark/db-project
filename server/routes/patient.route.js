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
  "/manufacturer/patient/:manufacturer_name",
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
  "/manufacturer/side_effect/:manufacturer_name",
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

// most side effects patient
router.get("/info/mostSideEffects", patientController.mostSideEffectsPatient);

// patients who always exprience side effects
router.get(
  "/info/patientsAlwaysSide",
  patientController.patientsAlwaysSideEffects
);

// all drugs with side effects
router.get("/info/allSideEffects", patientController.getDrugsWithSideEffects);

// drugs with digestive issues
router.get(
  "/info/digestiveSideEffects",
  patientController.getDrugsWithDigestiveIssue
);

// drugs with no side effects
router.get("/info/noSideEffects", patientController.getDrugsNoSideEffects);

// drugs with severe side effects
router.get(
  "/info/severeSideEffects",
  patientController.getDrugsSevereSideEffects
);

// drugs perscibed in 2022
router.get("/info/drugsFrom2022", patientController.getDrugsFrom2022);

// average price non-generic drugs
router.get("/info/averageNonGenPrice", patientController.getAvgNonGenDrugPrice);

// all patients at risk of jaundice
router.get(
  "/info/patientsJaundiceRisk",
  patientController.patientsAtRiskOfJaundice
);

// average patient statistics
router.get("/info/averagePatient", patientController.averagePatient);

// all patient info: drugs, conditions, side effects
router.get(
  "/info/allPatientInfo",
  patientController.patientConditionDrugSideEffect
);

module.exports = router;

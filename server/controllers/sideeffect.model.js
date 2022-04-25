var dbConn = require("../db.config");

var SideEffect = function (sideeffect) {
  this.name = sideeffect.name;
};

// get side effects
SideEffect.getSideEffects = (patient_name, drug_name, result) => {
  return dbConn.query(
    "CALL patient_side_effects(?,?)",
    [patient_name, drug_name],
    (err, res) => {
      if (err) {
        console.log("No side effects for patient or drug");
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = SideEffect;

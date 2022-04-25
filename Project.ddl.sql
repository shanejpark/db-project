
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

DROP TABLE IF EXISTS `mydb`.`drugs_treat_conditions` ;
DROP TABLE IF EXISTS `mydb`.`drugs_have_side_effects` ;
DROP TABLE IF EXISTS `mydb`.`patients_take_drugs` ;
DROP TABLE IF EXISTS `mydb`.`manufacturers_make_drugs` ;
DROP TABLE IF EXISTS `mydb`.`patients_have_side_effects` ;
DROP TABLE IF EXISTS `mydb`.`side_effects` ;
DROP TABLE IF EXISTS `mydb`.`conditions` ;
DROP TABLE IF EXISTS `mydb`.`patients` ;
DROP TABLE IF EXISTS `mydb`.`manufacturers` ;
DROP TABLE IF EXISTS `mydb`.`drugs` ;
-- -----------------------------------------------------
-- Table `mydb`.`drugs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`drugs` ;

CREATE TABLE IF NOT EXISTS `mydb`.`drugs` (
  `drug_id` INT PRIMARY KEY AUTO_INCREMENT,
  `common_name` VARCHAR(45) NULL,
  `medical_name` VARCHAR(45) NOT NULL,
  `formula` VARCHAR(45) NOT NULL,
  `generic` TINYINT NOT NULL);
  
  INSERT INTO drugs VALUES
	(1, 'adderall', 'amphetamine', 'C9H13N', 0),
    (2, 'amoxil', 'amoxicillin', 'C16H19N3O5S', 0),
    (3, 'clindamycin', 'clindamycin', 'C18H33ClN2O5S', 1),
    (4, 'amrix', 'cyclobenzaprine', 'C20H21NEHCl', 0),
    (5, null, 'fentanyl', 'C22H28N2O', 1),
    (6, 'advil', 'ibuprofen', 'C13H18O2', 0),
    (7, null, 'melatonin', 'C13H16N2O2', 1),
    (8, 'xanax', 'alprazolam', 'C13H16N2O2', 0);


-- -----------------------------------------------------
-- Table `mydb`.`manufacturers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`manufacturers` ;

CREATE TABLE IF NOT EXISTS `mydb`.`manufacturers` (
  `manufacturer_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `state` CHAR(2) NULL,
  `city` VARCHAR(45) NOT NULL);
  
INSERT INTO manufacturers VALUES
	(1, 'Johnson and Johnson', 'US', 'NJ', 'New Brunsick'),
    (2, 'Roche', 'Switzerland', null, 'Basel'),
    (3, 'Pfizer', 'US', 'NY', 'New York');


-- -----------------------------------------------------
-- Table `mydb`.`patients`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`patients` ;

CREATE TABLE IF NOT EXISTS `mydb`.`patients` (
  `patient_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `age` INT NULL,
  `ethnicity` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `sex` TINYINT NOT NULL,
  `weight` INT NOT NULL,
  `height` INT NOT NULL);
  
  INSERT INTO patients VALUES
	(1, 'john', 33, 'white', 'US', 'MA', null, 0, 181, 72),
    (2, 'anne', 21, 'asian', null, null, null, 1, 123, 61),
    (3, 'bill', 64, 'white', 'US', 'NY', 'New York', 0, 236, 69),
    (4, 'kate', 40, 'african american', 'US', null, null, 0, 161, 66),
    (5, 'emily', 38, 'asian', 'Singapore', null, 'Singapore', 1, 144, 62),
    (6, 'carly', 33, 'african american', 'US', 'RI', 'Providence', 1, 187, 63),
    (7, 'joe', 59, 'native american', 'US', null, null, 0, 192, 63),
    (8, 'jason', 26, null, 'US', 'MA', 'Boston', 0, 191, 74),
    (9, 'sydney', 52, null, 'US', null, null, 1, 109, 60),
    (10, 'john', 40, 'asian', 'US', 'NH', 'Portsmouth', 0, 150, 68);


-- -----------------------------------------------------
-- Table `mydb`.`conditions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`conditions` ;

CREATE TABLE IF NOT EXISTS `mydb`.`conditions` (
  `condition_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `cause` VARCHAR(45) NULL);


INSERT INTO conditions VALUES 
	(1, 'anxiety', 'panic disorder'),
    (2, 'pain', 'fracture'),
    (3, 'inability to focus', 'adhd'),
    (4, 'shortness of breath', 'pneumonia'),
    (5, 'coughing', 'bronchitis'),
    (6, 'acne', null),
    (7, 'chronic pain', 'cancer'),
    (8, 'fever', null),
    (9, 'joint pain', 'arthritis'),
    (10, 'inability to sleep', 'insomnia'),
    (11, 'muscle pain', null);
    
    


-- -----------------------------------------------------
-- Table `mydb`.`side_effects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`side_effects` ;

CREATE TABLE IF NOT EXISTS `mydb`.`side_effects` (
  `side_effects_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `classification` VARCHAR(45) NOT NULL);

INSERT INTO side_effects VALUES
	(1, 'heart problems', 'cardiovascular'),
    (2, 'seizure', 'mental'),
    (3, 'stomach pain', 'digestive'),
    (4, 'nausea', 'digestive'),
    (5, 'diarrhea', 'digestive'),
    (6, 'rash', 'topical'),
    (7, 'respiratory arrest', 'respitory'),
    (8, 'dizziness', 'mental'),
    (9, 'hallucinations', 'mental'),
    (10, 'jaundice', 'liver');



-- -----------------------------------------------------
-- Table `mydb`.`patients_have_side_effects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`patients_have_side_effects` ;

CREATE TABLE IF NOT EXISTS `mydb`.`patients_have_side_effects` (
  `patient_id` INT NOT NULL,
  `drug_id` INT NOT NULL,
  `side_effects_id` INT NOT NULL,
  `severity` ENUM("MILD", "MODERATE", "SEVERE") NOT NULL,
  PRIMARY KEY (`drug_id`, `side_effects_id`, `patient_id`),
  INDEX `fk_drugs_has_side_effects_side_effects1_idx` (`side_effects_id` ASC) VISIBLE,
  INDEX `fk_drugs_has_side_effects_drugs_idx` (`drug_id` ASC) VISIBLE,
  INDEX `fk_drugs_have_side_effects_patients1_idx` (`patient_id` ASC) VISIBLE,
  CONSTRAINT `fk_drugs_has_side_effects_drugs`
    FOREIGN KEY (`drug_id`)
    REFERENCES `mydb`.`drugs` (`drug_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_drugs_has_side_effects_side_effects1`
    FOREIGN KEY (`side_effects_id`)
    REFERENCES `mydb`.`side_effects` (`side_effects_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_drugs_have_side_effects_patients1`
    FOREIGN KEY (`patient_id`)
    REFERENCES `mydb`.`patients` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

    
INSERT INTO patients_have_side_effects VALUES
	(1, 1, 1, 'MILD'),
    (1, 1, 2, 'MILD'),
    (2, 6, 6, 'MODERATE'),
    (3, 2, 3, 'MILD'),
    (3, 2, 4, 'MILD'),
    (3, 2, 5, 'MILD'),
    (3, 4, 9, 'MODERATE'),
    (5, 6, 4, 'MODERATE'),
    (8, 6, 4, 'MILD'),
    (8, 6, 3, 'MILD'),
    (8, 8, 2, 'SEVERE');



-- -----------------------------------------------------
-- Table `mydb`.`manufacturer_makes_drugs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`manufacturers_make_drugs` ;

CREATE TABLE IF NOT EXISTS `mydb`.`manufacturers_make_drugs` (
  `manufacturer_id` INT NOT NULL,
  `drug_id` INT NOT NULL,
  `price` INT NOT NULL,
  PRIMARY KEY (`manufacturer_id`, `drug_id`),
  INDEX `fk_manufacturer_has_drugs_drugs1_idx` (`drug_id` ASC) VISIBLE,
  INDEX `fk_manufacturer_has_drugs_manufacturer1_idx` (`manufacturer_id` ASC) VISIBLE,
  CONSTRAINT `fk_manufacturer_has_drugs_manufacturer1`
    FOREIGN KEY (`manufacturer_id`)
    REFERENCES `mydb`.`manufacturers` (`manufacturer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_manufacturer_has_drugs_drugs1`
    FOREIGN KEY (`drug_id`)
    REFERENCES `mydb`.`drugs` (`drug_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO manufacturers_make_drugs VALUES
	(1, 2, 102),
    (1, 3, 141),
    (1, 5, 237),
    (1, 7, 66),
    (1, 8, 343),
    (2, 1, 608),
    (2, 2, 104),
    (2, 4, 585),
    (2, 8, 339),
    (3, 2, 100),
    (3, 6, 94);

-- -----------------------------------------------------
-- Table `mydb`.`patients_take_drugs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`patients_take_drugs` ;

CREATE TABLE IF NOT EXISTS `mydb`.`patients_take_drugs` (
  `patient_id` INT NOT NULL,
  `condition_id` INT NOT NULL,
  `drug_id` INT NOT NULL,
  `dosage` VARCHAR(45) NOT NULL,
  `prescribed` DATE NOT NULL,
  PRIMARY KEY (`patient_id`, `condition_id`, `drug_id`),
  INDEX `fk_patients_has_conditions_conditions1_idx` (`condition_id` ASC) VISIBLE,
  INDEX `fk_patients_has_conditions_patients1_idx` (`patient_id` ASC) VISIBLE,
  INDEX `fk_patients_have_conditions_drugs1_idx` (`drug_id` ASC) VISIBLE,
  CONSTRAINT `fk_patients_has_conditions_patients1`
    FOREIGN KEY (`patient_id`)
    REFERENCES `mydb`.`patients` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_patients_has_conditions_conditions1`
    FOREIGN KEY (`condition_id`)
    REFERENCES `mydb`.`conditions` (`condition_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_patients_have_conditions_drugs1`
    FOREIGN KEY (`drug_id`)
    REFERENCES `mydb`.`drugs` (`drug_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
  

INSERT INTO patients_take_drugs VALUES
	(1, 3, 1, '10mg', '2019-02-28'),
    (2, 8, 6, '5mg', '2022-04-01'),
    (2, 10, 7, '20mg', '2020-11-17'),
    (3, 4, 2, '100mg', '2022-08-04'),
    (3, 11, 4, '1mg', '2019-02-26'),
    (5, 8, 6, '10mg', '2021-12-04'),
    (6, 8, 6, '10mg', '2019-02-28'),
    (7, 5, 2, '220mg', '2021-09-15'),
    (8, 4, 2, '140mg', '2020-07-07'),
    (8, 9, 6, '2mg', '2021-01-30'),
    (8, 1, 8, '10mg', '2015-05-11'),
    (10, 6, 3, '.5mg', '2022-01-30');
    
  


-- -----------------------------------------------------
-- Table `mydb`.`drugs_treat_conditions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`drugs_treat_conditions` ;

CREATE TABLE IF NOT EXISTS `mydb`.`drugs_treat_conditions` (
  `drug_id` INT NOT NULL,
  `condition_id` INT NOT NULL,
  PRIMARY KEY (`drug_id`, `condition_id`),
  INDEX `fk_drugs_has_conditions_conditions1_idx` (`condition_id` ASC) VISIBLE,
  INDEX `fk_drugs_has_conditions_drugs1_idx` (`drug_id` ASC) VISIBLE,
  CONSTRAINT `fk_drugs_has_conditions_drugs1`
    FOREIGN KEY (`drug_id`)
    REFERENCES `mydb`.`drugs` (`drug_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_drugs_has_conditions_conditions1`
    FOREIGN KEY (`condition_id`)
    REFERENCES `mydb`.`conditions` (`condition_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO drugs_treat_conditions VALUES
	(1, 3),
    (2, 4),
    (2, 5),
    (3, 6),
    (4, 11),
    (5, 7),
    (6, 9),
    (6, 8),
    (7, 10),
    (8, 1);
    


-- -----------------------------------------------------
-- Table `mydb`.`drugs_have_side_effects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`drugs_have_side_effects` ;

CREATE TABLE IF NOT EXISTS `mydb`.`drugs_have_side_effects` (
  `drug_id` INT NOT NULL,
  `side_effects_id` INT NOT NULL,
  PRIMARY KEY (`side_effects_id`, `drug_id`),
  INDEX `fk_side_effects_has_drugs_drugs1_idx` (`drug_id` ASC) VISIBLE,
  INDEX `fk_side_effects_has_drugs_side_effects1_idx` (`side_effects_id` ASC) VISIBLE,
  CONSTRAINT `fk_side_effects_has_drugs_side_effects1`
    FOREIGN KEY (`side_effects_id`)
    REFERENCES `mydb`.`side_effects` (`side_effects_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_side_effects_has_drugs_drugs1`
    FOREIGN KEY (`drug_id`)
    REFERENCES `mydb`.`drugs` (`drug_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ;
    
INSERT INTO drugs_have_side_effects VALUES
	(1, 1),
    (1, 2),
    (2, 3),
    (2, 4),
    (2, 5),
    (2, 6),
    (3, 3),
    (3, 4),
    (4, 1),
    (4, 9),
    (4, 4),
    (4, 5),
    (4, 8),
    (5, 3),
    (5, 4),
    (5, 7),
    (5, 8),
    (6, 6),
    (6, 4),
    (6, 3),
    (6, 10),
    (7, 4),
    (7, 5),
    (7, 8),
    (8, 2),
    (8, 10);
    


-- ------------------------------------------------------------------
-- Stored procedures:
-- ------------------------------------------------------------------


-- patient side effects for drug
drop procedure if exists patient_side_effects;

delimiter //
create procedure patient_side_effects
(
	in patient_name_param varchar(255),
    in drug_name_param varchar(255)
)
begin
	-- variable declarations
    declare patient_id_var int;
    declare drug_id_var int;
    
	declare message varchar(255); -- The error message
    declare side_effect_var varchar(255); -- The name of a side effect involved with the patient

	select patient_id 
	into patient_id_var 
	from patients
	where name like patient_name_param
    limit 1;
    
    select drug_id 
	into drug_id_var 
	from drugs
	where medical_name like drug_name_param;
    
    select side_effects.name
    into side_effect_var
    from side_effects join patients_have_side_effects using(side_effects_id)
		join patients using(patient_id)
        join drugs using(drug_id)
	where drugs.drug_id like drug_id_var and patients.patient_id like patient_id_var
    limit 1;
    
    if(side_effect_var is null) then
		select concat(patient_name_param, ' had no side effects with drug ', drug_name_param) into message;
		signal sqlstate 'HY000' set message_text = message;
	end if;
    
    
    -- No exceptions thrown, so insert the prescription record
	select side_effects.name
    from side_effects join patients_have_side_effects using(side_effects_id)
		join patients using(patient_id)
        join drugs using(drug_id)
	where drugs.drug_id like drug_id_var and patients.patient_id like patient_id_var;
    
end //
delimiter ;


-- See manufactor for drug
drop procedure if exists get_manufacturer;

delimiter //
create procedure get_manufacturer
(
    in drug_name_param varchar(255)
)
begin
	-- variable declarations
    declare drug_id_var int;
    
	declare message varchar(255); -- The error message

    select drug_id 
	into drug_id_var 
	from drugs
	where medical_name like drug_name_param;
    
    if(drug_id_var is null) then
		select concat(drug_name_param, ' is not in this database') into message;
		signal sqlstate 'HY000' set message_text = message;
	end if;
    
    
    -- No exceptions thrown, so insert the prescription record
	select name, price
    from manufacturers join manufacturers_make_drugs using(manufacturer_id)
        join drugs using(drug_id)
	where drugs.drug_id like drug_id_var;
    
end //
delimiter ;

-- See treatments for condition
drop procedure if exists get_treaments;

delimiter //
create procedure get_treaments
(
    in condition_name_param varchar(255)
)
begin
	-- variable declarations
    declare condition_id_var int;
    
	declare message varchar(255); -- The error message

    select condition_id 
	into condition_id_var 
	from conditions
	where name like condition_name_param;
    
    if(condition_id_var is null) then
		select concat(condition_name_param, ' is not in this database') into message;
		signal sqlstate 'HY000' set message_text = message;
	end if;
    
    
    -- No exceptions thrown, so insert the prescription record
	select common_name, medical_name, generic
    from conditions join drugs_treat_conditions using(condition_id)
        join drugs using(drug_id)
	where drugs.condition_id like condition_id_var;
    
end //
delimiter ;


-- See count of side-effect creating drugs for a manufacturer
drop procedure if exists count_side_effect_for_manufacturer;

delimiter //
create procedure count_side_effect_for_manufacturer
(
    in manufacturer_name_param varchar(255)
)
begin
	-- variable declarations
    declare manufacturer_id_var int;
    declare count_of_side_effect_drugs int;
    
	declare message varchar(255); -- The error message

    select manufacturer_id
	into manufacturer_id_var 
	from manufacturer
	where name like manufacturer_name_param;
    
    if(manufacturer_id_var is null) then
		select concat(manufacturer_name_param, ' is not in this database') into message;
		signal sqlstate 'HY000' set message_text = message;
	end if;
    
    
    -- No exceptions thrown, so insert the prescription record
	select count(*)
    into count_of_side_effect_drugs
    from manufacturers join manufacturers_make_drugs using(manufacturer_id)
        join drugs using(drug_id)
        join drugs_have_side_effects using(drug_id)
	where manufacturers.manufacturer_id like manufacturer_id_var;
    
    select concat(manufacturer_name_param, ' has ', count_of_side_effect_drugs, ' drugs with side effects');
    
end //
delimiter ;

-- See count of all patients using drugs for a manufacturer
drop procedure if exists count_patients_for_manufacturer;

delimiter //
create procedure count_patients_for_manufacturer
(
    in manufacturer_name_param varchar(255)
)
begin
	-- variable declarations
    declare manufacturer_id_var int;
    declare count_patients int;
    
	declare message varchar(255); -- The error message

    select manufacturer_id
	into manufacturer_id_var 
	from manufacturer
	where name like manufacturer_name_param;
    
    if(manufacturer_id_var is null) then
		select concat(manufacturer_name_param, ' is not in this database') into message;
		signal sqlstate 'HY000' set message_text = message;
	end if;
    
    
    -- No exceptions thrown, so insert the prescription record
	select count(*)
    into count_patients
    from manufacturers join manufacturers_make_drugs using(manufacturer_id)
        join drugs using(drug_id)
        join patients_take_drugs using(drug_id)
	where manufacturers.manufacturer_id like manufacturer_id_var;
    
    select concat(manufacturer_name_param, ' has ', count_patients, ' taking their drugs');
    
end //
delimiter ;


-- See count of all patients using drugs for a manufacturer
drop procedure if exists create_side_effect_for_patient;

delimiter //
create procedure create_side_effect_for_patient
(
    in patient_name_param varchar(255),
    in drug_name_param varchar(255),
    in side_effect_name_param varchar(255)
)
begin
	-- variable declarations
    declare patient_id_var int;
    declare drug_id_var int;
    declare side_effect_id_var int;
    
	declare message varchar(255); -- The error message "MODERATE"

    select patient_id 
	into patient_id_var 
	from patients
	where name like patient_name_param;
    
    select drug_id 
	into drug_id_var 
	from drugs
	where medical_name like drug_name_param;
    
    select side_effect_id 
	into side_effect_id_var 
	from side_effects
	where name like side_effect_name_param;
    
    
    if(patient_id_var is null or drug_id_var is null or side_effect_id_var is null) then
		select concat('One or more given parameters not in this database') into message;
		signal sqlstate 'HY000' set message_text = message;
	end if;
    
    
    insert into patients_have_side_effects values
    (patient_id_var, drug_id_var, side_effect_id_var, "MODERATE");
    
end //
delimiter ;


-- See count of all patients using drugs for a manufacturer
drop procedure if exists remove_patient;

delimiter //
create procedure remove_patient
(
    in patient_name_param varchar(255)
)
begin
	-- variable declarations
    declare patient_id_var int;
    
	declare message varchar(255); -- The error message

     select patient_id 
	into patient_id_var 
	from patients
	where name like patient_name_param;
    
    if(patient_id_var  is null) then
		select concat(patient_name_param, ' is not in this database') into message;
		signal sqlstate 'HY000' set message_text = message;
	end if;
    
    
    -- No exceptions thrown, so insert the prescription record
	delete from  patients_have_side effects where patient_id = patient_id_var;
    delete from patients_take_drugs where patient_id = patient_id_var;
     delete from patients where patient_id = patient_id_var;
    
end //
delimiter ;

-- ------------------------------------------------------------------
-- Database Queries:
-- ------------------------------------------------------------------

-- All patinets
select *
from patients;

-- All drugs
select *
from drugs;

-- All conditions
select * 
from conditions;

-- All manufacturers
select * 
from manufacturers;

-- Conditions of every patient
select patients.name, patients.age, patients.sex, patients.weight, patients.height, conditions.name as `condition`, conditions.cause
from patients
left join patients_take_drugs using (patient_id)
left join conditions using (condition_id);

-- Who makes the cheapest drug to treat pnemonia?
select drugs.medical_name as `drug`, manufacturers.name as `manufacturer`, manufacturers_make_drugs.price
from conditions
join drugs_treat_conditions using (condition_id)
join drugs using (drug_id)
join manufacturers_make_drugs using (drug_id)
join manufacturers using (manufacturer_id)
where conditions.cause like '%pneumonia%'
order by manufacturers_make_drugs.price
limit 1;

-- Which patient has the most side-effects?
select patients.patient_id, patients.name, count(patients_have_side_effects.side_effects_id) as num_side_effects
from patients
left join patients_have_side_effects using (patient_id)
group by patient_id
order by num_side_effects desc
limit 1;

-- Side effects of every drug
select drugs.medical_name as drug, drugs.common_name, side_effects.name as side_effect
from drugs
left join drugs_have_side_effects using (drug_id)
left join side_effects using (side_effects_id);

-- Drugs that have caused digestive issues for patients
select drugs.medical_name as drug, patients.name as patient, side_effects.name as side_effect, patients_have_side_effects.severity
from patients_have_side_effects
join side_effects using (side_effects_id)
join drugs using (drug_id)
join patients using (patient_id)
where side_effects.classification = 'digestive';

-- Drugs which have no reported side effects for patients
select drugs.medical_name, drugs.common_name, drugs.formula
from drugs
where drug_id not in (
	select drug_id
    from patients_have_side_effects);
    
-- Drugs which caused severe side effects for patients
select drugs.medical_name, drugs.common_name, side_effects.name as side_effect
from patients_have_side_effects
join drugs using (drug_id)
join side_effects using (side_effects_id)
where patients_have_side_effects.severity = 'SEVERE';

-- Conditions that drugs made by Pfizer can treat
select conditions.name as `condition`, conditions.cause, drugs.medical_name as drug
from manufacturers
join manufacturers_make_drugs using (manufacturer_id)
join drugs using (drug_id)
join drugs_treat_conditions using (drug_id)
join conditions using (condition_id)
where manufacturers.name = 'Pfizer';

-- How many manufacturers make fentanyl?
select count(manufacturers_make_drugs.manufacturer_id) as count
from drugs
join manufacturers_make_drugs using (drug_id)
where drugs.medical_name = 'fentanyl'
group by drug_id;

-- Drugs prescribed in 2022
select drugs.medical_name, patients_take_drugs.dosage
from patients_take_drugs
join drugs using (drug_id)
where EXTRACT(YEAR from patients_take_drugs.prescribed) = 2022;

-- How many patients experience side effects from every drug?
select drugs.medical_name as drug, drugs.common_name, count(patients_have_side_effects.patient_id) as num_patients
from drugs
left join patients_have_side_effects using (drug_id)
group by drugs.medical_name, drugs.common_name
order by num_patients desc;

-- Average price of every non generic drug
select drugs.medical_name, drugs.common_name, drugs.formula, ROUND(AVG(manufacturers_make_drugs.price), 2) as avg_price
from drugs
left join manufacturers_make_drugs using (drug_id)
where drugs.generic = 0
group by drug_id
order by avg_price desc;

-- All patients who are at risk of developing jaundice as a side effect (i.e. they dont already have jaundice as a side effect, but a drug they take may cause it)
select patients.name, drugs.medical_name as prescribed
from patients_take_drugs
left join patients using (patient_id)
left join drugs using (drug_id)
left join drugs_have_side_effects using (drug_id)
left join side_effects using (side_effects_id)
where side_effects.name = 'jaundice' and patient_id not in (
	select patient_id
    from patients_have_side_effects
    join side_effects using (side_effects_id)
    where side_effects.name = 'jaundice');
    
-- Average age, weight, and height of patients being treated for a fever
select ROUND(AVG(patients.age), 0) as avg_age, ROUND(AVG(patients.weight), 0) as avg_weight, ROUND(AVG(patients.height), 0) as avg_height
from conditions
left join patients_take_drugs using (condition_id)
left join patients using (patient_id)
where conditions.name = 'fever'
group by condition_id;

-- A patient, the conditions they have, the drugs they are taking, and the drug's side effects they experienced
select patients.name as patient, patients.age, conditions.name as `condition`, conditions.cause, drugs.medical_name as drug, patients_take_drugs.dosage, side_effects.name as side_effect
from patients_take_drugs
left join patients using (patient_id)
left join conditions using (condition_id)
left join drugs using (drug_id)
left join patients_have_side_effects using (patient_id, drug_id)
left join side_effects using (side_effects_id);

call patient_side_effects("anne", "ibuprofen");
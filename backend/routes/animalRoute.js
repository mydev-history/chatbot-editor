const express = require('express');
const router = express();
const {
  getAllAnimals, 
  newAnimal, 
  replaceAnimal, 
  deleteAnimal,
  getAnimalById
} = require('../controllers/animalController');

router.route("").get(getAllAnimals);
router.route("/:animalId").get(getAnimalById);
router.route("").post(newAnimal);
router.route("/:animalId").put(replaceAnimal);
router.route("/:animalId").delete(deleteAnimal);


module.exports = router;
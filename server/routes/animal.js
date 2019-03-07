const router = require('express').Router();
const animalController = require('../controllers/animal');
const isAuth = require('../middleware/is-auth');

router.get('/animals', animalController.getAnimals);
router.post('/create', animalController.createAnimal);

module.exports = router;
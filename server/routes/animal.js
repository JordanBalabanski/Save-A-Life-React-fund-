const router = require('express').Router();
const animalController = require('../controllers/animal');
const isAuth = require('../middleware/is-auth');

router.get('/animals/:category', animalController.getAnimals);
router.post('/create', animalController.createAnimal);
router.get('/:id', animalController.detailsAnimal);

module.exports = router;
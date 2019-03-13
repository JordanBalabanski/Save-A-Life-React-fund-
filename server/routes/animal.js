const router = require('express').Router();
const animalController = require('../controllers/animal');
const isAuth = require('../middleware/is-auth');

router.get('/animals/:category', animalController.getAnimals);
router.post('/create', animalController.createAnimal);
router.get('/:id', animalController.detailsAnimal);
router.post('/:id/comment', animalController.createComment);
router.get('/:id/comments', animalController.getComments);
router.get('/:id/edit', animalController.getEdit);
router.post('/:id/edit', animalController.postEdit);

module.exports = router;
const router = require('express').Router();
const animalController = require('../controllers/animal');
const isAuth = require('../middleware/is-auth');
const isCreator = require('../middleware/is-author');

router.get('/animals/:category', animalController.getAnimals);
router.get('/my-animals', isAuth, animalController.myAnimals);
router.post('/create', isAuth, animalController.createAnimal);
router.get('/:id', animalController.detailsAnimal);
router.post('/:id/comment', animalController.createComment);
router.get('/:id/comments', animalController.getComments);
router.get('/:id/edit', isAuth, animalController.getEdit);
router.put('/:id/edit', isAuth, animalController.postEdit);
router.get('/:id/delete', isAuth, animalController.getDeletePost);
router.delete('/:id/delete', isAuth, animalController.deletePost);

module.exports = router;
const Animal = require('../models/Animal');

module.exports = {
  getAnimals: (req, res) => {
    const { category } = req.params;
    const searchBy = category === 'all' ? {} : {category};
    Animal.find(searchBy)
      .populate('creator')
      .then((animals) => {
        res
          .status(200)
          .json({ message: 'Loaded posts successfully.', animals });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createAnimal: (req, res) => {

    const { creator, title, description, category, imageUrl, contactName, contactInfo } = req.body;

    Animal.create({
      creator,
      title,
      description,
      category,imageUrl,
      contactInfo,
      contactName
    }).then((animal) => {
      res.status(200)
        .json({
          message: 'Post created successfully!',
          animal
        })
    }).catch((err) => {
      res.status(401)
      .json({
        message: 'You have to be logged in to post and the info should be valid!'
      })
    })
  },
  detailsAnimal: (req, res) => {
    const { id } = req.params;

    Animal.findById(id)
      .then((animal) => {
        res
          .status(200)
          .json(animal)
      }).catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      })
  }
}
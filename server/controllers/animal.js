const Animal = require('../models/Animal');

module.exports = {
  getAnimals: (req, res) => {
//     Game.find()
//       .then((games) => {
//         res
//           .status(200)
//           .json({ message: 'Fetched games successfully.', games });
//       })
//       .catch((error) => {
//         if (!error.statusCode) {
//           error.statusCode = 500;
//         }
//         next(error);
//       });
    const { category } = req.params;
    const searchBy = category === 'all' ? {} : {category};
    Animal.find(searchBy)
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

    const { creator, title, description, category, imageUrls, contactName, contactInfo } = req.body;

    Animal.create({
      creator,
      title,
      description,
      category,imageUrls,
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
  getAnimalsByCategory: (req, res) => {
    // const category = req.params.category;
    // Game.find({categories: {
    //   $all: [category]
    // }})
    //   .then((games) => {
    //     res
    //       .status(200)
    //       .json({ message: `${category} games fetched.`, games })
    //   })
    //   .catch((error) => {
    //     if (!error.statusCode) {
    //       error.statusCode = 500;
    //     }
    //     next(error);
    //   });
  }
}
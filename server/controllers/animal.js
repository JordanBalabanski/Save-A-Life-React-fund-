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
  },
  createAnimal: (req, res) => {
    // const gameObj = req.body;
    // Game.create(gameObj)
    // .then((game) => {
    //   res.status(200)
    //     .json({
    //       message: 'Game created successfully!',
    //       game
    //     })
    // })
    // .catch((error) => {
    //   if (!error.statusCode) {
    //     error.statusCode = 500;
    //   }
    //   next(error);
    // });

    console.log(req.fields);
    console.log(req.files);
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
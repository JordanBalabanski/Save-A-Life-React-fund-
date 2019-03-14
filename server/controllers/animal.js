const Animal = require('../models/Animal');
const User = require('../models/User');
const Comment = require('../models/Comment');

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
  myAnimals: (req, res) => {
    Animal.find({creator: req.userId})
      .then(animals => {
        res.status(200)
            .json(
              animals
            )
      })
  },
  createAnimal: (req, res) => {

    const { creator, title, description, category, imageUrl, imageName, contactName, contactInfo } = req.body;

    Animal.create({
      creator,
      title,
      description,
      category,
      imageName,
      imageUrl,
      contactInfo,
      contactName
    }).then((animal) => {
      User.findById(creator).then(user => 
        {user.myPosts.push(animal._id)
        user.save()
        .then(() => {
          res.status(200)
            .json({
              message: 'Post created successfully!',
              animal
            })
        })})
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
      .populate('creator')
      .then((animal) => {
        res
          .status(200)
          .json(animal)
      })
  },
  createComment: (req, res) => {
    const { author, isAdmin, content, post } = req.body;

    Comment.create({ author, isAdmin, content, post })
      .then(comment => {
        res.status(200)
            .json({
              message: 'Post created successfully!',
              comment
            })
      }).catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  getComments: (req, res) => {
    const post = req.params.id;

    Comment.find({post})
      .then(comments => {
        res.status(200)
            .json(
              comments
            )
      }).catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  getEdit: (req, res) => {
    const { id } = req.params;

    Animal.findById(id)
      .then((animal) => {
        if (req.userId.toString()===animal.creator.toString()) { 
          res
            .status(200)
            .json({message: 'ok', animal})
        } else {
          res.status(401)
          .json({
            message: 'Unauthorized!'
          })
        }
      })
  },
  postEdit: (req, res) => {
    const { id } = req.params;

    Animal.findById(id)
      .then((animal) => {
        if (req.userId.toString()===animal.creator.toString()) {
          const { title, description, category, contactName, contactInfo, imageName, imageUrl } = req.body;
          if (title) {
            animal.title = title;
          }
          if (description) {
            animal.description = description;
          }
          if (category) {
            animal.category = category;
          }
          if (contactName) {
            animal.contactName = contactName;
          }
          if (contactInfo) {
            animal.contactInfo = contactInfo;
          }
          if (imageUrl) {
            animal.imageUrl = imageUrl;
            animal.imageName = imageName;
          }
          animal.save()
          .then(() => {
            res
            .status(200)
            .json({
              message: 'Edit successful!'
            })
          })
        } else {
          res.status(401)
          .json({
            message: 'Unauthorized!'
          })
        }
      })
  },
  getDeletePost: async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(req.userId);
    const animal = await Animal.findById(id);

    if (req.userId.toString()===animal.creator.toString() || user.isInRole('admin')) { 
      res
        .status(200)
        .json({message: 'ok', animal})
    } else {
      res.status(401)
      .json({
        message: 'Unauthorized!'
      })
    }
  },
  deletePost: async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(req.userId);
    const animal = await Animal.findById(id);

    if (req.userId.toString()===animal.creator.toString() || user.isInRole('admin')) { 

      Animal.findByIdAndDelete(id)
        .then(() => {
          Comment.deleteMany({post: id})
            .then(() => {res.status(200)
              .json({
                message: 'Delete successful!'
              })})
        })
    } else {
      res.status(401)
      .json({
        message: 'Unauthorized!'
      })
    }
  }
}
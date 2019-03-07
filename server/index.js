const express = require('express');
const bodyParser = require('body-parser');
const animalRoutes = require('./routes/animal');
const authRoutes = require('./routes/auth');
// const formidable = require('express-formidable');
require('./database/database')();
const port = 9999;
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
// app.use(formidable({
//   encoding: 'utf-8',
//   uploadDir: '/content/images/uploads',
//   multiples: true, // req.files to be arrays of files
// }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/animal', animalRoutes);
app.use('/auth', authRoutes);

// General error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
  next();
});

app.listen(port, () => { console.log(`REST API listening on port: ${port}`) });
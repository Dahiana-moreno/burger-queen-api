const express = require('express'); // Usamos 'require' en lugar de la sintaxis de importación
const mongoose = require('mongoose');
// console.log("prueba");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// mongoose.connect(process.env.MONGODB_URI)
// mongoose.connect('mongodb+srv://dahian1507becerra:mongoatlas08.@cluster0.0zqlxql.mongodb.net/?retryWrites=true&w=majority')

app.listen(port);
console.log(`Srver listen on port ${port}`);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('conected to MongoDb Atlas'))
  .catch((error) => console.log(error));

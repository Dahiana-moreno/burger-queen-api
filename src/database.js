import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://dahian1507becerra:mongoatlas08.@cluster0.0zqlxql.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('conected to MongoDb Atlas');
    const host = process.env.DB_URL || 'mongodb://127.0.0.1:27017/burger_queen_api';
    return mongoose.createConnection(host);
  })
  .then(() => {
    console.log('conexion correcta a la base de datos');
  })
  .catch((error) => console.log(error));

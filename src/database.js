import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/burger_queen_api')
  .then(() => console.log('conexion correcta'))

  .catch((error) => console.log(error));

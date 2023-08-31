import mongoose from 'mongoose';

const host = process.env.HOST || '127.0.0.1';
mongoose.connect(`mongodb://${host}:27017/burger_queen_api`)
  .then(() => console.log('conexion correcta'))

  .catch((error) => console.log(error));

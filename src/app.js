// console.log("prueba");
import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json'; // leer archivo json
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/aut.routes';

const app = express();

app.set('pkg', pkg); // colocar nombre y valor en exprees  guardar yluego obtener
app.use(morgan('dev'));
app.use(express.json()); // entender los datos json que viene del servidor

app.get('/', (req, res) => {
  res.json({
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    titulo: app.get('pkg').name,

  });
});
app.use('/products', productsRoutes);
app.use('/auth', authRoutes);

export default app;

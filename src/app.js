// console.log("prueba");
import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json'; // leer archivo json
import { createRoles } from './libs/initialSetup';
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
// import usersRoutes from './routes/users.routes';

const app = express();
createRoles();

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
app.use('/login', authRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

// app.use('/users', usersRoutes);

export default app;

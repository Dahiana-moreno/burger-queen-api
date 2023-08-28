import jwt from 'jsonwebtoken';
import loginn from '../models/auth';
import config from '../config';

// eslint-disable-next-line consistent-return
export const login = async (req, res) => {
  const {
    email, password,
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Se requiere un correo electrónico y una contraseña' });
  }

  try {
    let user = await loginn.findOne({ email });
    if (!user) {
    // eslint-disable-next-line new-cap
      const newLoginn = new loginn(
        {
          email,
          password: await loginn.encryptPassword(password),
        },
      );

      user = await newLoginn.save();
      console.log(user);
      console.log('hola soy tu login');
    } else {
      // Si el usuario existe, verificamos si la contraseña coincide
    //  return res.status(403).json({ error: 'Ya existe un usuario con este correo electrónico' });
      const passwordMatch = await loginn.comparePassword(password, user.password);
      if (passwordMatch) {
        return res.status(401).json({ error: 'Credenciales de password no coinciden' });
      }
    }

    //  const passwordMatch = await loginn.comparePassword(password, user.password);

    /*   if (passwordMatch) {
      return res.status(401).json({ error: 'Credenciales de password no coinciden' });
    } */

    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ id: user._id }, config.SECRET, {
      expiresIn: 86400, // 24 horas
    });
    res.status(200).json({ token });
  // console.log(newLoginn);
  // console.log(token);
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};
// eslint-disable-next-line consistent-return
export const isAdmin = async (req, res) => {
  try {
    if (req.user.roles.includes('admin')) {
      res.status(200).json({ message: 'Usuario autenticado con rol de administrador' });
    //  next
    } else {
      res.status(403).json({ error: 'Acceso denegado: se requiere rol de administrador' });
    }
  } catch (error) {
    console.error('Error en verificación de rol de administrador:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
  //  res.json('signin');
};

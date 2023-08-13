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
      return res.status(403).json({ error: 'Ya existe un usuario con este correo electrónico' });
    }

    const passwordMatch = await loginn.comparePassword(password, user.password);

    if (passwordMatch) {
      return res.status(401).json({ error: 'Credenciales de password no coinciden' });
    }

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
export const signIn = async (req, res) => {
  res.json('signin');
};

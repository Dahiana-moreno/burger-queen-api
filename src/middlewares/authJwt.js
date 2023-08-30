/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import config from '../config';
import loginn from '../models/auth';

// eslint-disable-next-line consistent-return
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    // console.log(token);

    if (!token) return res.status(403).json({ message: 'No se proporcionó ningún token' });

    const decodedToken = jwt.verify(token, config.SECRET);
    console.log(decodedToken);

    req.usersId = decodedToken.id;
    console.log(req.usersId);
    // const user = await users.findById(decodedToken.id, { password: 0 });
    const user = await loginn.findById(req.usersId, { password: 0 });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'usuario no encontrado' });
    }
    req.user = user; // Agregar el objeto de usuario a la solicitud

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }
};

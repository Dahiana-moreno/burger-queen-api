import jwt from 'jsonwebtoken';
import users from '../models/user';
import config from '../config';
import role from '../models/role';

export const createUser = async (req, res) => {
  const {
    email, password, roles,
  } = req.body;
  // console.log(req.body);
  // eslint-disable-next-line new-cap
  const newUsers = new users(
    {
      email,
      password: await users.encryptPassword(password),
    },
  );
  if (roles) {
    const foundRoles = await role.find({ name: { $in: roles } });
    newUsers.roles = foundRoles.map(role => role.name);
  } else {
    const Role = await role.findOne({ name: 'user' });
    newUsers.roles = [Role.name];
  }
  const savedUsers = await newUsers.save();
  //  res.status(200).json({ message: 'Usuario registrado exitosamente' });

  console.log(savedUsers);

  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ id: savedUsers._id }, config.SECRET, {
    expiresIn: 86400, // 24 horas
  });
  res.status(200).json({ token });
  //  console.log(newUser);
  console.log(token);
};

export const getUsers = async (req, res) => {
  const usuarios = await users.find({}, 'email roles');
  res.json(usuarios);
};

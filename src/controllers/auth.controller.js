import jwt from 'jsonwebtoken';
import user from '../models/user';
import config from '../config.js';

export const signUp = async (req, res) => {
  const {
    username, email, password, roles,
  } = req.body;
  console.log(req.body);
  // eslint-disable-next-line new-cap
  const newUser = new user(
    {
      username,
      email,
      password: await user.encryptPassword(password),
    },
  );
  const savedUser = await newUser.save();

  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400, // 24 horas
  });
  res.status(200).json({ token });
  console.log(newUser);
  console.log(token);
};

export const signIn = async (req, res) => {
  res.json('signin');
};

import users from '../models/user';
import Role from '../models/role';
import user from '../models/user';

export const createUser = async (req, res) => {
  const {
    email, password, roles,
  } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ error: 'Se requiere un correo electrónico y una contraseña' });
  }
  try {
    const user = await users.findOne({ email });
    if (user) {
      return res.status(403).json({ error: 'Ya existe un usuario con este correo electrónico' });
    }
    // eslint-disable-next-line new-cap
    const newUsers = new users(
      {
        email,
        password: await users.encryptPassword(password),
      },
    );

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUsers.roles = foundRoles.map((role) => role.name);
    } else {
      const role = await Role.findOne({ name: 'user' });
      newUsers.roles = [role.name];
    }
    const savedUsers = await newUsers.save();
    console.log(savedUsers);

    res.status(200).json({
      message: 'Usuario Registrado Correctamente',
      email: savedUsers.email,
      roles: savedUsers.roles,
    });
  //  console.log(newUser)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const usuarios = await users.find({}, 'email roles');
    res.json(usuarios);
  } catch (error) {
    console.log(error);
  }
};
export const getUsersById = async (req, res) => {
  const { usersId } = req.params;
  // console.log('Email ID:', emailId);

  console.log('usersId:', usersId);

  try {
    let usuario = null;
    if (usersId.includes('@')) {
      usuario = await users.findOne({ email: usersId });
    } else {
      usuario = await users.findById(usersId);
    }
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({
      message: 'Consulta exitosa',
      email: usuario.email,
      roles: usuario.roles,
    });
  } catch (error) { res.status(500).json({ error: 'Error interno del servidor' }); }
};

export const updateUsersById = async (req, res) => {
  const { usersId } = req.params;

  let updateUsers = null;
  if (usersId.includes('@')) {
    updateUsers = await users.findOneAndUpdate({ email: usersId }, req.body, {
      new: true,
    });
  } else {
    updateUsers = await user.findByIdAndUpdate(usersId, req.body, {
      new: true,
    });
  }
  res.status(200).json(updateUsers);
};

export const deleteUsersById = async (req, res) => {
  const { usersId } = req.params;

  if (usersId.includes('@')) {
    await users.findOneAndDelete({ email: usersId });
  } else {
    await users.findByIdAndDelete(usersId);
  }
  res.status(204).json();
};

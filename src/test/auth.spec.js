/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import { login, isAdmin } from '../controllers/auth.controller';
import authModel from '../models/auth';

jest.mock('../models/auth', () => ({
  findOne: jest.fn(),
  comparePassword: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

const request = {
  body: {
    email: 'test@gmail.com',
    password: 'password',
  },
  user: {
    _id: 'mockUserId',
    roles: ['user'],
  },
};
const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Exito en el Login', async () => {
    // Configurar mocks para loginn.findOne y loginn.comparePassword
    authModel.findOne.mockResolvedValueOnce(null);
    authModel.comparePassword.mockResolvedValueOnce(true);

    jwt.sign.mockReturnValueOnce('MockToken3787937983798ufhskjs983');
    await login(request, response);

    expect(response.json).toHaveBeenCalledWith({ token: 'MockToken3787937983798ufhskjs983' });
  });

  test('Login Exitosos El usuario existe y sus crdencilaes coinciden', async () => {
    authModel.findOne.mockResolvedValueOnce({ _id: 'mockUserId', password: 'hashedPassword' });
    authModel.comparePassword.mockResolvedValueOnce(true);

    jwt.sign.mockReturnValueOnce('MockToken3787937983798ufhskjs983');

    await login(request, response);
    expect(response.json).toHaveBeenLastCalledWith({ token: 'MockToken3787937983798ufhskjs983' });
  });

  test(' El ususario existe pero su contraseña no coincide', async () => {
    authModel.mockResolvedValueOnce({ _id: 'MockToken3787937983798ufhskjs983', password: 'hashedPassword' });
    authModel.comparePassword.mockResolvedValueOnce(false);

    await login(request, response);

    expect(response.status).toHaveBeenhCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({ error: 'credenciales de password no coinciden' });
  });
  describe('Auth controller -isAdmin', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('User is admin Exitoso', async () => {
      request.user.roles = ['admin'];
      await isAdmin(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({ message: 'USuario autenticado con rol de administrador' });
    });

    test('Usuario no es admin -fallo', async () => {
      await isAdmin(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
      // expect(response.status).toHaveBeenCalledWith(403);
      expect(response.json).toHaveBeenCalledWith({ error: 'Acceso denegado: Se requiere rol de administrador' });
    });
  });
});

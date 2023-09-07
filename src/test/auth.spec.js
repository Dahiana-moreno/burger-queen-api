/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import { login, isAdmin } from '../controllers/auth.controller';
import authModel from '../models/auth';

jest.mock('../models/auth', () => ({
  findOne: jest.fn(),
  comparePassword: jest.fn(),
  encryptPassword: jest.fn(),
  sign: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('../config', () => ({
  SECRET: 'products/api',
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
  /*
  test('Login fallido - Usuario no existe, se crea y se devuelve token', async () => {
    authModel.findOne.mockResolvedValueOnce(null);
    authModel.encryptPassword.mockResolvedValueOnce('hashedPassword');

    // Configura el valor de retorno simulado de authModel.save
     authModel.prototype.save.mockResolvedValueOnce({
      _id: 'newUserId',
      email: 'test@gmail.com',
      password: 'hashedPassword',
    });

    // Configura el valor de retorno simulado de jwt.sign
    jwt.sign.mockReturnValueOnce('MockToken3787937983798ufhskjs983');

    // Simula una solicitud y respuesta
    const request = {
      body: {
        email: 'test@gmail.com',
        password: 'password',
      },
    };

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Realiza la llamada a la función de login
    await login(request, response);

    // Verifica los resultados esperados
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      token: 'MockToken3787937983798ufhskjs983',
  });
*/
  test('Exito en el login', async () => {
    authModel.findOne.mockResolvedValueOnce(true);
    authModel.encryptPassword.mockResolvedValueOnce('hashedPasswordtoken');
    jwt.sign.mockReturnValueOnce('eyJhbGciO6IkpNDU3fQ.mf-RWExphQ44PZL9rkmiVhPDfmdI');

    await login(request, response);
    expect(response.json).toHaveBeenCalledWith({ token: 'eyJhbGciO6IkpNDU3fQ.mf-RWExphQ44PZL9rkmiVhPDfmdI' });
  });

  test('Exito en el login *usuario existe y sus credenciales son correctas', async () => {
    authModel.findOne.mockResolvedValueOnce({ id: 'mockUserId', password: 'hashedPassword' });
    authModel.encryptPassword.mockResolvedValueOnce('hashedPasswordtoken');
    jwt.sign.mockReturnValueOnce('eyJhbGciO6IkpNDU3fQ.mf-RWExphQ44PZL9rkmiVhPDfmdI');

    await login(request, response);
    expect(response.json).toHaveBeenCalledWith({ token: 'eyJhbGciO6IkpNDU3fQ.mf-RWExphQ44PZL9rkmiVhPDfmdI' });
  });

  test('Login Fallido - Usuario existe pero credenciales no coinciden', async () => {
    authModel.findOne.mockResolvedValueOnce({ _id: 'mockUserId', password: 'hashedPasswordouu' });
    authModel.comparePassword.mockResolvedValueOnce(true);

    await login(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({ error: 'Credenciales de password no coinciden' });
  });

  // describe('Auth Controller - isAdmin', () => {
  test('Usuario es administrador - Éxito', async () => {
    request.user.roles = ['admin'];

    await isAdmin(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ message: 'Usuario autenticado con rol de administrador' });
  });
});

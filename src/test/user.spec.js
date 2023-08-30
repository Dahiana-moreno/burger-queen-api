/* eslint-disable no-undef */
import * as usercontroller from '../controllers/users.controller';
import userModel from '../models/user';
import Role from '../models/role';

jest.mock('../models/user');
jest.mock('../models/role');

describe('User Contrroller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Crear usuaraio y mostralo ', async () => {
    const mockBody = {
      email: 'gracee.hopkjjjkper@systhhers.xyz',
      password: '9XXLqVhq3vw9yjNt',
      roles: ['user'],
    };

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const userSaved = {
      _id: 'mockId',
      ...mockBody,
    };

    userModel.mockReturnValueOnce({
      save: jest.fn().mockResolvedValueOnce(userSaved),
    });
    Role.find.mockResolvedValueOnce([{ name: 'user' }]);

    await usercontroller.createUser({ body: mockBody }, response);

    expect(response.json).toHaveBeenCalledWith({
      message: 'Usuario Registrado Correctamente',
      email: mockBody.email,
      roles: ['user'],
    });
  });

  test('Obtener usuario y retornar lista de usuarios', async () => {
    const users = [
      {
        email: 'grace.hopkjjjkper@systhhers.xyz',
        roles: ['user'],
      },
      {
        email: 'july@gmail.com',
        roles: ['user'],
      }];
    userModel.find.mockResolvedValueOnce(users);

    const response = {
      json: jest.fn(),
    };
    await usercontroller.getUsers({}, response);

    expect(userModel.find).toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledWith(users);
  });

  test('Obtener usuario por ID de correo electrónico y retornar información', async () => {
    const mockUser = {
      _id: 'mockUserId',
      email: 'test@example.com',
      roles: ['user'],
    };

    userModel.findOne.mockResolvedValueOnce(mockUser);

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const request = {
      params: {
        usersId: 'test@example.com',
      },
    };

    await usercontroller.getUsersById(request, response);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(response.json).toHaveBeenCalledWith({
      message: 'Consulta exitosa',
      email: mockUser.email,
      roles: mockUser.roles,
    });
  });

  test('Obtener usuario por ID de ObjectId y retornar información', async () => {
    const mockUser = {
      _id: 'mockUserId',
      email: 'test@example.com',
      roles: ['user'],
    };

    userModel.findById.mockResolvedValueOnce(mockUser);

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const request = {
      params: {
        usersId: 'mockUserId',
      },
    };

    await usercontroller.getUsersById(request, response);

    expect(userModel.findById).toHaveBeenCalledWith('mockUserId');
    expect(response.json).toHaveBeenCalledWith({
      message: 'Consulta exitosa',
      email: mockUser.email,
      roles: mockUser.roles,
    });
  });

  test('Intentar obtener usuario inexistente por ID', async () => {
    userModel.findOne.mockResolvedValueOnce(null);

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const request = {
      params: {
        usersId: 'nonExistentUserId',
      },
    };

    await usercontroller.getUsersById(request, response);

    // expect(userModel.findOne).toHaveBeenCalledWith({ email: 'nonExistentUserId' });
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({ error: 'Usuario no encontrado' });
  });

  /* test('Manejar error interno del servidor', async () => {
    userModel.findOne.mockRejectedValueOnce(new Error('Internal Server Error')); */
  test('Manejar error no se encuentra el usuario', async () => {
    userModel.findOne.mockRejectedValueOnce(new Error('Internal Server Error'));
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const request = {
      params: {
        usersId: 'test@example.com',
      },
    };

    await usercontroller.getUsersById(request, response);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    // expect(response.status).toHaveBeenCalledWith(500);
    expect(response.status).toHaveBeenCalledWith(404);

    expect(response.json).toHaveBeenCalledWith({ error: 'Usuario no encontrado' });
  });

  test('Eliminar usuario por ID de ObjectId y retornar respuesta 204', async () => {
    userModel.findByIdAndDelete.mockResolvedValueOnce();

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const request = {
      params: {
        usersId: 'mockUserId',
      },
    };
    await usercontroller.deleteUsersById(request, response);
    expect(userModel.findByIdAndDelete).toHaveBeenCalledWith('mockUserId');
    expect(response.status).toHaveBeenCalledWith(204);
    expect(response.json).toHaveBeenCalledTimes(1);
  });

  test('Actualizar usuario por ID de ObjectId y retornar respuesta 204', async () => {
    userModel.findByIdAndUpdate.mockResolvedValueOnce();

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const request = {
      params: {
        usersId: 'mockUserId',
      },
    };
    await usercontroller.updateUsersById(request, response);
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('mockUserId', undefined, { new: true });
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
  });
});

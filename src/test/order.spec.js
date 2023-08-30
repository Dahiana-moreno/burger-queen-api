/* eslint-disable no-undef */
import * as orderController from '../controllers/orders.controller';
import orderModel from '../models/order';

describe('Order Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Crear una orden y mostrarla', async () => {
    const mockBody = {
      client: 'Test Client',
      products: ['Product 1', 'Product 2'],
      status: 'Pending',
    };

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const orderSaved = {
      _id: 'mockId',
      ...mockBody,
    };
    orderModel.prototype.save = jest.fn().mockResolvedValueOnce(orderSaved);
    await orderController.createOrder({ body: mockBody, user: { id: 'mockUserId' } }, response);
    expect(response.json).toHaveBeenCalledWith(orderSaved);
  });

  test('Obtener una lista de órdenes', async () => {
    const orders = [
      {
        client: 'Test Client 1',
        products: ['Product 1', 'Product 2'],
        status: 'Pending',
      },
      {
        client: 'Test Client 2',
        products: ['Product 3', 'Product 4'],
        status: 'Processed',
      },
    ];
    orderModel.find = jest.fn().mockResolvedValueOnce(orders);
    const response = {
      json: jest.fn(),
    };
    await orderController.getOrders({}, response);
    expect(orderModel.find).toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledWith(orders);
  });

  test('Obtener una orden por su ID', async () => {
    const mockOrder = {
      _id: 'mockOrderId',
      client: 'Test Client',
      products: ['Product 1', 'Product 2'],
      status: 'Pending',
    };

    orderModel.findById = jest.fn().mockResolvedValueOnce(mockOrder);

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const request = {
      params: {
        orderId: 'mockOrderId',
      },
    };

    await orderController.getcreateOrderById(request, response);

    expect(orderModel.findById).toHaveBeenCalledWith('mockOrderId');
    expect(response.json).toHaveBeenCalledWith(mockOrder);
  });

  test('Actualizar una orden por su ID', async () => {
    const mockOrder = {
      _id: 'mockOrderId',
      client: 'Test Client',
      products: ['Product 1', 'Product 2'],
      status: 'Pending',
    };

    orderModel.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(mockOrder);

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const request = {
      params: {
        orderId: 'mockOrderId',
      },
      body: {
        status: 'Processed',
      },
    };

    await orderController.updateOrderById(request, response);

    expect(orderModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'mockOrderId',
      { status: 'Processed' },
      { new: true },
    );
    expect(response.json).toHaveBeenCalledWith(mockOrder);
  });

  test('Eliminar una orden por su ID', async () => {
    orderModel.findByIdAndDelete = jest.fn().mockResolvedValueOnce();

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const request = {
      params: {
        orderId: 'mockOrderId',
      },
    };
    await orderController.deleteOrderById(request, response);
    expect(orderModel.findByIdAndDelete).toHaveBeenCalledWith('mockOrderId');
    expect(response.status).toHaveBeenCalledWith(204);
    expect(response.json).toHaveBeenCalledTimes(1);
  });
});

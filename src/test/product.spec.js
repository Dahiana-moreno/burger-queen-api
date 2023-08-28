/* eslint-disable no-undef */
import * as productController from '../controllers/products.controller';

import ProductModel from '../models/product'; // Importa el modelo de producto

jest.mock('../models/product'); // Mockea el modelo de producto

describe('Product Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Crear producto y  mostrar la creacion de un nuevo productot', async () => {
    const mockBody = {
      body: {
        name: 'Sandwich de jamón y queso',
        price: 1000,
        imgURL: 'Sandwich de jamón y queso',
        type: 'Desayuno',
      },
    };
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const productSaved = {
      _id: 'mockId',
      ...mockBody.body,
    };
    ProductModel.mockReturnValueOnce({
      save: jest.fn().mockResolvedValueOnce(productSaved),
    });

    await productController.createProduct(mockBody, response);
    //  expect(ProductModel.save).toHaveBeenCalled();

    expect(response.json).toHaveBeenCalledWith(productSaved);
  });

  test('Obtener productos y retonar lista de productos', async () => {
    const products = [{
      name: 'Sandwich de jamón y queso',
      price: 1000,
      imgURL: 'https://assets.unileversolutions.com/recipes-v2/232047.jpg',
      type: 'Desayuno',
    }, {
      name: 'Café americano',
      price: 500,
      imgURL: 'https://www.elglobo.com.mx/cdn/shop/products/americano-1_800x.jpg?v=1618806696',
      type: 'Desayuno',
    }];
    ProductModel.find.mockResolvedValueOnce(products);

    const response = {
      json: jest.fn(), // simular la funcion de respuesta
    };

    await productController.getProducts({}, response);

    expect(ProductModel.find).toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledWith(products);
  });
  test('Eliminar producto por ID y retornar respuesta sin contenido', async () => {
    const mockProductId = 'mockProductId';

    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const request = {
      params: {
        productId: 'mockProductId',
      },
    };
    await productController.deleteProductById(request, response);
    expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(mockProductId);
    expect(response.status).toHaveBeenCalledWith(204);
    expect(response.json).toHaveBeenCalledTimes(0);
  });
});

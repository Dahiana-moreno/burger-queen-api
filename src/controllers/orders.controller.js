import order from '../models/order';

export const createOrder = async (req, res) => {
  const {
    client, products, status,
  } = req.body;

  // eslint-disable-next-line new-cap
  const newOrder = new order(
    {
      client, products, status,
    },
  );
  const orderSaved = await newOrder.save();
  console.log(req.body); // mirar lo que el clienete envia.
  res.status(201).json(orderSaved);
};

export const getOrders = async (req, res) => {
  const orders = await order.find(); // devuelve lista de productos
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const orden = await order.findById(req.params.orderId);
  res.status(200).json(orden);
};

export const updateProductById = async (req, res) => {
  const updateOrder = await order.findByIdAndUpdate(req.params.orderId, req.body, {
    new: true,
  });
  res.status(200).json(updateOrder);
// staus
};

export const deleteOrderById = async (req, res) => {
  const { orderId } = req.params;
  await order.findByIdAndDelete(orderId);
  res.status(204).json();
};

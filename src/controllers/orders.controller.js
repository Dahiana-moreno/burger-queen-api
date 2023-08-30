import order from '../models/order';

export const createOrder = async (req, res) => {
  const {
    client, products, status,
  } = req.body;
  try {
    const userId = req.user.id;
    // eslint-disable-next-line new-cap
    const newOrder = new order(
      {
        userId, client, products, status,
      },
    );
    const orderSaved = await newOrder.save();
    console.log(newOrder); // mirar lo que el clienete envia.
    res.status(201).json(orderSaved);
  } catch (error) {
    console.error('Error al crear la orden', error);
    res.status(500).json({ error: 'Error interno al servidor' });
  }
};

export const getOrders = async (req, res) => {
  const orders = await order.find(); // devuelve lista de productos
  res.json(orders);
};

export const getcreateOrderById = async (req, res) => {
  const orden = await order.findById(req.params.orderId);
  res.status(200).json(orden);
};

// eslint-disable-next-line consistent-return
export const updateOrderById = async (req, res) => {
  try {
    const updateOrder = await order.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      { new: true },
    );
    if (!updateOrder) {
      return res.status(404).json({ error: 'Orden no encontrad' });
    }
    res.status(200).json(updateOrder);
  } catch (error) {
    console.error('Error al actualizar la orden:', error);
    res.status(500).json({ error: 'error al actualizar la orden' });
  }
};

export const deleteOrderById = async (req, res) => {
  const { orderId } = req.params;
  await order.findByIdAndDelete(orderId);
  res.status(204).json();
};

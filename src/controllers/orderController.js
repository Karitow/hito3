import * as sql from '../models/Order.models.js';

export const createOrder = (req, res) => {
  const { userId, items, totalAmount } = req.body;
  sql.createOrder(userId, items, totalAmount)
    .then(result => res.status(201).json({ status: true, code: 201, message: 'Nuevo pedido', data: result }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const getOrder = (req, res) => {
  const { orderId } = req.params;
  sql.getOrder(orderId)
    .then(result => res.status(200).json({ status: true, code: 200, message: 'Pedido recibido', data: result }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const getAllOrders = (req, res) => {
  const { userId } = req.params;
  sql.getAllOrders(userId)
    .then(result => res.status(200).json({ status: true, code: 200, message: 'Pedidos', data: result }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const updateOrder = (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  sql.updateOrder(orderId, status)
    .then(result => res.status(200).json({ status: true, code: 200, message: 'Cambio en el pedido', data: result }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const deleteOrder = (req, res) => {
  const { orderId } = req.params;
  sql.deleteOrder(orderId)
    .then(result => res.status(200).json({ status: true, code: 200, message: 'Pedido eliminado', data: result }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

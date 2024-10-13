import { createOrder as createOrderModel, getOrder as getOrderModel, updateOrder as updateOrderModel, deleteOrder as deleteOrderModel } from '../models/order.models.js';

export const createOrder = (req, res) => {
  const { userId, items, totalAmount } = req.body;
  createOrderModel(userId, items, totalAmount)
    .then(result => res.status(201).json({ status: true, code: 201, message: result.rows[0] }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const getOrder = (req, res) => {
  const { orderId } = req.params;
  getOrderModel(orderId)
    .then(result => res.status(200).json({ status: true, code: 200, message: result.rows[0] }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const updateOrder = (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  updateOrderModel(orderId, status)
    .then(result => res.status(200).json({ status: true, code: 200, message: result.rows[0] }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

export const deleteOrder = (req, res) => {
  const { orderId } = req.params;
  deleteOrderModel(orderId)
    .then(result => res.status(200).json({ status: true, code: 200, message: result.rows[0] }))
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }));
};

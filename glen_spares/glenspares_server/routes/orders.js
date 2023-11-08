const express = require('express');
const OrderSchema = require('../models/orders');
const CarSchema = require('../models/cars');

const router = express.Router();

// Read all orders
router.get('/api/orders', async (req, res) => {
    try {
        const orders = await OrderSchema.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Create orders
router.post('/api/order', async (req, res) => {
    const order = new OrderSchema({ ...req.body })
    await order.save()
        .then(response => res.json(response))
        .catch(error => res.status(500).json(error))
})

// Delete a order
router.delete('/api/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await OrderSchema.findByIdAndDelete(id);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

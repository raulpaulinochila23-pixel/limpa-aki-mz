const mongoose = require('mongoose');

// Ligação à base de dados na nuvem (MongoDB Atlas)
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const OrderSchema = new mongoose.Schema({
  clientName: String,
  phone: String,
  zone: String,
  serviceType: String,
  totalMT: Number,
  status: { type: String, default: 'Pendente' },
  date: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const orders = await Order.find().sort({ date: -1 });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
  }

  if (req.method === 'POST') {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      return res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar pedido' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
};
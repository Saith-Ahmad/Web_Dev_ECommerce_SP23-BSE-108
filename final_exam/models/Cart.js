import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    },
  ],
});

export const Cart = mongoose.model('Cart', cartSchema);

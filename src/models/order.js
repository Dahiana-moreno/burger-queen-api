import { Schema, model } from 'mongoose';

const orderShema = new Schema(
  {
    client: String,
    products: String,
    status: String,
    dateEntry: { type: Date, default: Date.now },

  },
  {
    timestamps: true,
  },
);

export default model('order', orderShema);

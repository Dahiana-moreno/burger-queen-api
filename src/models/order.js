import mongoose, { Schema, model } from 'mongoose';

const orderShema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    client: { type: String, required: true },
    products:
     [
       {
         qty: { type: Number, required: true },
         //  product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
         product: {
           type: new mongoose.Schema({
             id: Number,
             name: String,
             price: Number,
             image: String,
             type: { type: String, enum: ['Desayuno', 'Almuerzo', 'Cena'], required: true },
             dateEntry: { type: Date, default: Date.now },
           }),
           required: true,
         },
       },
     ],
    status: { type: String, enum: ['pending', 'canceled', 'delivering', 'delivered'], defaul: 'pending' },
    dateEntry: { type: Date, default: Date.now },
    dateProcessed: Date,
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export default model('order', orderShema);

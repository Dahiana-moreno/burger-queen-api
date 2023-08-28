import { Schema, model } from 'mongoose';

const productShema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imgURL: String,
    type: { type: String, enum: ['Desayuno', 'Almuerzo', 'Cena'], required: true },
    dateEntry: { type: Date, default: Date.now },

  },
  {
    // timestamps: true, // hora acualizacion del cambio.
    versionKey: false,

  },
);

export default model('product', productShema);

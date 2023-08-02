import { Schema, model } from 'mongoose';

const productShema = new Schema(
  {
    name: String,
    price: Number,
    imgURL: String,
    type: String,

  },
  {
    timestamps: true, // hora acualizacion del cambio.
    versionKey: false,

  },
);

export default model('product', productShema);

import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const loginnSchema = new Schema(
  {

    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  },
);

loginnSchema.statics.encryptPassword = async (password) => { // recibe la contraseña
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
// nuevea contraseña a comparar true o false
loginnSchema.statics.comparePassword = async (password, receivedPassword) => {
  await bcrypt.compare(password, receivedPassword);
};

export default model('loginn', loginnSchema);

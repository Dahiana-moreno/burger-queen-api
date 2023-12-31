import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    roles: [
      {
        ref: 'Role',
        type: String,
      },
    ],

  },
  {
    versionKey: false,
  },
);

userSchema.statics.encryptPassword = async (password) => { // recibe la contraseña
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
// nuevea contraseña a comparar true o false
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  await bcrypt.compare(password, receivedPassword);
};

export default model('users', userSchema);

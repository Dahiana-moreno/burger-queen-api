import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    // name: String,
    // username: {
    /// type: String,
    //  unique: true,
    // },
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
        type: Schema.Types.ObjectId,
      },
    ],

  },
  {
    timestamps: true,
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

export default model('user', userSchema);

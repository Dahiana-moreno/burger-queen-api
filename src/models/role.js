import { Schema, model } from 'mongoose';

const roleSchema = new Schema(
  {

    name: String,
  },
  {
    versionKey: false,
  },
);

/* {name: "admin", _id: "1qagghety37"}
{name: "mesero", _id: "368638hehje"} */
export default model('role', roleSchema);

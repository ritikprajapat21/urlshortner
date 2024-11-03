import { model, Schema } from "mongoose";

export interface UserType {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
}

const UserSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

const User = model("User", UserSchema);

export default User;

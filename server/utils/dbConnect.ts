import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const connection = await connect(process.env.MONGO_URI!);
    return connection;
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;

import mongoose from "mongoose";
import 'dotenv/config';


const connectDB = async (): Promise<void> => {
    try {
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      process.exit(1);
    }
};

export default connectDB;

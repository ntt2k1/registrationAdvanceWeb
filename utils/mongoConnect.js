import mongoose from 'mongoose';
import ENV from 'dotenv';

// .env
ENV.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log('Connect DB successfully');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB
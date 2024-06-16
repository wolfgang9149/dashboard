import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // eslint-disable-next-line
    console.log('MongoDB connected...');
  } catch (err) {
    // eslint-disable-next-line
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;

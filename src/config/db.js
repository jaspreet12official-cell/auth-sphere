import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    console.log("URI exists:", !!mongoURI);
    console.log("URI starts with:", mongoURI?.slice(0, 15));
    console.log("URI length:", mongoURI?.length);

    await mongoose.connect(mongoURI);

    console.log("Mongo DB connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

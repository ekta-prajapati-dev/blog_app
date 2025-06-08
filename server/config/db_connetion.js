import mongoose from "mongoose";

const dbConnetion = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database conneted successfully.`);
  } catch (error) {
    console.log(`Database Connection Error: ${error}`);
  }
};

export default dbConnetion;

import mongoose from "mongoose";

const dbConnect = async () => {
  const MONGODB_URI = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;

  try {
    return await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log("Error in connecting to DB", error);
    process.exit(1);
  }
};

export default dbConnect;

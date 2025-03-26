import { config } from "dotenv";
config();
import app from "./app.js";
import dbConnect from "./db/dbConnect.js";

const PORT = process.env.PORT || 5000;


dbConnect().then((res) => {
  console.log("Database connected successfully");
  console.log(res.connection.host);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

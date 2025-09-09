const mongoose=require("mongoose")

require("dotenv").config()


exports.connectDB=()=>{
     mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("Connection error", err.message);
      process.exit(1);
    });

}
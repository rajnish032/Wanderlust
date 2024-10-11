const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//   console.log("working..........................................")
// async function main() {
//   await mongoose.connect(MONGO_URL);
// }
const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB connected");
  } catch (err) {
    console.log(err.message);
  }
}
connectDb();

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ 
  ...obj, 
  owner: "67014191cc044cb74fd66e2c",
}) );
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
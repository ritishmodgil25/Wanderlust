const mongoose = require("mongoose");
const Listing = require("../models/listing.cjs");
const initData = require("./sampleData.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main().then((res) => console.log("Mongoose: connection successful"))
    .catch((err) => {
        console.log(err);
    });

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Mongoose: connection successful");
        await initDB();
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
}
async function initDB() {
    try {
        await Listing.deleteMany({});
        console.log("Data Deleted");
    } catch (err) {
        console.log("Data not deleted");
    }
    try {
        console.log("just before adding owner");
        initData.data = initData.data.map((el) => ({...el, owner: "66bb51fc62ff43c6f7712b81" }));
        console.log(initData.data);
        await Listing.insertMany(initData.data);
        console.log("data inserted");
    } catch {
        console.log("Data not inserted");
    }
}
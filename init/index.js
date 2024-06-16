const mongoose = require("mongoose");
const initData = require("./data")
const Listing = require("../models/listing")

let URL = "mongodb://127.0.0.1:27017/wanderlust";

mongoose.connect(URL)
.then((res)=> console.log("DB is connected"))
.catch((err)=> console.log(err))

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner: "6654e69e2fae3419cc2de353",
    }))
    await Listing.insertMany(initData.data);
    console.log("Data was initialized")   
}

initDB();
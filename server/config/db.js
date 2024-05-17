const mongoose = require("mongoose");
mongoose.set("strictQuery",false);
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('database coonnected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
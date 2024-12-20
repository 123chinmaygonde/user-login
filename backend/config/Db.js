const mongoose = require("mongoose")

const ConnectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("database connected")
    } catch (error) {
        console.log("failed to connect database")
    }
}

module.exports = ConnectDb
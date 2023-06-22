// middleware/db.js : connect to the MongoDB server and get the reference to the database

const mongoose = require("mongoose")

const uri = "mongodb+srv://sans23:sans23@cluster0.imfbwwj.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'learningpath';

const connectdb = ()=>{
    mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true}).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`)
    })
    //catch part will be handled with unhandled promise rejection handler
}

module.exports = connectdb;

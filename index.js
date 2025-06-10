const express = require('express');
const urlRoute = require("./routes/urlRoute");
const connectDB = require("./connect");

const app = express();
const PORT = 8001;

connectDB("mongodb://127.0.0.1:27017/urlShortner")
.then(()=>{console.log("MONGODB connected!")})
.catch((err)=>{console.log(`ERROR : ${err}`)});

app.use(express.urlencoded({extends:false}))

app.use('/url',urlRoute);


app.listen(PORT,()=>{console.log(`Server started at PORT : ${PORT}`)});
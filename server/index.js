const express = require("express");
const app =express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path")

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:true,useUnifiedTopology:true},()=>{
    console.log("Connected to MongoDB");
});
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth",authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

// app.get("/",(req,res)=>{
//     res.json("manas")
// })

app.listen(8800,()=>{
    console.log("Server running");
})
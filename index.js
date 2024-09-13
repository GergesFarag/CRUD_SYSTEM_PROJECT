const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const myRoutes = require("./Routes/allRoutes");
const cors = require("cors")
const corsConfig = {
  origin : "*",
  credential : true ,
  methods : ["GET" , "POST" , "PUT" , "DELETE"] 
}
const cookieParser = require("cookie-parser")
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); //To Access Body Parameters
app.set("view engine", "ejs"); //to Use EJS
app.use(express.static("public")); //to Use Static Files e.g. (Css , Js , Images)
app.use(myRoutes);
app.use(cors(corsConfig))
const port = process.env.PORT || 5500

//Connection To Database
mongoose
  .connect(
    "mongodb+srv://Gerges:Gerges123@cluster0.qnsx5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(
        "Server Running on : http://localhost:5500/ \n Connected to Database !"
      );
    });
  })
  .catch(() => {
    console.log("Failed To Connect", new Error());
  });

const express = require("express");
const mongoose = require("mongoose");



const port = 4789;


const app= express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://madhugubge143:madhugubge143@cluster0.qcs4r.mongodb.net/madhu?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((req, res) => {
    console.log("db connected....");
  })
  .catch((err) => {
    console.log(err.message);
  });
  

app.use(require("./Cricket/User"));
app.use(require("./Cricket/movies"));
app.use(require("./Cricket/covid19"));
  
app.listen(port, () => {
    console.log(`server running at ${port}`);
}); 

 
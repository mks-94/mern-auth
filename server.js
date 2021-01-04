const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Setup express
const app = express();
app.use(express.json());
app.use(cors());

//Create a listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The servre started on the port: ${PORT}`));

//Connect mongoose with local mongodb
mongoose.connect(
  "mongodb://127.0.0.1:27017/mern-auth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB server established successfully!");
  }
);

//Set up routes
app.use("/users", require("./routes/userRouter"));
app.use("/todos", require("./routes/todoRouter"));

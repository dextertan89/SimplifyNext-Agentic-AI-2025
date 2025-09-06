const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());

//databse connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.log("Connection error:", err));

app.listen(8088, () => {
  console.log("Server is running on port 8088");
});
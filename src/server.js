const express = require("express");
const mongoose = require('mongoose')

const cors = require("cors");
require("dotenv").config();

const app = express();
mongoose.connect('mongodb+srv://middleware58_db_user:12345@cluster-1.6ci6iel.mongodb.net/Middleware')

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

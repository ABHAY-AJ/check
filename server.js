const express = require("express");
const connectDB = require("./config/db");
require('dotenv').config();


const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", require("./routes/user"));

app.use("/api/career", require("./routes/hrRoute"));

app.use("/api/tpo", require("./routes/tpoRoute"));

app.use("/api/apply", require("./routes/studentRoute"));





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
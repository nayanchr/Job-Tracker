const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const applicationRoutes = require ("./routes/applications")
const cors = require("cors")

const app = express();
app.use(cors({
    origin: "https://job-tracker-frontend-nayan-choureys-projects.vercel.app"
}));
app.use(express.json());

//connecting to mongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("Connection error:", err));

//Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

//Application Routes
app.use("/applications", applicationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

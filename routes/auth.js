const express =  require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")


//Registeration

router.post("/register", async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password : hashedPassword 
        });

        await user.save();
        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

//login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
         const existingUser = await User.findOne({ email });
        if(!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

            res.json({ message: "Login successful", token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

// Protected route - GET profile
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
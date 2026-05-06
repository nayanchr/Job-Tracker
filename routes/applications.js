const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Application = require("../models/application");

router.post("/", auth, async (req, res) => {
    try {
        const {company, position, notes } = req.body;

        const application = new Application ({
            userId: req.userId,
            company,
            position,
            notes

        })
        await application.save();
        return res.status(201).json(application);


    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const application = await Application.find({userId: req.userId})
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch("/:id", auth, async (req, res) => {
    try { 
        const application = await Application.findByIdAndUpdate( 
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({message: "Application Updated"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try{
        application = await Application.findByIdAndDelete( req.params.id );
        res.status(200).json({message : "Application Deleted"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


module.exports = router;
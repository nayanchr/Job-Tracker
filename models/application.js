const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    company : {
        type : String,
        required : true
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["applied", "interview", "rejected", "offer"],
        default: "applied"
    },
    appliedAt : {
        type : Date,
        default : Date.now
    },
    notes : {
        type : String,
        default : ""
    }
})

const application = mongoose.model("Application", applicationSchema);
module.exports = application;
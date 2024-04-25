const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
       
        domain:{
            type:String,
            required:true,
            trim:true,
        },
        startFrom:{
            type:Date,
            default:Date.now(),
        },
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Profile",
        },

    }


);
module.exports = mongoose.model("User", userSchema);
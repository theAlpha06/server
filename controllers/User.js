
const { response } = require("express");
const Profile = require("../models/Profile");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.findUser = async (req, res) => {
    try {
        const user= await User.findOne({"email":req.cookies.email})
        if (!user) {
            return res.status(404).json({
                success: false,
                
                message: req.body,
            });
        }

        const userDetails = await User.findById(user._id)
            .populate("additionalDetails")
            .exec();

        res.send({
            success: true,
            data: userDetails,
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({ email });
        
        if (!userData) {
            return res.status(404).json({
                success: false,
                // email:req,
                message: "User not found with this email",
            });
        }

        // Get the user's ID
        const userId = userData._id;

        // Delete Associated Profile with the User
        const profileId = userData.additionalDetails;
        if (profileId) {
            await Profile.findByIdAndDelete(profileId);
        }
        
        // Now Delete User
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
            success: false,
            message: "User cannot be deleted",
        });
    }
};

exports.getUserSecurity=async(req,res,next)=>{
    if(req.cookies.isLoggedIn){
        let isverified=jwt.verify(req.cookies.isLoggedIn,U_id);
        if(isverified){
            next();
        }
        else{
            return res.json({msg:"Please login first...."});
        }
    }
    else{
        return res.json({msg:"Please login first...."});
    }
};

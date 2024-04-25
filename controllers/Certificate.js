
const Profile = require("../models/Profile");
const User = require("../models/User");

const { uploadImageToCloudinary } = require("../utils/imageUploader")


exports.uploadCertificate = async (req, res) => {
    try {
        const certificateUrl = req.files.certificate
        const email=req.body;
        const userId = req.user.id


        const pdf = await uploadImageToCloudinary(
            certificateUrl,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        // const id = req.user.id;

		// Find the profile by id
        
        const user = await User.findOne(email);
        id=user._id;
        const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
        const profileDetails = await Profile.findById(userDetails.additionalDetails);

        //update profile

        profileDetails.certificate = pdf.secure_url;
        await profileDetails.save();

        res.send({
            success: true,
            message: `certificate Updated successfully`,
            // data: updatedProfile,
            data:userDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const {
      gender ,
      collage ,
      collageLocation,
      course,
      batch,
      branch,
      mobileNo,
    } = req.body;

    const userDetails = await User.findOne({ email: req.cookies.email });
    const profileDetails = await Profile.findById(
      userDetails.additionalDetails
    );

    profileDetails.gender = gender;
    profileDetails.collage = collage;
    profileDetails.collageLocation = collageLocation;
    profileDetails.course = course;
    profileDetails.batch = batch;
    profileDetails.branch = branch;
    profileDetails.mobile = mobileNo;
    await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Profile Not Updated",
      error: error.message,
    });
  }
};

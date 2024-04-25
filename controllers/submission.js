const Profile = require("../models/Profile");
const User = require("../models/User");

exports.submission = async (req, res) => {
  
  try {
    const id = req.user.id;

    const userDetails = await User.findOne({ email: req.cookies.email });
  
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profileDetails = await Profile.findById(
      userDetails.additionalDetails
    );

    if (!profileDetails) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
    profileDetails.linkedinProfile = req.body.LinkedIn_Profile_Link;
    profileDetails.githubProfile = req.body.GitHub_Profile_Link;
    profileDetails.projectData.githubLinks = [
      req.body.Task1_GitHub_Link,
      req.body.Task2_GitHub_Link,
      req.body.Task3_GitHub_Link,
    ];
    profileDetails.projectData.linkedinLinks = [
      req.body.Task1_LinkedIn_Link,
      req.body.Task2_LinkedIn_Link,
      req.body.Task3_LinkedIn_Link,
    ];
    await profileDetails.save();

    // Return response
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

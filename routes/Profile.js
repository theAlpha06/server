const express = require("express")
const router = express.Router();



const {updateProfile} = require("../controllers/Profile");
const {auth}=require("../middlewares/auth")


router.post("/updateProfile",auth, updateProfile)


module.exports = router
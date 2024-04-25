const express = require("express")
const router = express.Router();
const {auth}=require("../middlewares/auth")
const { 
    submission,
} = require("../controllers/submission");
// Route for user login
router.post("/",auth, submission)

module.exports = router
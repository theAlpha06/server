const express = require("express");
const router = express.Router();
const {auth}=require("../middlewares/auth")

const { 
    findUser,
    deleteUser,
    getUserSecurity
} = require("../controllers/User");

router.get("/userDetail",auth,findUser);
router.get("/deleteUser",auth, deleteUser)


module.exports = router
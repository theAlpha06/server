const express = require("express")
const router = express.Router();
const auth = require("../middlewares/auth")

const { 
    login,
    signUp,
    logout,
} = require("../controllers/Auth");
// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)
router.post("/logout", logout)

module.exports = router
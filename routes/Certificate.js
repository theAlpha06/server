const express = require("express")
const router = express.Router();



const {uploadCertificate} = require("../controllers/Certificate");
const {auth}=require("../middlewares/auth")


router.put("/uploadcertificate",auth, uploadCertificate)


module.exports = router
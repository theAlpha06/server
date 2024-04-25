const express = require("express");
const app = express();
const session = require('express-session')
const userRoutes = require("./routes/User");
const submissionRoutes = require("./routes/Submission");
const profileRoutes = require("./routes/Profile");
const certificateRoutes = require("./routes/Certificate");
const userDetailRoutes = require("./routes/UserDetail");
const cors = require("cors");
const dbConnect = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

dbConnect();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'test',
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
      secure: true
    }
  })
);

app.set('trust proxy', true);
app.use(
  cors({
    origin:"http://localhost:3000/",
    credentials: true,
  })
);


app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//cloudinar connection
cloudinaryConnect();

//routes
app.use("/api/v2/auth", userRoutes);
app.use("/api/v2/submission", submissionRoutes);
app.use("/api/v2/profile", profileRoutes);
app.use("/api/v2/certificate", certificateRoutes);
app.use("/api/v2/userdetail", userDetailRoutes);

//default routes
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});

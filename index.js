const express = require("express");
const app = express();
const morgan = require("morgan");
const connect = require("./db/mongoDB");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();
const postRouter = require('./routes/postRouter');
const userRouter = require("./routes/userRouter");
// const postRouter = require("./routes/post");
const auth = require("./middleware/auth");
const User = require("./models/user");





const port = process.env.PORT || 3434;

// mongoose.set("strictQuery", true);
// d above isnt important its used for----- ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db.

// middlewares
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(morgan("dev"));
app.use(cors());


// API's

// app.use('/api/user',userRouter)
// app.use(errorHandlerMiddleware)
app.use("/api", userRouter);
app.get("/api/user/", auth, async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  res.status(200).json({ name: user.name });
});

app.use("/api", auth, postRouter);

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api_key,
    api_secret: process.env.cloud_api_secret,
  });

// home page route
app.get("/", (req, res) => {
  res.json({
    message: "app is running",
  });
});

app.use((req, res) => {
    res.send('route not found')
  })
// db connection and server
connect()
  .then(() => {
    try {
      app.listen(port, () =>
        console.log(`server connected to http://localhost:${port}`)
      );
    } catch (error) {
      console.log("cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("invalid database connection...!", error);
  });

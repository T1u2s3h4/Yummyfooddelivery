// // package.json me type: module ka use karne se hum es6 import statement ka use kar sakte hai .
  import express, { urlencoded } from "express";
 import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
 import session from "express-session";
 import cookieParser from "cookie-parser";
  import passport from "passport";
  import { errorMiddleware } from "./middlewares/errorMiddleware.js";
 import cors from "cors";
//import express from "express";

const app = express();
 export default app;
dotenv.config({
  path: "./config/config.env",
});

// // Using Middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);

app.use(cookieParser());
  app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
 app.use(passport.session());
 app.enable("trust proxy");

  connectPassport();

// // // Importing Routes
 import userRoute from "./routes/user.js";
  import orderRoute from "./routes/order.js";

 app.use("/api/v1", userRoute);
 app.use("/api/v1", orderRoute);

// // // Using Error Middleware
app.use(errorMiddleware);



// "start": "SET NODE_ENV=production &  node server.js",
// "dev":  " SET NODE_ENV=developement & nodemon server.js"
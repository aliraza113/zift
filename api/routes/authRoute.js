import express from "express";
import * as auth from "../controllers/authController.js";
const authRoute = express.Router();

// test route
authRoute.get("/", (req , res)=>{
  console.log("Working")
  return res.json("Working")
});
authRoute.post("/investmentInfo", auth.preSignup);
authRoute.post("/upload-image", auth.uploadImage);


export default authRoute;

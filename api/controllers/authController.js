import * as config from "../config/config.js";
import validator from "email-validator";
import emailTemplate from "../helper/email.js";
import Auth from "../models/authModel.js";
import { nanoid , customAlphabet } from "nanoid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const preSignup = async (req, res) => {
  try {
    const {
      fullName,
      userName,
      email,
      phoneNumber,
      country,
      password,
      confirmPassword,
      amount,
      Txid,
      Image
    } = req.body;
    if (!fullName) {
      return res.json({
        error: "Please Enter Valid fullName ",
      });
    }

    if (!fullName) {
      return res.json({
        error:
          "Please Enter fullName",
      });
    }
    if (!userName) {
      return res.json({
        error:
          "Please Enter userName",
      });
    }
    
    if (!email) {
      return res.json({
        error: "Please Enter Valid Email",
      });
    }
    if (!validator.validate(email)) {
      return res.json({
        error: "Please Enter Correct Email  Spelling",
      });
    }
    if (!phoneNumber) {
      return res.json({
        error: "Please Enter Valid Phone Number",
      });
    }
    if (!country) {
      return res.json({
        error: "Please Enter Valid Country",
      });
    }
    if (!password ) {
      return res.json({
        error:
          "Please Enter Valid Password",
      });
    }
    if (!confirmPassword ) {
      return res.json({
        error:
          "Please Enter Valid confirmPassword",
      });
    }
    if (password !== confirmPassword) {
      return res.json({
        error:
          "Please Enter Same Password in the Password & Confirm Password Field",
      });
    }
    if (!amount ) {
      return res.json({
        error:
          "Please Enter Valid amount",
      });
    }
    if (!Txid ) {
      return res.json({
        error:
          "Please Enter Valid Txid",
      });
    }
    if (!Image ) {
      return res.json({
        error:
          "Please Enter Valid Image",
      });
    };


    const userInfo = await Auth.create({
      fullName,
      userName,
      email,
      phoneNumber,
      country,
      password,
      confirmPassword,
      amount,
      Txid,
      Image,
    });

      return     res.json({ 
        ok: true,
        Info:userInfo,
         message: "Thanks For Handsome Investment" });
    
  } catch (err) {
    console.log(err);
  return  res.json({
      error: "Something Went Wrong... Try Again",
    });
  }
};

export const uploadImage = (req, res) => {
  try {
    //console.log(req.body);
    const { image } = req.body;

    const base64Image = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );


    const type = image.split(";")[0].split("/")[1];

    /* image params */
    const params = {
      Bucket: "ziaja.io-bucket",
      Key: `${nanoid()}.${type}`,
      Body: base64Image,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };
    config.AWSS3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          message: "Something Went Wrong",
        })
      } else {
        //console.log(data);
        res.send(data);
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Upload Failed….try again" });
  }
};


export const sendOtp = async (req, res) => {
  // let twilio = require("twilio");
  const accountSid = config.TWILIO_ACCOUNT_SID;
  const authToken = config.TWILIO_AUTH_TOKEN;
  const client = new twilio(accountSid, authToken);
  // const service = "mhc";
  // const body = `Your One Time Password for Mobile Health Checkup is ${req.body.otp}. Don't share this with anyone.`;
  // const body = `Your One Time Password for Mobile Health Checkup is ${req.body.otp}. Don't share this with anyone.`;
  // const body = `Your One Time Password for MHC is ${req.body.code}`;
  // try {
  client.messages.create({
    body: `Hello Bhai!`,
    to: `${req.body.phoneNumber}`,
    from: "03034200503",
  });
  res.json({ success: true, message: "SMS sent successfully" });
};

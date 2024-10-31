import { model, Schema, ObjectId } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    userName:{
        type: String,
        default: ""
    },
    
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },

    phone_number:{
        type: Number,
        default: 0
    },
    
    // address: {type: String, default: ""},
    country: {type: String, default: ""},
    password: {
        type: String,
        required: true,
        maxLength: 80,
        minlength: 4
    },
    amount: {
        type: String,
        required: true,
       
    },
    Txid: {
        type: String,
        required: true,
        
    },
    Image:{}
    
}, {timestamps: true});

const Auth = model("UserInfo", userSchema);
export default Auth;


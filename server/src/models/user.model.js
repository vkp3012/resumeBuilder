import mongoose from "mongoose"
import modelOption from "./model.options"
import crypto from "crypto"

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        require : true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type : String,
        require : true,
        unique : true
    },
    password : {
        type:String,
        required:[true,"Please provide a Password"],
        select : false
    },
    salt : {
        type:String,
        required:true,
        select : false
    }
}, modelOption)

userSchema.method.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha124",
    ).toString("hex")
}

userSchema.method.validPassword = function (password){
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha124"
    ).toString("hex")

    return this.password === hash
}

const userModel = mongoose.model("User",userSchema);
export default userModel


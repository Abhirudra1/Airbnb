const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    }
})
// here, the above no need to mention username and password bcz by default it takes

// User.plugin(passportLocalMongoose)
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)

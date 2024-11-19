const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.pre('save',async function(next){
    
   try {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
   } catch (error) {
    console.log(error)
   }
})

UserSchema.methods.compare = function(password){
    return bcrypt.compare(password,this.password)
}

const User = mongoose.model('User',UserSchema)
module.exports = User


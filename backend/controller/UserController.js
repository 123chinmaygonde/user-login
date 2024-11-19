const express = require("express")
const User = require("../model/User")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const bcrypt = require("bcryptjs")

exports.SignUp = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({success:false,message:'Empty details'})
        }
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({success:false,message:'user already exists'})
        }
        const user = await User.create({
            email,
            password
        })
        await user.save()
        res.status(200).json({success:true,message:'user created'})
    } catch (error) {
        console.log(error)
    }
}



exports.Login = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({success:false,message:'empty details'})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:'user does not exist'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({success:false,message:'password incorrect'})
        }
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.cookie('token',token,{
            httpOnly:true,
            maxAge:3600000
        })
        res.status(200).json({success:true,message:'login successfull'})

    } catch (error) {
        console.log(error)
    }
}
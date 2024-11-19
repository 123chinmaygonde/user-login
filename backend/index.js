const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const ConnectDb = require("./config/Db")
const UserRoutes = require("./routes/UserRoutes")
ConnectDb()

const app =express()
app.use(express.json())
app.use(cors())

app.use('/api/user',UserRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})

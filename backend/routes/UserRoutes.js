const express = require("express")
const {SignUp} = require("../controller/UserController")
const {Login} = require("../controller/UserController")
const router = express.Router()

router.post('/signup', SignUp)
router.post('/login',Login)

module.exports = router
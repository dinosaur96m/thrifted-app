const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')


// user store (profile) route
//implement the isLoggedIn param
router.get('/:userName', isLoggedIn, (req, res)=>{
    res.send(`welcome to ${req.params.userName}'s store!'`)
})

//cart route
router.get('/cart/:userName', isLoggedIn, (req, res) => {
    res.send(`welcome to ${req.params.userName}'s cart!'`)
})

//delete route




module.exports = router
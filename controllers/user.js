const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')


// user store (profile) route
//implement the isLoggedIn param
router.get('/:userName', isLoggedIn, (req, res)=>{
    console.log(`current user ${req.user.name}`)
    console.log(`currrent user id: ${req.user.id}`)
    db.item.findAll({where: {userId: req.user.id}})
    .then(allItems => {
        res.render('user/store', {displayName: req.user.name, allItems})
        })
})

//cart route
router.get('/cart/:userName', isLoggedIn, (req, res) => {
    res.send(`welcome to ${req.params.userName}'s cart!'`)
})

//delete route




module.exports = router
const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')


// user store (profile) route
//implement the isLoggedIn param
router.get('/:userName', isLoggedIn, (req, res)=>{

    cosnole.log(`current user ${currentUser.name}`)
    db.user.findOne({where: {name: currentUser.name}})
    .then(foundUser => {
        const userId = foundUser.id
        return userId
    })
    .then(userId => {
        db.item.findAll({where: {userId: userId}})
        .then(allItems => {
            res.render('/user/store', {allItems})
        })
    })
})

//cart route
router.get('/cart/:userName', isLoggedIn, (req, res) => {
    res.send(`welcome to ${req.params.userName}'s cart!'`)
})

//delete route




module.exports = router
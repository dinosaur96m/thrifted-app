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
    db.item.findAll({where: {cartId: req.user.id}})
    .then(allItems => {
        res.render('user/cart', {displayName: req.user.name, allItems})
        })
})

router.post('/cart/:userName', isLoggedIn, (req, res) => {
    db.item.findOne({where: {id: req.body.itemId}})
    .then(foundItem => {
        foundItem.set({
            cartId: req.user.id,
            available: false,
        })
        foundItem.save()
        console.log('item moved to cart ', foundItem.cartId)
        res.redirect(`/user/cart/${req.user.name}`)
    })
    .catch(error => {
        console.log(error)
    })
})

//delete route




module.exports = router
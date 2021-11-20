const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')


//show items in user's cart
router.get('/cart/:userName', isLoggedIn, (req, res) => {
    db.item.findAll({where: {cartId: req.user.id}})
    .then(allItems => {
        res.render('user/cart', {displayName: req.user.name, allItems})
        })
})

//add items to user's cart
router.post('/cart/:userName', isLoggedIn, (req, res) => {
    console.log('req.user.id:', req.user.id)
    db.item.findOne({where: {id: req.body.itemId}})
    .then(foundItem => {
        foundItem.set({
            cartId: req.user.id,
            available: false,
        })
        foundItem.save()
        console.log('item moved to cart:', foundItem.cartId)
    })
    .then(res.redirect(`/user/cart/${req.user.name}`))
    .catch(error => {
        console.log(error)
    })
})

//remove items from user's cart
//add items to user's cart
router.put('/cart/:userName', isLoggedIn, (req, res) => {
    db.item.findOne({where: {id: req.body.itemId}})
    .then(foundItem => {
        foundItem.set({
            cartId: null,
            available: true,
        })
        foundItem.save()
        console.log('item removed from cart: ', + foundItem.brand, + ' ', + foundItem.type)
        
    })
    .then(res.redirect(`/user/cart/${req.user.name}`))
    .catch(error => {
        console.log(error)
    })
})


// user store (profile) route
//show all items created by logged in user
router.get('/:userName', isLoggedIn, (req, res)=>{
    console.log(`current user ${req.user.name}`)
    console.log(`currrent user id: ${req.user.id}`)
    db.item.findAll({where: {userId: req.user.id}})
    .then(allItems => {
        res.render('user/store', {displayName: req.user.name, allItems})
        })
})




module.exports = router
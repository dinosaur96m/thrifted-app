const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const cloudinaryUp = require('../middleware/cloudinaryUp')
const router = express.Router()
const cloudinary = require('cloudinary').v2
require('../config/cloudConfig')
const db = require('../models')





//render index of all available items
router.get('/', (req, res) => {
    db.item.findAll({where: {available: true}})
    .then(allItems => {
        res.render('items/idx', {allItems})
    })
    .catch(error => {
        console.log(error)
    })
})

//post a new item to the db and item index
router.post('/new', isLoggedIn, (req, res) => {
    console.log(`req.body: ${JSON.stringify(req.body)}`)
    //     db.item.create({
    //     size: req.body.size,
    //     type: req.body.type,
    //     brand: req.body.brand,
    //     price: req.body.price,
    //     imgUrl: 'test test, url not from cloudinary',
    //     //SequelizeValidationError: string violation: imgUrl cannot be an array or an object
    //     available: true,
    //     userId: 1,
    //     cartId: null,
    // })
    // .then(createdItem => {
    //     console.log(`new item added: ${JSON.stringify(createdItem)}`)
    // })
    // res.send(url)
    res.redirect('/items')
})

//render form for selling a new item
router.get('/new', (req, res) => {
    res.render('items/new')
})



//render form for editing an item
//TO DO: autofill form with item data
router.get('/edit/:itemId', isLoggedIn, (req, res) => {
    res.send(`here is a form for editing the ${req.params.itemId}th item in the db, created by curretnly loggind in user`)
    //if NO ONE is logged in, isLoggedIn redirects to home route
    //add redirect if the item's creator is not logged in
        //check express-session docs for how to access the currently logged in user
})


//render individual item
//TO DO: add edit button visible only to the item's creator
router.get('/:itemId', (req, res) => {
    db.item.findByPk(req.params.itemId)
    .then(foundItem => { 
        res.render('items/item', {item: foundItem})
    })
})


module.exports = router
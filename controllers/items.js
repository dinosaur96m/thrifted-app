const express = require('express')
const app = express()
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require('../models')
const router = express.Router()
//require and config cloudinary
const cloudinary = require('cloudinary')
cloudinary.config(process.env.CLOUDINARY_URL)
//method override
const methodOverride = require('method-override');
//require multer
const multer = require('multer');
const upload = multer({ dest: './uploads/' });


//middleware
app.use(express.json())
app.use(methodOverride('_method'));


//render index of all available items
router.get('/', isLoggedIn, (req, res) => {
    db.item.findAll({where: {available: true}})
    .then(allItems => {
        res.render('items/idx', {allItems, user: req.user.name})
    })
    .catch(error => {
        console.log(error)
    })
})

//render form for selling a new item
router.get('/new', (req, res) => {
    res.render('items/new')
})


router.post('/', isLoggedIn, upload.single('myFile'), function(req, res) {
    cloudinary.uploader.upload(req.file.path, function(result) {
        console.log(result)
        console.log(result.url)
        db.item.create({
            size: req.body.size,
            type: req.body.type,
            brand: req.body.brand,
            price: req.body.price,
            imgUrl: result.url,
            available: true,
            userId: req.user.id,
            cartId: null,
        })
        .then(createdItem => {
            console.log(`new item added: ${JSON.stringify(createdItem)}`)
            res.redirect(`/items/${createdItem.id}`)
        })
    
    });
});


//render form for editing an item
//TO DO: autofill form with item data
router.get('/edit/:itemId', isLoggedIn, (req, res) => {
    db.item.findByPk(req.params.itemId)
    .then(foundItem => { 
        res.render('items/edit.ejs', {item: foundItem})
    })
    //if NO ONE is logged in, isLoggedIn redirects to home route
    //add redirect if the item's creator is not logged in
        //check express-session docs for how to access the currently logged in user
})

router.put('/:itemId', isLoggedIn, (req, res) => {
    console.log('Item Id:',req.params.itemId)
    console.log('req.body:', req.body)   
    console.log('req.user.id:', req.user.id)
    db.item.findOne({where: {id: req.params.itemId }})
    .then( foundItem => {
        foundItem.set({
            size: req.body.size,
            type: req.body.type,
            brand: req.body.brand,
            price: req.body.price,
        })
        foundItem.save()
        console.log(`item edited ${JSON.stringify(foundItem)}`)
    })
    .then(res.redirect(`/items/${req.params.itemId}`))
    .catch(error => {
        console.log(error)
    })
})

//render individual item
//TO DO: add edit button visible only to the item's creator
router.get('/:itemId', isLoggedIn, (req, res) => {
    db.item.findByPk(req.params.itemId)
    .then(foundItem => { 
        console.log('req.user.id:', req.user.id)
        res.render('items/item', {item: foundItem, user: req.user})
    })
    .catch(error => {
        console.log(error)
    })
})

//delete item
router.delete('/:itemId', isLoggedIn, (req,res) => {
    db.item.findOne({where: {id: req.params.itemId }})
    .then( foundItem => {
        foundItem.destroy()
        console.log(req.params.itemId, "th item destroyed")
    })
    .then(res.redirect(`/user/${req.user.name}`))
    .catch(error => {
        console.log(error)
    })
})


module.exports = router
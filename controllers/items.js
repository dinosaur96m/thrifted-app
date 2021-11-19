const express = require('express')
const app = express()
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require('../models')
const router = express.Router()
//require and config cloudinary
const cloudinary = require('cloudinary')
cloudinary.config(process.env.CLOUDINARY_URL)

//require multer
const multer = require('multer');
const upload = multer({ dest: './uploads/' });


//middleware
app.use(express.json())


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

//post to uploads with multer?
// router.post('/', upload.single('myFile'), function (req, res) {
//     res.send(req.file)
//     // console.log(`req.body: ${JSON.stringify(req.body)}`)


// })


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

router.put


//render individual item
//TO DO: add edit button visible only to the item's creator
router.get('/:itemId', (req, res) => {
    db.item.findByPk(req.params.itemId)
    .then(foundItem => { 
        res.render('items/item', {item: foundItem})
    })
})


module.exports = router
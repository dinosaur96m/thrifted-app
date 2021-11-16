const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const cloudinary = require('cloudinary').v2
const db = require('../models')

router.get('/', (req, res) => {
    res.send('here you can browse all available items')
})

// router.post('/', (req, res) => {
    // //API, cloudinary
// cloudinary.config({ 
//     cloud_name: 'dunp6efgl', 
//     api_key: process.env.API_KEY, 
//     api_secret: process.env.API_SECRET,
//     secure: true
//   });

// // Node.js SDK Uploader function returns a Promise
// cloudinary.uploader
//   .upload('./testImages/90sJPEG.jpg', {
//   //image is the default resour4ce type if you don't specify
//   resource_type: 'image',

// })
// .then((result) => {
//     //JSON.stringify will provide a formatted string
//     //1st param is the value to be output
//     //2nd param null is a function that can be applied to the output 
//     //3rd param is the number of space characters to use for whitespeace in formatting the output
//     console.log("success", JSON.stringify(result, null, 2))
// })
// .catch((error) => {
//     console.log('error', JSON.stringify(result, null, 2))
// })

// //Create new ITEM in the DB
// db.item.create({
//     size: '16',
//     type: 'blouse',
//     brand: 'SAGHARBOR',
//     price: 15.05,
//     imgUrl: 'http://res.cloudinary.com/dunp6efgl/image/upload/v1636876000/rt0hjmmohww4pdw75lyr.jpg',
//     available: true,
//     userId: 1,
//     cartId: 1,
//     storeId: 1,
// })
// .then(createdUser => {
//     console.log(createdUser);
//     process.exit()
// })
// })

router.get('/new', (req, res) => {
    res.render('items/new')
})

router.get('/:itemId', (req, res) => {
    db.item.findByPk(1)
    .then(foundItem => { 
    console.log(`foundItem.imgUrl: ${foundItem.imgUrl} foundItem.type: ${foundItem.type}`)
        const imgUrl = foundItem.imgUrl
        const  type = foundItem.type
        res.render('items/item', {imgUrl, type})
    })
})

router.get('/edit/:itemId', isLoggedIn, (req, res) => {
    res.send(`here is a form for editing the ${req.params.itemId}th item in the db, created by curretnly loggind in user`)
    //if NO ONE is logged in, isLoggedIn redirects to home route
    //add redirect if the item's creator is not logged in
        //check express-session docs for how to access the currently logged in user
})


module.exports = router
require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const cloudinary = require('cloudinary').v2
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const db = require('./models')



// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body parser middelware
app.use(express.urlencoded({extended:false}))

// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))
app.use('/user', require('./controllers/user') )
app.use('/items', require('./controllers/items') )

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


// home route
app.get('/', (req, res)=>{
    res.render('home')
})

// // profile route
// app.get('/profile', isLoggedIn, (req, res)=>{
//     res.render('profile')
// })


app.listen(3000, ()=>{
    console.log("auth_practice running on port 3000")
})
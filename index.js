require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const axios = require('axios')

//require multer
const multer = require('multer');
const upload = multer({ dest: './uploads/' });


//from cloudinary docs
// const cloudinary = require('./config/cloudConfig')\
const cloudinary = require('cloudinary')
// Configure your cloud name, API key and API secret:
cloudinary.config(process.env.CLOUDINARY_URL)

const signUploadFormRouter = require('./controllers/signUploadForm')
const createError = require('http-errors')
const path = require('path')
//^^from cloudinary docs

const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const db = require('./models')

//upload signing API


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

////////////////////////////
//////cloudinary docs middleware////////////////// 
/////////////////////////////
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
// //upload sigining API
app.use('/controllers/signUploadForm', signUploadFormRouter)
// //static files
app.use(express.static('public'))

//catch 404 and forward to error handler 
// app.use(function (req, res, next) {
//     next(createError(404))
// })
// // //error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}
//     // render the error page
//     res.status(err.status || 500)
//     // res.render('error')
////^^the above error code is from cloudinary docs but stalls out my app and breaks it
////////////////////////////////////////////
/////////////////////////////

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


// home route
app.get('/', (req, res)=>{
    res.render('home')
})

// profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

app.post('/photo', upload.single('myFile'), function(req, res) {
    cloudinary.uploader.upload(req.file.path, function(result) {
      console.log(result)
      res.send(result);
    });
  });
  


app.listen(3000, ()=>{
    console.log(" running on port 3000")
})
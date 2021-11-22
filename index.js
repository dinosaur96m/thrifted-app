require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const axios = require('axios')
//method override
const methodOverride = require('method-override');

const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const db = require('./models')
const { options } = require('./controllers/user')


//method override
app.use(methodOverride('_method'));

// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)
//css
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

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


// home route
app.get('/', (req, res)=>{
    res.render('auth/login')
})

// profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})


  


app.listen(process.env.PORT || 3000, ()=>{
    console.log(" running on port 3000")
})
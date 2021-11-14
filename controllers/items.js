const express = require('express')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()
const db = require('../models')

router.get('/', (req, res) => {
    res.send('here you can browse all available items')
})

router.get('/new', (req, res) => {
    res.send('here is a form for creating new iterms')
})

router.get('/:itemId', (req, res) => {
    res.send(`here are the deets on the ${req.params.itemId}th item in the db`)
})

router.get('/edit/:itemId', isLoggedIn, (req, res) => {
    res.send(`here is a form for editing the ${req.params.itemId}th item in the db, created by curretnly loggind in user`)
    //if NO ONE is logged in, isLoggedIn redirects to home route
    //add redirect if the item's creator is not logged in
        //check express-session docs for how to access the currently logged in user
})


module.exports = router
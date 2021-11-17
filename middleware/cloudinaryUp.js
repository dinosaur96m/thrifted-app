const cloudinary = require('cloudinary').v2

//API, cloudinary
cloudinary.config({ 
    cloud_name: 'dunp6efgl', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});

module.exports = (req, res, url, next) => {

    // if (!req.user) {
    //     req.flash('error', 'You must be logged in to access that page.')
    //     res.redirect('/auth/login')
    // } else {
    //     next()
    // }
    console.log(req.body)
    // Node.js SDK Uploader function returns a Promise
    cloudinary.uploader
    .upload(req.body.route, {
    //image is the default resour4ce type if you don't specify
    resource_type: 'image',
    })
    .then((result) => {
        //JSON.stringify will provide a formatted string
        //1st param is the value to be output
        //2nd param null is a function that can be applied to the output 
        //3rd param is the number of space characters to use for whitespeace in formatting the output
        console.log("success", JSON.stringify(result, null, 2))
        url = JSON.stringify.result.url
           //Create new ITEM in the DB
        db.item.create({
            size: req.body.size,
            type: req.body.type,
            brand: req.body.brand,
            price: req.body.price,
            imgUrl: 'test test, url not from cloudinary',
            //SequelizeValidationError: string violation: imgUrl cannot be an array or an object
            available: true,
            userId: 1,
            cartId: null,
        })
        .then(createdItem => {
            console.log(`new item added: ${JSON.stringify(createdItem)}`)
        })
    })
    .catch((error) => {
        console.log('error', JSON.stringify(result, null, 2))
    })
    // res.send(url)
    next()
}
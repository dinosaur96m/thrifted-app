const cloudinary = require('cloudinary').v2;

// Configure your cloud name, API key and API secret:

const myconfig = cloudinary.config({ 
    cloud_name: 'dunp6efgl', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
})

exports.myconfig = myconfig;
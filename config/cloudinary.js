require("dotenv").config();
const Cloudinary = require("cloudinary");

Cloudinary.config({ 
    "cloud_name": "sensaison", 
    "api_key": process.env.CLOUDINARY_APIKEY, 
    "api_secret": process.env.CLOUDINARY_SECRET 
});

module.exports = cloudinary;
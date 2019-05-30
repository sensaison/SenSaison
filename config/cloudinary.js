require("dotenv").config();
const Cloudinary = require("cloudinary").v2;

const cloudinary = Cloudinary.config({ 
	"cloud_name": process.env.CLOUDINARY_CLOUD, 
	"api_key": process.env.CLOUDINARY_APIKEY, 
	"api_secret": process.env.CLOUDINARY_SECRET 
});

module.exports = cloudinary;
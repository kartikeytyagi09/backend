// this file is just use to connect route paths with desired function which will be performed on the specific route;


const express = require("express");
const { generateShortUrl } = require("../controller/url");

const router = express.Router(); 

// generateShortUrl is the function which will be performed
router.post("/", generateShortUrl);

module.exports = router; 

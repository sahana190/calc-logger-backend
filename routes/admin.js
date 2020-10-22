const express = require('express');
const path = require('path');
const route = express.Router();
const rootDir = require('../util/path');

route.get('/',(req,res) => {
    console.log(rootDir);
    res.sendFile(path.join(rootDir,'views','admin.html'));
});

route.post('/addProduct',(req,res) => {
    const body = req.body;
    console.log(JSON.stringify(body));
    res.send('<h1>Add Product</h1>');
});

module.exports = route;
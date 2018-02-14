
const express = require("express");
const path = require('path');

const appPath = path.join(__dirname,'/app');
console.log('path :',appPath);
const app = express();
const port = process.env.PORT || 9999;

app.use(express.static(appPath));

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})
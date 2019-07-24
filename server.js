const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const _=require("lodash");

let mongoose = require("mongoose");



mongoose.connect(
    'mongodb://localhost:27017/example',
    { useNewUrlParser: true }
).then(
    () => { console.log("success") },
    (err) => { /* handle errors */ }

);



//username
const name = require("./routes/name.js");
//message
const message = require("./routes/message.js");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/name", name);
app.use("/message", message);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
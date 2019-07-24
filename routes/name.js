const express = require("express");
const router = express.Router();
const _=require("lodash");
const User = require("../schema")
let myArray = [];

router.get("/all", (req, res) => {
  const errors = {};
  User.find()
    .then(User => {
      if (!User) {
        errors.noItems = "There are no items";
        res.status(404).json(errors);
      }
      res.json(User);
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});


router.post("/array", (req, res) => {
    let newItem = {
        "username": req.body.username,
        "content": req.body.content
    }
    myArray.push(newItem);
    res.send(myArray);
});

router.get("/getNames", (req, res) => { 
    res.send(myArray);
});

router.put("/update", (req,res) =>{
    let newItem = {
        "username": req.body.username,
        "content": req.body.content
    }
    let index = req.body.index;
    _.set(myArray, index, newItem);
    res.send(myArray)
});

router.delete("/delete", (req,res) =>{
    let index = req.body.index;
    _.pullAt(myArray, index);
    res.send(myArray)
});

module.exports = router;
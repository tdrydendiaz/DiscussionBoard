const express = require("express");
const router = express.Router();
const _=require("lodash");
const User = require("../models/schema")
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

// router.get("/username", (req, res) => {
//   const errors = {};
//   User.find({username:req.body.username})
//     .then(User => {
//       if (!User) {
//         errors.noItems = "There are no items";
//         res.status(404).json(errors);
//       }
//       res.json(items);
//     })
//     .catch(err => res.status(404).json({ noItems: "There are no items" }));
// });



// router.post("/adduser", (req, res) => {

//     const newU = new User({
//         username: req.body.username,
//         context: req.body.context
// });
//   const errors = {}; 
//   newU.save()
//         .then(()=> {
//             res.json(newU);
//              console.log('complete')
//         })
// });

router.post("/create", (req, res) =>{
    const item = new User({
        name: req.body.username,
        context: req.body.context
    })
    item.save()
        .then(()=> {
            res.json(item);
             console.log('complete')
        })
        .catch(err => res.status(404).json(err));
});

router.put("/updatename", (req, res) => {
  User.replaceOne({'name': req.body.username},
{ 'name': req.body.username, "context": req.body.context})
  .then(({ ok, n }) => {
              res.json(n)
    })
        .catch(err => res.status(404).json(err));
    })


router.delete("/delete", (req, res) => {

  User.deleteOne({'name': req.body.username})
  .then(({ ok, n }) => {
              res.json(username)
    })
        .catch(err => res.status(404).json(err))

    })

// router.delete("/deleteuser", (req, res) => {
//   const errors = {};
//   User.deleteOne({username:req.body.username})
//     .then(User => {
//       if (!User) {
//         errors.noItems = "There are no items";
//         res.status(404).json(errors);
//       }
//       res.json(items);
//     })
//     .catch(err => res.status(404).json({ noItems: "There are no items" }));
// });




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
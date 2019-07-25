const mongoose = require("mongoose");

var Schema=mongoose.Schema;

var userSchema = new Schema({
    name: {
        type:String,
        required: true,
        minlength:3
    },
    context: {
    type: String,
    required:false,
    minlength:4
    }
});

// var User = mongoose.model(
//     'User',
//     userSchema
// );
let User = mongoose.model('User', userSchema);

module.exports=User;
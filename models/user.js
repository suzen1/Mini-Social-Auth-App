// models/user.js
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/miniprojact");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'post' 
  }],
});

module.exports = mongoose.model('user', userSchema);

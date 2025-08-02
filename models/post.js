const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
 contant: String,
 like:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  }],

 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user' 
}
});

module.exports = mongoose.model('post', postSchema);

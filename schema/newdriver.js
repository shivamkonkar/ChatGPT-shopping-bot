const mongoose = require('mongoose')

const newDriverSchema = new mongoose.Schema({
  NewDriverName: mongoose.Types.ObjectId,
  NewDriverEmail: String,
  NewDriverPhoneNumber: Number
})

module.exports= mongoose.model("newdriver", newDriverSchema)
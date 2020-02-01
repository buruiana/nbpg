const mongoose = require('mongoose')

const CollectionSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  searchFields: { type: String, required: false },
  jfSchema: { type: String, required: false },
  jfUiSchema: { type: String, required: false },
  data: { type: Array, required: false }
})

module.exports = mongoose.model('Collection', CollectionSchema)


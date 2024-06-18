const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  steps: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Recipe', recipeSchema)
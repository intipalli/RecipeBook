const Recipe = require('../models/recipeModel')
const mongoose = require('mongoose')

// get all recipes
const getRecipes = async (req, res) => {
  const user_id = req.user._id

  const recipes = await Recipe.find({user_id}).sort({createdAt: -1})

  res.status(200).json(recipes)
}

// get a single recipe
const getRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such recipe'})
  }

  const recipe = await Recipe.findById(id)

  if (!recipe) {
    return res.status(404).json({error: 'No such recipe'})
  }
  
  res.status(200).json(recipe)
}


// create new recipe
const createRecipe = async (req, res) => {
  const {title, ingredients, steps} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!ingredients) {
    emptyFields.push('load')
  }
  if(!steps) {
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const recipe = await Recipe.create({title, ingredients, steps, user_id})
    res.status(200).json(recipe)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such recipe'})
  }

  const recipe = await Recipe.findOneAndDelete({_id: id})

  if (!recipe) {
    return res.status(400).json({error: 'No such recipe'})
  }

  res.status(200).json(recipe)
}

// update a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such recipe'})
  }

  const recipe = await Recipe.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!recipe) {
    return res.status(400).json({error: 'No such recipe'})
  }

  res.status(200).json(recipe)
}


module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe
}
const express = require('express');

const router = express.Router();

const ingredient = require('../controllers/ingredient');

router.get('/', ingredient.getAllIngredients);

router.post('/', ingredient.storeIngredient);

router.delete('/:id', ingredient.deleteIngredient);

router.put('/:id', ingredient.updateIngredient);

module.exports = router
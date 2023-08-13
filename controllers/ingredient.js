const { Ingredient } = require('../models');

exports.getAllIngredients = async (req, res, next) => {
    const { language } = req.query;
    try {
        const ingredients = await Ingredient.findAll({
            attributes: [
                'id',
                [`name_${language}`, 'name'],
                'createdAt',
                'updatedAt',
            ]
        });
        return res.status(200).json(ingredients);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeIngredient = async (req, res, next) => {
    const { name_ar, name_en, name_dw } = req.body;
    try {
        const ingredient = await Ingredient.create({
            name_ar: name_ar,
            name_en: name_en,
            name_dw: name_dw
        });
        return res.status(200).json(ingredient);
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.deleteIngredient = async (req, res, next) => {
    let { id } = req.params;
    try {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            return res.status(403).json({ massage: 'ingredient not found' });
        }
        ingredient.destroy();
        return res.status(200).json({ massage: 'ingredient deleted sucessfully' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateIngredient = async (req, res, next) => {
    let { id } = req.params;
    let { name_ar, name_en, name_dw } = req.body;
    try {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            return res.status(403).json({ massage: 'ingredient not found' });
        }
        ingredient.name_ar = name_ar;
        ingredient.name_en = name_en;
        ingredient.name_dw = name_dw;
        ingredient.save();
        return res.status(200).json({ massage: 'ingredient updated sucessfully' });
    } catch (error) {
        return res.status(500).json(error);
    }
};
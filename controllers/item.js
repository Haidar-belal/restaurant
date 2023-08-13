const { Item, Photo, Ingredient, Tag, sequelize, ItemTag, ItemIngredient } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');

exports.storeItem = async (req, res, next) => {
    const { itemTags, name_ar, name_en, name_dw, details_ar, details_en, details_dw, cost, itemIngredients, category_id } = req.body;
    try {
        const item = await Item.create({
            name_ar: name_ar,
            name_en: name_en,
            name_dw: name_dw,
            details_ar: details_ar,
            details_en: details_en,
            details_dw: details_dw,
            cost: cost,
            category_id: category_id
        });
        if (itemTags) {
            const tags = await Tag.findAll({
                where: {
                    id: {
                        [Op.in]: itemTags
                    }
                }
            });
            const addedTags = await item.addTags(tags);
        }
        if (itemIngredients) {
            const ingredients = await Ingredient.findAll({
                where: {
                    id: {
                        [Op.in]: itemIngredients
                    }
                }
            });
            const addedIngredients = await item.addIngredients(ingredients);
        }
        if (itemTags) {
            const tags = await Tag.findAll({
                where: {
                    id: {
                        [Op.in]: itemTags
                    }
                }
            });
            const addedTags = await item.addTags(tags);
        }
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                // console.log(req.files[i]);
                await Photo.create({
                    image: req.files[i].path,
                    item_id: item.id
                });
            }
        }
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.deleteItem = async (req, res, next) => {
    let { id } = req.params;
    try {
        const item = await Item.findByPk(id, { include: [{ model: Photo }] });
        if (!item) {
            return res.status(403).json({ massage: 'item not found' });
        }
        for (let index = 0; index < item.Photos.length; index++) {
            fs.unlinkSync(item.Photos[index].image)
        }
        item.destroy();
        return res.status(200).json({ message: 'item deleted successfully' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateItemWithoutImage = async (req, res, next) => {
    let { id } = req.params;
    let { itemTags, name_ar, name_en, name_dw, details_ar, details_en, details_dw, cost, active, itemIngredients, category_id } = req.body;
    try {
        const item = await Item.findByPk(id);
        if (!item) {
            return res.status(403).json({ massage: 'item not found' });
        }
        item.name_ar = name_ar;
        item.name_en = name_en;
        item.name_dw = name_dw;
        item.cost = cost;
        item.details_ar = details_ar;
        item.details_en = details_en;
        item.details_dw = details_dw;
        item.category_id = category_id;
        await item.save();
        await ItemTag.destroy({
            where: {
                item_id: item.id,
            }
        });
        const tags = await Tag.findAll({
            where: {
                id: {
                    [Op.in]: itemTags
                }
            }
        });
        const addedTags = await item.addTags(tags);
        await ItemIngredient.destroy({
            where: {
                item_id: item.id,
            }
        });
        const ingredients = await Ingredient.findAll({
            where: {
                id: {
                    [Op.in]: itemIngredients
                }
            }
        });
        const addedIngredients = await item.addIngredients(ingredients);
        return res.status(200).json({ massage: 'item updated sucessfully' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getActiveItem = async (req, res, next) => {
    const { language } = req.query;
    try {
        const items = await Item.findAll({
            attributes: [
                'id',
                [`name_${language}`, 'name'],
                [`details_${language}`, 'details'],
                'category_id',
                'cost',
                'createdAt',
                'updatedAt',
            ],
            where: {
                active: true,
            }
        });
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateToActive = async (req, res, next) => {
    const { ids } = req.body
    try {
        const oldItems = await Item.update({
            active: false
        }, {
            where: {}
        });
        const NewItems = await Item.update({
            active: true
        }, {
            where: {
                id: ids
            }
        })
        return res.status(200).json({ message: "items updated successfully" });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateTopShow = async (req, res, next) => {
    const { ids } = req.body
    try {
        const NewItems = await Item.update({
            active: sequelize.literal('NOT active')
        }, {
            where: {
                id: ids
            }
        })
        return res.status(200).json({ message: "items updated successfully" });
    } catch (error) {
        return res.status(500).json(error);
    }
};


exports.getAllItems = async (req, res, next) => {
    const { language } = req.query;
    try {
        const items = await Item.findAll({
            attributes: [
                'id',
                [`name_${language}`, 'name'],
                [`details_${language}`, 'name'],
                'category_id',
                'cost',
                'createdAt',
                'updatedAt',
            ],
        });
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getitemById = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
        const item = await Item.findOne({
            where: {
                id: id
            },
            include: {
                model: Photo
            }
        });
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.deleteImage = async (req, res, next) => {
    const { id } = req.params;
    try {
        const photo = await Photo.findOne({
            where: {
                id: id
            }
        });
        fs.unlinkSync(photo.image);
        await photo.destroy();
        return res.status(200).json({ massage: "photo deleted successfully" })
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeImages = async (req, res, next) => {
    const { item_id } = req.body;
    try {
        for (let i = 0; i < req.files.length; i++) {
            await Photo.create({
                image: req.files[i].path,
                item_id: item_id
            });
        }
        return res.status(200).json({ massage: "photo added successfully" })
    } catch (error) {
        return res.status(500).json(error);
    }
};
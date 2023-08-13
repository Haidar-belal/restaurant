const { Tag } = require('../models');

exports.storeTag = async (req, res, next) => {
    const { name_ar, name_en, name_dw } = req.body;
    try {
        const tag = await Tag.create({
            name_ar: name_ar,
            name_en: name_en,
            name_dw: name_dw,
        });
        return res.status(200).json(tag);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllTags = async (req, res, next) => {
    const { language } = req.query;
    try {
        const tag = await Tag.findAll({
            attributes: [
                'id',
                [`name_${language}`, 'name'],
                'createdAt',
                'updatedAt',
            ]
        });
        return res.status(200).json(tag);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.deleteTag = async (req, res, next) => {
    let { id } = req.params;
    try {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(403).json({ massage: 'tag not found' });
        }
        tag.destroy();
        return res.status(200).json({ massage: 'tag deleted sucessfully' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateTag = async (req, res, next) => {
    let { id } = req.params;
    let { name_ar, name_en, name_dw } = req.body;
    try {
        const tag = await Tag.findByPk(id);
        if (!tag) {
            return res.status(403).json({ massage: 'tag not found' });
        }
        tag.name_ar = name_ar;
        tag.name_en = name_en;
        tag.name_dw = name_dw;
        tag.save();
        return res.status(200).json({ massage: 'tag updated sucessfully' });
    } catch (error) {
        return res.status(500).json(error);
    }
};
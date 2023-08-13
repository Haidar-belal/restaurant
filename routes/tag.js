const express = require('express');

const router = express.Router();

const tag = require('../controllers/tag');

router.post('/', tag.storeTag);

router.get('/', tag.getAllTags);

router.delete('/:id', tag.deleteTag);

router.put('/:id', tag.updateTag);

module.exports = router

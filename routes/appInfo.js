const express = require('express');

const router = express.Router();

const { getTitle,setTitle } = require('../controllers/appInfo');


router.get('/title', getTitle);
router.post('/title/set',setTitle );

module.exports = router;
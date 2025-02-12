const express = require('express');
const { createCategory, deleteCategory, getAllCategories } = require('../controller/category');
const router = express.Router();


router.post('/create', createCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/all', getAllCategories);
module.exports = router;

const express = require('express');

const router = express.Router();

router.get('/',authMiddleware,()=>{})
router.post('/',authMiddleware,()=>{})
router.put('/:id',authMiddleware,()=>{})
router.delete('/:id',authMiddleware,()=>{})

module.exports = router
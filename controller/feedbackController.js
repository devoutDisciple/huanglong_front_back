const express = require('express');

const router = express.Router();
const feebackService = require('../services/feebackService');

// 圈子的意见反馈
router.post('/aboutCircle', (req, res) => {
	feebackService.aboutCircle(req, res);
});

module.exports = router;

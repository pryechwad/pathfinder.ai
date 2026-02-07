const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const { authenticate } = require('../middleware/auth');

router.get('/stats', authenticate, referralController.getReferralStats);
router.post('/apply', referralController.applyReferralCode);
router.post('/complete', referralController.completeReferral);
router.get('/points-history', authenticate, referralController.getPointsHistory);
router.post('/redeem', authenticate, referralController.redeemPoints);

module.exports = router;

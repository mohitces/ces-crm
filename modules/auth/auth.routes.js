const express = require('express');
const authController = require('./auth.controller');
const validate = require('../../middlewares/validate');
const { loginSchema } = require('./auth.validation');
const requireAuth = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', validate(loginSchema), authController.login);
router.get('/me', requireAuth, authController.me);

module.exports = router;

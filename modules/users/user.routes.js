const express = require('express');
const userController = require('./user.controller');
const upload = require('./user.upload');
const validate = require('../../middlewares/validate');
const requireAuth = require('../../middlewares/auth');
const { requireRole } = require('../../middlewares/roles');
const {
  userIdParamsSchema,
  createUserSchema,
  updateUserSchema,
} = require('./user.validation');

const router = express.Router();

router.get('/', requireAuth, requireRole('admin'), userController.getUsers);
router.get(
  '/:id',
  requireAuth,
  requireRole('admin'),
  validate(userIdParamsSchema, 'params'),
  userController.getUserById
);
router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  validate(createUserSchema),
  userController.createUser
);
router.post(
  '/upload',
  requireAuth,
  requireRole('admin'),
  upload.single('profileImage'),
  userController.uploadProfileImage
);
router.put(
  '/:id',
  requireAuth,
  requireRole('admin'),
  validate(userIdParamsSchema, 'params'),
  validate(updateUserSchema),
  userController.updateUser
);
router.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  validate(userIdParamsSchema, 'params'),
  userController.deleteUser
);

module.exports = router;

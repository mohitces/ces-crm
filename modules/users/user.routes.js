const express = require('express');
const userController = require('./user.controller');
const upload = require('./user.upload');
const validate = require('../../middlewares/validate');
const {
  userIdParamsSchema,
  createUserSchema,
  updateUserSchema,
} = require('./user.validation');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', validate(userIdParamsSchema, 'params'), userController.getUserById);
router.post('/', validate(createUserSchema), userController.createUser);
router.post('/upload', upload.single('profileImage'), userController.uploadProfileImage);
router.put('/:id', validate(userIdParamsSchema, 'params'), validate(updateUserSchema), userController.updateUser);
router.delete('/:id', validate(userIdParamsSchema, 'params'), userController.deleteUser);

module.exports = router;

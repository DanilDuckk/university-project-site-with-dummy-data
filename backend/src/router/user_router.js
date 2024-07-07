// Imports
import express from 'express';
import * as user_controller from '../contollers/user-controller.js'

//
const router = express.Router();

router.get('/', user_controller.getAllUsers)

router.get('/:id', user_controller.findUserById)

router.post('/register', user_controller.registerUser)

router.post('/login', user_controller.logInUser)

router.delete('/:id', user_controller.deleteUser)

export default router;
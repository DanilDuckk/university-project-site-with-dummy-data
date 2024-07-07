// Imports
import express from 'express';
import * as duck_controller from '../contollers/duck-controller.js'

//
const router = express.Router();

router.get('/', duck_controller.getAllDucks)

router.get('/clicked/:id', duck_controller.getClickedDuck)

router.patch('/:id', duck_controller.updateLikes)

router.delete('/:id', duck_controller.deleteDuck)

router.post('/', duck_controller.addDuck)

export default router;
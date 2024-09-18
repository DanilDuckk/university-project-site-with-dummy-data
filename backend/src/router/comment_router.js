// Imports
import express from 'express';
import * as comment_controller from '../contollers/comment-controller.js'

const router = express.Router();

router.get('/', comment_controller.getAllComments)

router.get('/:id', comment_controller.findCommentById)

router.get('/duck/:id', comment_controller.findDuckComments)

router.post('/', comment_controller.postComment)

export default router;
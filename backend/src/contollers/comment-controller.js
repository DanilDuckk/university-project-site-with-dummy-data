// Imports
import db from "../../dbSetup/setup.js"
import {userSessionID} from "./user-controller.js";
import statusCodes from "http-status-codes";

export function getAllComments(req, res){
    const query = `
        SELECT *
        FROM comment
    `;
    const result = db.prepare(query).all();

    res.status(statusCodes.OK).json(result);
}

export function findCommentById(req, res) {
    const commentId = parseInt(req.params.id, 10);
    const query = "SELECT * FROM comment WHERE id = ?";
    const statement = db.prepare(query);
    const result = statement.get(commentId);

    if (result) {
        res.status(statusCodes.OK).json(result);
    } else {
        res.status(statusCodes.NOT_FOUND).json({ error: 'Comment not found' });
    }
}

export function findDuckComments(req, res) {
    const duckId = parseInt(req.params.id, 10);
    const query = `
        SELECT comment.id, comment.content, user.username AS creator
        FROM comment
        JOIN user ON comment.user_id = user.id
        WHERE comment.duck_id = ?
    `;
    const statement = db.prepare(query);
    const results = statement.all(duckId);

    res.status(statusCodes.OK).json(results);
}

export function postComment(req, res) {
    const { duck_id, content } = req.body;
    const userId = userSessionID;
    if (!userId) {
        return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Unauthorized, wrong session' });
    }
    const query = 'INSERT INTO comment (content, user_id, duck_id) VALUES (?, ?, ?)';
    const stmt = db.prepare(query);
    stmt.run(content, userId, duck_id);
    res.status(statusCodes.CREATED).json({ message: 'Comment added successfully' });
}
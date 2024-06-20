// Imports
import statusCodes from "http-status-codes";
import db from "../../dbSetup/setup.js"
import {userSessionID} from "./user-controller.js";

export function getAllDucks(req, res){
    const query = `
        SELECT duck.id, duck.image_url, duck.name, duck.likes, user.username AS creator
        FROM duck
        JOIN user ON duck.user_id = user.id
    `;
    const result = db.prepare(query).all();

    res.status(statusCodes.OK).json(result);
}

export function getClickedDuck(req, res){
    const duckId = parseInt(req.params.id, 10);
    const query = `
        SELECT duck.id, duck.image_url, duck.name, duck.likes, user.username AS creator
        FROM duck
                 JOIN user ON duck.user_id = user.id
        WHERE duck.id = ?
    `;
    const statement = db.prepare(query);
    const result = statement.get(duckId);

    if (result) {
        res.status(statusCodes.OK).json(result);
    } else {
        res.status(statusCodes.NOT_FOUND).json({ error: 'Duck not found' });
    }
}

export function updateLikes(req, res){
    const { id } = req.params;
    const { likes } = req.body;

    try {
        const stmt = db.prepare('UPDATE duck SET likes = ? WHERE id = ?');
        const result = stmt.run(likes, id);

        if (result.changes === 0) {
            res.status(404).json({ error: 'Duck not found' });
        } else {
            res.json({ message: 'Likes updated successfully' });
        }
    } catch (error) {
        console.error('Error updating duck likes:', error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

export function deleteDuck(req, res){
    const { id } = req.params;

    try {
        const stmt1 = db.prepare('DELETE FROM duck WHERE id = ?');
        const stmt2 = db.prepare('DELETE FROM comment WHERE duck_id = ?');
        stmt2.run(id);
        const result = stmt1.run(id);

        if (result.changes === 0) {
            res.status(statusCodes.NOT_FOUND).json({ error: 'Duck not found' });
        } else {
            res.json({ message: 'Duck deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting duck:', error);
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

export function addDuck(req, res) {
    const { image_url, name } = req.body;
    const userId = userSessionID;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized, wrong session' });
    }
    const query = 'INSERT INTO duck (image_url, name, user_id) VALUES (?, ?, ?)';
    const stmt = db.prepare(query);
    stmt.run(image_url, name, userId);
    res.status(statusCodes.CREATED).json({ message: 'Duck added successfully' });
}
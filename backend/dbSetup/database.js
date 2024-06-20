import Database from "better-sqlite3"
import db from "./setup.js"


export function getAllComments(){
    const query = "SELECT * FROM comment";
    const result = db.prepare(query).all();

    return result;
}

export function getCommentById(id){
    const query = "SELECT * FROM comment WHERE id = ?";
    const statement = db.prepare(query);
    const result = statement.get(id);

    return result;
}

export function getCommentsByDuckId(duckId) {
    const query = `
        SELECT comment.id, comment.content, user.username AS creator
        FROM comment
        JOIN user ON comment.user_id = user.id
        WHERE comment.duck_id = ?
    `;
    const statement = db.prepare(query);
    const results = statement.all(duckId);

    return results;
}

export function createUser (username, email, password) {
    const stmt = db.prepare('INSERT INTO user (username, email, password) VALUES (?, ?, ?)');
    const hashedPassword = bcrypt.hashSync(password, 10);
    stmt.run(username, email, hashedPassword);
}

export  function findUserByEmail (email) {
    const stmt = db.prepare('SELECT * FROM user WHERE email = ?');
    return stmt.get(email);
}

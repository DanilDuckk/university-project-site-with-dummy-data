// Imports
import bcrypt from 'bcrypt';
import db from "../../dbSetup/setup.js";

export function getAllUsers(req, res){
    const query = `
        SELECT *
        FROM user
    `;
    const result = db.prepare(query).all();

    res.json(result);
}

export async function registerUser(req, res) {
    const {email, username, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const insertUser = db.prepare('INSERT INTO user (email, username, password) VALUES (?, ?, ?)');
        insertUser.run(email, username, hashedPassword);
        res.json({message: 'User registered successfully'});
    } catch (error) {
        console.error(error);
        res.send('Error registering user');
    }
}

export async function logInUser(req, res) {
    const { email, password } = req.body;
    const query = 'SELECT * FROM user WHERE email = ?';
    const user = db.prepare(query).get(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.json({ message: 'Invalid email or password' });
    }
    console.log("Session created for "+user.id)
    res.json({ userId: user.id });
}

export function findUserById(req, res) {
    const userId = parseInt(req.params.id, 10);
    const query = "SELECT * FROM user WHERE id = ?";
    const statement = db.prepare(query);
    const result = statement.get(userId);

    if (result) {
        res.json(result);
    } else {
        res.json({ error: 'User not found' });
    }
}

export function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const stmt1 = db.prepare('DELETE FROM user WHERE id = ?');
        const stmt2 = db.prepare('DELETE FROM comment WHERE user_id = ?');
        const stmt3 = db.prepare('DELETE FROM duck WHERE user_id = ?');
        stmt2.run(id);
        stmt3.run(id);
        const result = stmt1.run(id);

        if (result.changes === 0) {
            res.json({ error: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.json({ error: 'Internal server error' });
    }
}
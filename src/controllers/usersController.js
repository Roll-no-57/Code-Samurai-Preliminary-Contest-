const pool = require('./pool');

// POST request to create a user
// URL = '/api/users/'
async function create_user(req, res, next) {
    const { user_id, user_name, balance } = req.body;

    try {
        const result = await pool.query('INSERT INTO users (user_id, user_name, balance) VALUES ($1, $2, $3) RETURNING *', [user_id, user_name, balance]);
        const user = result.rows[0];
        res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Error creating user: ' + err.message);
    }
}

module.exports = {
    create_user,
};
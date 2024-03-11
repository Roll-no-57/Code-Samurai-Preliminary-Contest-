const pool = require('./pool');

// URL = '/api/routes/'
async function index(req, res, next) {
    res.send("NOT IMPLEMENTED: Index or root route.")
}

module.exports = {
    index,
};

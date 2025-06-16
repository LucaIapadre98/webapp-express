const connection = require("../database/db");

const index = (rer, res) => {
    connection.query("SELECT * FROM movies", (err, results) => {
        if(err) throw err;
        res.json({
            movies: results,
        });
    });
};

module.exports ={ index};
const connection = require("../database/db");

const index = (rer, res) => {
    const moviesql = "SELECT * FROM movies";

    connection.query(moviesql, (err, results) => {
        if(err) return res.ststus(500).json({messagge: "Server error!"});

        res.json({
            movies: results,
        });
    });
};


const show = (req, res) => {
    const { id } = req.params;

    const moviesql = "SELECT * FROM movies WHERE id = ?";

    connection.query(moviesql,[id], (err, results) => {
        if(err) return res.ststus(500).json({messagge: "Server error!"});
        if (results.length === 0) return res.status(404).json ({messagge:"Not Found!"});
            
        res.json({
            movies: results[0],
        });
    });
};

module.exports = { index, show };
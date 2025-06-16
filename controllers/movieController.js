const connection = require("../database/db");

const index = (req, res) => {
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

    connection.query(moviesql, [id], (err, results) => {
        if(err) return res.ststus(500).json({messagge: "Server error!"});
        if (results.length === 0) return res.status(404).json ({messagge:"Not Found!"});
        
        const movie = results[0];
        const reviewsSql = 
        "SELECT * FROM reviews WHERE movie_id = ? " ;

        connection.query(reviewsSql, [id],(err, results) =>{
            if(err)  return res.status(500).json({messagge: "Server error!"});

            movie.reviews = results;
            res.json({
                movie: results,
            });
        })
    });
};

module.exports = { index, show };
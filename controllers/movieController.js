const connection = require("../database/db");
const movieImg = "http://localhost:3000/img/movies/";

const index = (req, res) => {
    const moviesql = "SELECT * FROM movies";

    connection.query(moviesql, (err, results) => {
        if(err) return res.ststus(500).json({messagge: "Server error!"});
        const movies = results.map((movie) => formDataMovie(movie))
        res.json({
            movies,
        });
       
    });
};

const show = (req, res) => {
    const { id } = req.params;
    const moviesql = "SELECT * FROM movies WHERE id = ?";

    connection.query(moviesql, [id], (err, results) => {
        if(err) return res.ststus(500).json({messagge: "Server error!"});
        if (results.length === 0) return res.status(404).json ({messagge:"Not Found!"});
        
        const movie = formDataMovie(results[0]);
        const reviewsSql = 
        "SELECT * FROM reviews WHERE movie_id = ? " ;

        connection.query(reviewsSql, [id],(err, results) =>{
            if(err)  return res.status(500).json({messagge: "Server error!"});

            movie.reviews = results;
            res.json({
                movie,
            });
        })
    });
};

const storeReview = (req, res) =>{
    const { id } = req.params;
    const { name, vote, text} = req.body;

    let errors = [];

    if(!vote || vote < 1 || vote >10){
        errors.push({
            messagge: " Il voto va tra 1 e 10",
        });
    }

    if(errors.length){
        return res.status(403).json({
            messagge: "Invalid",
            errors,
        });
    }

    const sqlStoreReview = `
    INSERT INTO movies.reviews
    ( movie_id, name, vote, text) 
    VALUES ( ?,?,?,?)`;

    const sqlStoreReviewValues = [
        id,
        name,
        vote,
        text,
    ];
    connection.query(sqlStoreReview, sqlStoreReviewValues, (err, results) =>{
        if(err)  return res.status(500).json({messagge:"Error server", err});
        console.log(results);
        
        res.status(201).json({
            messagge:"review added",
            id: results.insertId,
        })
    })

};

const formDataMovie = (movie) =>{
    if(movie.image){
        movie.image= movieImg + movie.image;
    }
    return movie;

};
module.exports = { index, show, storeReview };
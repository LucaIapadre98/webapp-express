function notFound (req, res, next){
    res.status(404).json({error: "Not Found!"})
};

function errorHandler (err, req, res, next){
    res.status(500).json({error: "Error server!"})
};



module.exports ={ notFound, errorHandler };
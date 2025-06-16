// IMPORT //
require("dotenv").config();
express = require("express");
const movieRouter = require("./routers/movieRouter");
const{ notFound, errorHandler }= require("./middlewares/notFound");
const connection = require("./database/db")


// CONFIG //    
app= express();
const { APP_URL, APP_PORT } = process.env;
const host = `${APP_URL}:${APP_PORT}`

app.use(express.static("public"));
app.use(express.json());

// ROUTER //
app.use("/movies", movieRouter);

//MIDDLWARE //
app.use(notFound);
app.use (errorHandler);


//LISTEN //
app.listen(APP_PORT, () => {
    console.log(`Server in ascolto su ${host}`);
    
})
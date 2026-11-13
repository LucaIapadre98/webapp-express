// IMPORT //
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const movieRouter = require("./routers/movieRouter");
const{ notFound, errorHandler } = require("./middlewares/notFound");
const connection = require("./database/db")


// CONFIG //    
app= express();

const { APP_URL, APP_PORT,FRONTEND_URL } = process.env;
const host = `${APP_URL}:${APP_PORT}`;
const corsConfig ={
    origin: FRONTEND_URL,
}

app.use(express.static("public"));
app.use(express.json());
app.use(cors(corsConfig));

// ROUTER //
app.use("/movies", movieRouter);
app.use("/:id", movieRouter);

//MIDDLWARE //
app.use(notFound);
app.use (errorHandler);


//LISTEN //
app.listen(APP_PORT, () => {
    console.log(`Server in ascolto su ${host}`);
    
})
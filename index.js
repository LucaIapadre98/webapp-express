// IMPORT //
require("dotenv").config();
express = require("express");
const{ notFound, errorHandler }= require("./middlewares/notFound");


// CONFIG //    
app= express();
const { APP_URL, APP_PORT } = process.env;
const host = `${APP_URL}:${APP_PORT}`

app.use(express.static("public"));
app.use(express.json());

// ROUTES //
app.get("/", (rer, res) => {
    res.json("Benvenuto in App!");
});
 //MIDDLWARE //
app.use(notFound);
app.use (errorHandler);

//LISTEN //
app.listen(APP_PORT, () => {
    console.log(`Server in ascolto su ${host}`);
    
})
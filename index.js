express = require("express"),
app= express();

app.get("/", (rer, res) => {
    res.json("Benvenuto in App!");
});

app.listen(3000, () => {
    console.log("Server in ascolto su http://localhost:3000");
    
})
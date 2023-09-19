const express = require('express');
const app = express();

app.get("/api", (req, res) => {
    res.json({
        "test": "123"
    })
});

app.listen(5000, () => {
    console.log("Server started")
});
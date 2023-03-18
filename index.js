import express from 'express'
const app = express();

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.listen(8000, () => {
    console.log("Running on port 8000.");
});

module.exports = app
const express = require('express')
const axios = require('axios')
const app = express();

app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

app.get('/', async (req, res) => {
    const response = await (await axios.get('https://api.kanye.rest/')).data
    res.send(`Kanye once said: ${response.quote}`);
});

app.get('/hola', async (req, res) => {
    const { nom, ape } = req.query;
    const names = Array.isArray(nom) ? nom : [nom];
    const surnames = Array.isArray(ape) ? ape : [ape];
    const greetings = names.map((name, index) => `Hola ${name} ${surnames[index]} <br>`);

    res.send(greetings.join(""));
});

app.get('/:name', async (req, res) => {
    try {
        const { name } = req.params
        const [ageData, nationalityData] = await Promise.all([
            axios.get(`https://api.agify.io?name=${name}`),
            axios.get(`https://api.nationalize.io?name=${name}`)
        ]);

        const { age } = ageData.data;
        const { country_id, probability } = nationalityData.data.country[0];

        res.send(`If you're named ${name}, you're probably ${age} years old. There's a ${(probability * 100).toFixed(2)}% chance 
        that you're from ${country_id}.`);

    } catch (error) {
        console.error(error);
        res.status(500).send('Oops! Something went wrong.');
    }
});

app.listen(8000, () => {
    console.log("Running on port 8000.");
});

module.exports = app
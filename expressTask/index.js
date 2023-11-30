const express = require('express');
const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'counter.json');
const counterData = JSON.parse(fs.readFileSync(pathToFile));

const app = express();

const port = '8181';

app.get('/', (req, res) => {

    counterData.counterMain = counterData.counterMain + 1;

    res.send(`<h1>Приветствую на домашней странице</h1><a href="/about">Перейти на страницу About</a>
    <p>Счетчик просмотров ${counterData.counterMain}</p>`);

    fs.writeFileSync(pathToFile, JSON.stringify(counterData, null, 2));

});

app.get('/about', (req, res) => {

    counterData.counterAbout = counterData.counterAbout + 1;

    res.send(`<h1>Приветствую на странице About</h1><a href="/">Перейти на домашнюю страницу</a>
    <p>Счетчик просмотров ${counterData.counterAbout}</p>`);

    fs.writeFileSync(pathToFile, JSON.stringify(counterData, null, 2));
});

app.listen(port);
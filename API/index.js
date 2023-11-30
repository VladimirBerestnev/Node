const express = require('express');
const joi = require('joi');
const app = express();
const fs = require('fs');
const path = require('path');
let usersData = [];
let uniqueID = 0;
const pathToFile = path.join(__dirname, 'users.json');

fs.access(pathToFile, function (error) {
    if (error) {
        console.log("Файл не найден");
    } else {
        console.log("Файл найден");
        usersData = JSON.parse(fs.readFileSync(pathToFile));
        uniqueID = usersData.length;
    }
});

const schemaJoi = joi.object({
    name: joi.string().min(2).required(),
    lastname: joi.string().min(2).required(),
    city: joi.string().min(2).max(1000).required(),
    age: joi.number().min(0).required()
})

const port = '8181';


app.use(express.json());

app.get('/users', (req, res) => {
    res.send(usersData);
});

app.get('/users/:id', (req, res) => {
    const userID = +req.params.id;
    const user = usersData.find(user => userID === user.id);
    if (user) {
        res.send({ user });
    }
})

app.post('/users', (req, res) => {

    const result = schemaJoi.validate(req.body);
    if (result.error) {
        return res.status(404).send({ error: result.error.details });
    }

    uniqueID += 1;

    usersData.push({
        id: uniqueID,
        ...req.body
    });

    fs.writeFileSync(pathToFile, JSON.stringify(usersData, null, 2));

    res.send({ id: uniqueID });
});


app.delete('/users/:id', (req, res) => {
    const userID = +req.params.id;
    const user = usersData.find(user => userID === user.id);
    if (user) {
        usersData.splice(usersData.indexOf(user), 1);
        res.status(200);
        res.send(user);
        fs.writeFileSync(pathToFile, JSON.stringify(usersData, null, 2));
    } else {
        res.status(404);
        res.send({ user: null });
    }
})

app.put('/users/:id', (req, res) => {
    const userID = +req.params.id;
    const user = usersData.find(user => userID === user.id);
    const result = schemaJoi.validate(req.body);

    if (result.error) {
        return res.status(404).send({ error: result.error.details });
    }

    if (user) {
        const { name, lastname, city, age } = req.body;
        user.name = name;
        user.lastname = lastname;
        user.city = city;
        user.age = age;
        res.send({ user });
        fs.writeFileSync(pathToFile, JSON.stringify(usersData, null, 2));
    } else {
        res.status(404);
        res.send({ user: null });
    }
})

app.listen(port);
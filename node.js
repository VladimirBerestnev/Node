// Со счетчиком разобрался. Не нужен тут никакой onload))
const http = require('http');

let counterMain = 0;
let counterAbout = 0;

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        counterMain = counterMain + 1;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Привет. Это главная страница</h1>');
        res.write(`<p>Счетчик просмотров: ${counterMain}</p>`);
        res.end('<a href="/about">Перейти на страницу About</a>');
    } else if (req.url === '/about') {
        counterAbout = counterAbout + 1;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Привет. Это страница About</h1>');
        res.write(`<p>Счетчик просмотров: ${counterAbout}</p>`);
        res.end('<a href="/">Вернуться на главную страницу</a>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Страница не найдена</h1>');
        res.end('<a href="/">Вернуться на главную страницу</a>');
    }
});

const port = '8181';

server.listen(port);

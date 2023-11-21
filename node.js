const http = require('http');

const server = http.createServer((req, res) => {
    let counter = 0;
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Привет. Это главная страница</h1>');
        res.end('<a href="/about">Перейти на страницу About</a>');
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Привет. Это страница About</h1>');
        res.end('<a href="/">Вернуться на главную страницу</a>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Страница не найдена</h1>');
        res.end('<a href="/">Вернуться на главную страницу</a>');
    }
});

const port = '8181';

server.listen(port);
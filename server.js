const http = require("http");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require("socket.io");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users'
});

connection.connect(err => {
    if (err) {
        console.error("Ошибка подключения к базе данных:", err.message);
    } else {
        console.log("Подключение к базе данных успешно.");
    }
});

// let port = 3000;
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Обработчик запроса на регистрацию
// app.post("/reg", (req, res) => {
//     console.log("Данные из запроса:", req.body);
//     const { email, login, name, password } = req.body;

//     // Проверяем, существует ли уже пользователь с таким email
//     const sql = "SELECT * FROM users WHERE email = ? OR name = ?";
//     connection.query(sql, [email, name], (err, results) => {
//         if (err) {
//             console.error("Ошибка выполнения запроса:", err.message);
//             res.status(500).json({ error: "Ошибка сервера: " + err.message });
//             return;
//         }

//         console.log("Результаты выборки:", results);
//         if (results.length > 0 && results[0].email === email) {
//             // Если пользователь с таким email уже существует
//             res.status(400).json({ error: "Пользователь с таким email уже существует." });
//             return;
//         }
    
//         // Затем проверяем name
//         if (results.length > 0 && results[0].name === name) {
//             // Если пользователь с таким name уже существует
//             res.status(400).json({ error: "Пользователь с таким name уже существует." });
//             return;
//         }

//         // Добавляем нового пользователя
//         const insertSql = "INSERT INTO users (email, login, name, password) VALUES (?, ?, ?, ?)";
//         connection.query(insertSql, [email, login, name, password], (err, result) => {
//             if (err) {
//                 console.error("Ошибка при INSERT:", err.message);
//                 res.status(500).json({ error: "Ошибка сервера: " + err.message });
//                 return;
//             }
//             console.log("Данные успешно добавлены в базу данных:", result);
//             res.status(201).json({ message: "Пользователь " + login + " успешно добавлен" });
//         });
//     });
// });


// app.post("/log", (req, res) => {
//     console.log("Полученные данные:", req.body);
//     const { email, password } = req.body;

//     if (!email || !password) {
//         res.status(400).json({ error: "Email and password are required." });
//         return;
//     }

//     const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
//     connection.query(sql, [email, password], (err, results) => {
//         if (err) {
//             console.error("Ошибка выполнения запроса:", err.message);
//             res.status(500).json({ error: "Ошибка сервера: " + err.message });
//             return;
//         }

//         console.log("Результаты выборки:", results);
//         if (results.length > 0) {
//             res.status(200).json({ message: "Успешный вход в систему!", user: results[0] });
//         } else {
//             res.status(401).json({ error: "Неверный email или пароль." });
//         }
//     });
// });

// Запуск сервера
// app.listen(port, () => {
//     console.log(`Сервер работает на http://localhost:${port}`);
// });

const chatHtmlFile = fs.readFileSync(path.join(__dirname, "static", "main.html"));
const styleCssFile = fs.readFileSync(path.join(__dirname, "static", "style.css"));
const scriptJsFile = fs.readFileSync(path.join(__dirname, "static", "script.js"));

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        switch (req.url) {
            case "/":
                res.writeHead(200, { "Content-Type": "text/html" });
                return res.end(chatHtmlFile);

            case "/style.css":
                res.writeHead(200, { "Content-Type": "text/css" });
                return res.end(styleCssFile);

            case "/script.js":
                res.writeHead(200, { "Content-Type": "application/javascript" });
                return res.end(scriptJsFile);

            default:
                res.writeHead(404, { "Content-Type": "text/plain" });
                return res.end("Error 404: Not Found");
        }
    }
});

server.listen(3000, () => {
    console.log("Сервер работает на http://localhost:3000/");
});

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("A user connected. Id - " + socket.id);

    socket.on("new_message", (message) => {
        io.emit("message", message);
    });
});


const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.raw());
const port = process.env.PORT || 9999;

// 創建一個寫入流，將日誌寫入 'access.log' 文件
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// 自定義 morgan 日誌格式
morgan.token('time', function (req) {
    return new Date().toISOString();  // 請求的時間戳
});

morgan.token('query', function (req) {
    return JSON.stringify(req.query);  // 查詢參數
});

morgan.token('body', function (req) {
    return JSON.stringify(req.body);  // 請求體
});

// 使用自定義格式記錄日誌
app.use(morgan(':time :method :url :query :body', { stream: accessLogStream }));


app.get('/', (req, res) => {
    res.send('Hello, World!~~~~~~~~~~~~~');
});

app.get('/time', (req, res) => {
    response = "2000" + "\r\n" + '2024/12/31 10:00:05' + "\r\n" + '2024/12/31 10:00:05'
    res.status(200).send(response);
});

app.post('/time', (req, res) => {
    response = "2000" + "\r\n" + '2024/12/31 10:00:05' + "\r\n" + '2024/12/31 10:00:05'
    res.status(200).send(response);
});

app.post('/data', (req, res) => {
    res.send('Hello, World!*******************');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

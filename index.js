const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.raw());
const port = process.env.PORT || 9999;

// 自定義 morgan 日誌格式
morgan.token('time', function (req) {
    return new Date().toISOString(); // 請求的時間戳
});

morgan.token('query', function (req) {
    return JSON.stringify(req.query); // 查詢參數
});

morgan.token('body', function (req) {
    // 直接記錄請求的原始資料（這裡假設是文本或 JSON）
    return req.body || ''; // 若有請求體，記錄它
});

// 使用自定義格式記錄日誌，並將其輸出到 stdout
app.use(morgan(':time :method :url :query :body', {
    stream: process.stdout // 將 morgan 的日誌輸出到標準輸出（stdout）
}));

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

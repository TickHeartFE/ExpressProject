const express = require('express');

const path = require('path');

const app = express();

app.use(express.static(path.join(_dirname, 'public')));

app.listen('https://api.apiopen.top/api.html');

console.log('success');
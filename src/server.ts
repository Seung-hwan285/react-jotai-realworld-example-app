import express from 'express';
const app = express();

app.use(express.static('public', { maxAge: '1y' }));

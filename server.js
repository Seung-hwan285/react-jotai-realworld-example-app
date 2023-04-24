const express = require('express');
const path = require('path');

const app = express();

app.use('/src', express.static(path.resolve(__dirname, 'src')));
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.listen(process.env.PORT || 5000, () => console.log('Server running ....'));

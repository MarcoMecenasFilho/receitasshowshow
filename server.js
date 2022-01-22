const express = require('express');
const path = require('path');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
  });
}

app.get('/page', (req, res) => {
  res.send('page');
});

const localport = 3000;

app.listen(process.env.PORT || localport, (err) => {
  if (err) { return console.log(err); }
  console.log('Esta funcionando');
});

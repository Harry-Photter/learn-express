const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use('/user', (req, res, next) => {
  if(isAdmin()) next();
  else res.send('Go away!');
});

app.use(express.static(path.join(__dirname, `/public`)));

app.get(`/`, (req, res) => {
  res.show('home.html');
});

app.get(`/about`, (req, res) => {
  res.show('about.html');
});

app.get('/user/settings', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/forbidden.html'));
});

app.get('/user/panel', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/forbidden.html'));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '/views/404.html'));
})

app.listen(8080, () => {
  console.log('Server is running on port: 8000');
});
const express = require('express');
const path = require('path');
const numgle = require('./public/numgle.js');

const app = express();

const PORT = 8084;

app.listen(PORT, () => {
  console.log(`opened at ${PORT}`);
});

// static file
app.use('/', express.static(path.join(__dirname, '/public')));

// View engine: pug
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'pug');

// router for /getridofsheepduck
app.get('/getridofsheepduck', (req, res) => {
  res.send('주소창에 "/굴리고 싶으신 글자" 를 입력해 주세요!');
});

// router for /getridofsheepduck/:gulja
app.get('/getridofsheepduck/:gulja', (req, res) => {
  const numgled = numgle(req.params.gulja);

  res.send(numgled);
});

// router for /
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Numgle.js',
    gulja: '주소창에 "/굴리고 싶으신 글자" 를 입력해 주세요!'
  });
});

// router for input word
app.get('/:gulja', (req, res) => {
  const numgled = numgle(req.params.gulja);
  
  res.render('index', { 
    title: 'Numgle.js',
    gulja: numgled
  });
});

// router for error
app.use((req, res, next) => {
  const error = new Error(`There is no router for the requested ${req.method} ${req.url}.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error occured!'
  });
});
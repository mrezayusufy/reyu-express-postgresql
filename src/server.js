import app from './app';

require('dotenv/config');

app.listen(process.env.PORT);
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

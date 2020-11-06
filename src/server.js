import app from './app';

require('dotenv/config');

app.listen(process.env.PORT);
app.set('view engine', 'pug');
app.set('views', './views');

const express = require('express');
const mainRouter = require('./routes/main');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
const app = express();

app.use(methodOverride('_method'))
app.use(session({
  secret: "Gregory House and Luko for the win",
  resave: true,
  saveUninitialized: true
}
))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(userLoggedMiddleware);
app.use(cookieParser());
app.use('/', mainRouter);

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});

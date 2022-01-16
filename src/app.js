const express = require('express')
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes/index.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const parseArgs = require('minimist');
require('./db/index')
require('./auth/index')

const args = parseArgs(process.argv.slice(2));
const PORT = args.port || 8080;

app.set("views", path.join(__dirname, 'views', 'ejs'));
app.set('view engine', 'ejs');
app.use(session({
    secret: "desafio",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100
    }
}))
app.use(passport.session());
app.use(cors("*"));
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use(routes)
app.listen(PORT, () =>{
    console.log('Servidor escuchando en el 8080');
});
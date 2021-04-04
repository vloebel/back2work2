const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
require('dotenv').config();
const SESS_SECRET = process.env.SESS_SECRET;

// session timeout when idle = minutes * seconds/min * 1 second
const SESS_TIMEOUT = 60 * 60 * 1000;

const app = express();
const PORT = process.env.PORT || 3002;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_TIMEOUT
  },
  rolling: true,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

// WHEN DATABASE CHANGES
// use mySql to rebuild schema: "source ./db/schema.sql
// set force:true HERE
// start the server - this rebuilds our tables - and then quit
// set force: false (IMPORTANT!) - now the database is good but all data is gone
// reseed the database as desired. You can do this in mySQL with "source ./db/seeds.sql"
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));
});

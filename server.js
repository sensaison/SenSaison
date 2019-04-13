require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
// const cors = require("cors");

// reqs for google OAuth
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profileRoutes');
const passportSetup = require('./config/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//

const db = require("./models");

const app = express();
let PORT = process.env.PORT || 3000;

// Middleware

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));


//Cookies 
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));


// initialize passport 

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

 
// Routes
require("./routes/apiRoutes")(app);

let syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models
db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

module.exports = app;
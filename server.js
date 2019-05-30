require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const mySQLStore = require("express-mysql-session")(session);
const Passport = require("./config/passportStrategy");
const cors = require("cors");
const flash = require("connect-flash");
const db = require("./models");
const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

app.use(express.static(path.join(__dirname, "/public"), { extensions: ["html"] }));

app.use(cors({ credentials: true }));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// non auth routes before passport and session code
require("./routes/apiRoutes")(app);

// session and cookies
if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", 1);
}
app.use(cookieParser(process.env.COOKIE_SECRET));
if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", 1);
}
let sqlStore = new mySQLStore({
	user: process.env.MYSQLUSER,
	password: process.env.MYSQLPWD,
	database: process.env.MYSQLDB,
	host: process.env.MYSQLHOST,
	port: process.env.MYSQLPORT  
});
if (process.env.NODE_ENV === "production") {
	sqlStore = new mySQLStore({
		user: process.env.JAWSDB_USER,
		password: process.env.JAWSDB_PWD,
		database: process.env.JAWSDB_DB,
		host: process.env.JAWSDB_HOST,
		port: process.env.JAWSDB_PORT
	});
}
app.use(session({
	secret: process.env.SESSION_SECRET,
	store: sqlStore,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false } // change to true for production
}));
app.use(Passport.initialize());
app.use(Passport.session());

// create app-level person vars
app.use((req, res, next) => {
	res.locals.success_messages = req.flash("success");
	res.locals.error_messages = req.flash("error");

	if (req.session && req.session.user) {
		db.Users.findOrCreate({ openId: req.session.user.openId }, (err, user) => {
			if (user) {
				req.user = person;
				req.session.user = person;  //refresh the session value
				res.locals.user = person;
				// person var should now be accessible to front end
			} else {
				console.log(err);
			}
			// finishing processing the middleware and run the route
			next();
		});
	} else {
		next();
	}
});

require("./routes/authRoutes")(app);

let syncOptions = { force: false };
if (process.env.NODE_ENV === "test") {
	syncOptions.force = true;
}

// Starting the server, syncing our models
db.sequelize.sync(syncOptions).then(() => {
	app.listen(PORT, () => {
		console.log(
			"==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
			PORT,
			PORT
		);
	});
});

module.exports = app;
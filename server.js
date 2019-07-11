require("dotenv").config();
const express = require("express"),
	session = require("express-session"),
	path = require("path"),
	mySQLStore = require("express-mysql-session")(session),
	Passport = require("./config/passportStrategy"),
	// cors = require("cors"),
	flash = require("connect-flash"),
	db = require("./models");
	
const app = express();

let PORT = process.env.PORT || 3000;

app.engine("html", require("./plugins/htmlEngine"));
app.set("view engine", "html");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public"), { extensions: ["html"] }));

// app.use(cors({
// 	credentials: true
// }));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	// res.header("Access-Control-Allow-Origin", "*");
	// can't use wild card above with allow-credentials being set to true
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// non auth routes before passport and session code
require("./routes/apiRoutes")(app);

// session and cookies
let sqlStore;
if (process.env.NODE_ENV === "production") {
	sqlStore = new mySQLStore({
		user: process.env.JAWSDB_USER,
		password: process.env.JAWSDB_PWD,
		database: process.env.JAWSDB_DB,
		host: process.env.JAWSDB_HOST,
		port: process.env.JAWSDB_PORT
	});
} else {
	sqlStore = new mySQLStore({
		user: process.env.MYSQLUSER,
		password: process.env.MYSQLPWD,
		database: process.env.MYSQLDB,
		host: process.env.MYSQLHOST,
		port: process.env.MYSQLPORT  
	});
}
let sessionOptions = {
	secret: process.env.SESSION_SECRET,
	store: sqlStore,
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: 24*60*60*1000
	}
};
if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", 1);
	sessionOptions.cookie.secure = true; // serve secure cookies only in production
}
app.use(session(sessionOptions));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(flash());

// create middleware to send user info to front end
app.use((req, res, next) => {
	res.locals.success_messages = req.flash("success! server.js");
	res.locals.error_messages = req.flash("error! server.js");
	
	if (req.session && req.user) {

		db.Users.findOne({
			where: { openId: req.user.profile.id }
		}).then((user, err) => {
			if (err) {
				console.log(err);
			}
			req.user = user;
			req.session.user = user;  //refresh the session value
			res.locals.user = user;

			// console.log(user);

			next();
		});
	} else {
		next();
	}
});

// auth routes
require("./routes/authRoutes")(app);
// should this above go before or after the user middleware?
// doesn't seem to matter but maybe it does

let syncOptions = {
	force: false,
	logging: false
};
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
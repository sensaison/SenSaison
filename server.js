require("dotenv").config();
const express = require("express"),
	Sqrl = require("squirrelly"),
	session = require("express-session"),
	path = require("path"),
	mySQLStore = require("express-mysql-session")(session),
	Passport = require("./config/passportStrategy2"),
	flash = require("connect-flash"),
	db = require("./models"),
	favicon = require("serve-favicon");
	
const app = express();

let PORT = process.env.PORT || 3000;

app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// app.engine("html", require("./plugins/htmlEngine"));
// app.set("views", "./views_purehtml");
// app.set("view engine", "html");

app.set("views", "./views_squirrelly");
app.set("view engine", "squirrelly");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public"), { extensions: ["html"] }));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// middleware to require https except for auth page
// this breaks heroku
// app.use((req, res, next) => {
// 	if (process.env.NODE_ENV === "production") {
// 		const reqType = req.headers["x-forwarded-proto"];
// 		// if not https redirect to https unless logging in using OAuth
// 		if (reqType !== "https") {
// 			req.url.indexOf("/auth/google") !== -1
// 				? next()
// 				: res.redirect("https://" + req.headers.host + req.url);
// 		} 
// 	} else {
// 		next();
// 	}
// }); 

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
	sessionOptions.proxy = true;
	sessionOptions.cookie.secure = true; // serve secure cookies only in production
}
app.use(session(sessionOptions));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(flash());

// middleware to send user info to front end
app.use((req, res, next) => {
	res.locals.success_messages = req.flash("success! server.js");
	res.locals.error_messages = req.flash("error! server.js");
	
	if (req.session && req.user) {

		db.Users.findOne({
			where: { openId: req.user.id }
		}).then((user, err) => {
			if (err) {
				console.log(err);
			}
			req.user = user;
			req.session.user = user;  //refresh the session value
			res.locals.user = user;

			next();
		});
	} else {
		next();
	}
});

// auth routes
require("./routes/authRoutes")(app);

let syncOptions = {
	force: true,
	// logging: false // prevents console logs of sequelize things
};
// if (process.env.NODE_ENV === "test") {
// 	syncOptions.force = true;
// }

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
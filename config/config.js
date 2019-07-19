require("dotenv").config();

module.exports = {
	"development": {
		username: process.env.MYSQLUSER,
		password: process.env.MYSQLPWD,
		database: process.env.MYSQLDB,
		host: process.env.MYSQLHOST,
		dialect: "mysql",
		"logging": false // prevents logging to console
	},
	"test": {
		username: "root",
		password: "",
		database: "",
		host: "127.0.0.1",
		dialect: "mysql"
	},
	"production": {
		username: process.env.JAWSDB_USER,
		password: process.env.JAWSDB_PWD,
		database: process.env.JAWSDB_DB,
		host: process.env.JAWSDB_HOST,
		dialect: "mysql"
	}
};
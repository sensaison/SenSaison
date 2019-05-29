require("dotenv").config();

module.exports = {
	"NODE_ENV": "development",
	"dialect": "mysql",
	"development": {
		username: process.env.MYSQLUSER,
		password: process.env.MYSQLPWD,
		database: process.env.MYSQLDB,
		config: {host: process.env.MYSQLHOST,
			dialect: "mysql"}
	},
	"test": {
		username: "root",
		password: "",
		database: "",
		host: "127.0.0.1",
		dialect: "mysql"
	},
	"production": {
		use_env_variable: process.env.JAWSDB_URL,
		dialect: "mysql"
	}
};
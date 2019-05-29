require("dotenv").config();

module.exports = {
	NODE_ENV:"development",
	development: {
		username: process.env.MYSQLUSER,
		password: process.env.MYSQLPWD,
		database: process.env.MYSQLDB,
		host: process.env.MYSQLHOST,
		dialect: "mysql"  
	},
	test: {
		username: "root",
		password: "",
		database: "",
		host: "127.0.0.1",
		dialect: "mysql"
	},
	production: {
		use_env_variable: process.env.JAWSDB_URL,
		username: process.env.JAWSDB_USER,
		password: process.env.JAWSDB_PWD,
		database: process.env.JAWSDB_DB,
		host: process.env.JAWSDB_HOST,
		dialect: "mysql"
	}
};
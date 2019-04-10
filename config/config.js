require("dotenv").config();
// require("./keys");

module.exports = {
    "development": {
        "username": process.env.MYSQLUSER,
        "password": process.env.MYSQLPWD,
        "database": process.env.MYSQLDB,
        "host": process.env.MYSQLHOST,
        "dialect": "mysql"  
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    production: {
    // eslint-disable-next-line camelcase
        "use_env_variable": process.env.JAWSDB_URL,
        "dialect": "mysql"
    }
};

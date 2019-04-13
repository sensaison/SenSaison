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
    // eslint-disable-next-line camelcase
        // use_env_variable: "mysql://ynm4ek0h6e6vnt7l:nylkyc2cq9fsns21@jj820qt5lpu6krut.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/r6mgqw5hbumksrrd",
        username: process.env.JAWSDB_USER,
        password: process.env.JAWSDB_PWD,
        database: process.env.JAWSDB_DB,
        host: process.env.JAWSDB_HOST,
        dialect: "mysql"
    }
    
};
CREATE DATABASE IF NOT EXISTS SenSeason_db;
USE SenSeason_db;

CREATE TABLE IF NOT EXISTS main_data (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id binary(16) NOT NULL, /* tied to the id in next table */
    picture_id VARCHAR(50) NOT NULL, /* let's see how cloudinary works */
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    date_time_obs DATETIME NOT NULL,
    lat_lon POINT NOT NULL, /* would be cool to use google maps for this */
    category ENUM("animal", "plant", "fungus", "weather", "land & water") NOT NULL,
    species VARCHAR(50),
    species_sci_name VARCHAR(50),
    species_confidence ENUM("1", "2", "3", "4", "5") DEFAULT("1"),
    weather VARCHAR(50),
    land_water VARCHAR(50),
    first_confidence ENUM("1", "2", "3", "4", "5") DEFAULT("1") NOT NULL,
    notes TEXT NOT NULL,
    PRIMARY KEY (id)
);


/* ??? will need to figure out this one with Auri */
CREATE TABLE IF NOT EXISTS user_data (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id BINARY(16) UNIQUE NOT NULL, /* needs to be auto generated - based on UUID */
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(20) UNIQUE NOT NULL,
    pw VARCHAR(20), 
    PRIMARY KEY (id)
);

/*  unhex(replace(uuid(),'-','')) */
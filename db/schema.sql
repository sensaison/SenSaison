CREATE DATABASE IF NOT EXISTS project2_db;
USE project2_db;

CREATE TABLE IF NOT EXISTS main_data (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user binary(16) NOT NULL, /* tied to the id in next table */
    picture_id VARCHAR(50) NOT NULL, /* let's see how cloudinary works */
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    date_time_obs DATETIME NOT NULL,
    lat_lon POINT NOT NULL, /* would be cool to use google maps for this */
    category ENUM("animal", "plant", "fungus", "weather", "land & water") NOT NULL,
    species TEXT,
    species_sci_name TEXT,
    species_confidence ENUM("1", "2", "3", "4", "5") DEFAULT("1"),
    weather TEXT,
    land_water TEXT,
    first_confidence ENUM("1", "2", "3", "4", "5") DEFAULT("1") NOT NULL,
    notes TEXT NOT NULL,
    PRIMARY KEY (id)
);


/* ??? will need to figure out this one with Auri */
CREATE TABLE IF NOT EXISTS users_data (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user binary(16) UNIQUE NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email TEXT,
    username VARCHAR(50),
    pw VARCHAR(50), 
    PRIMARY KEY (id)
);
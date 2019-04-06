CREATE DATABASE IF NOT EXISTS SenSaison_db;
USE SenSaison_db;

CREATE TABLE IF NOT EXISTS Observations (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id binary(16) NOT NULL, /* tied to the id in next table */
    picture_id VARCHAR(50) NOT NULL, /* let's see how cloudinary works */
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    date_obs DATE NOT NULL,
    time_obs TIME NOT NULL,
    latitude FLOAT NOT NULL, /* would be cool to use google maps for this */
    longitude FLOAT NOT NULL,
    category ENUM("animal", "plant", "fungus", "weather", "land_water", "other") NOT NULL,
    first_confidence ENUM("1", "2", "3", "4", "5") DEFAULT("1") NOT NULL,
    species VARCHAR(50),
    species_sci_name VARCHAR(50),
    species_confidence ENUM("1", "2", "3", "4", "5") DEFAULT("1"),
    brief_description TEXT NOT NULL,
    extended_description TEXT,
    PRIMARY KEY (id)
);


/* ??? will need to figure out this one with Auri */
CREATE TABLE IF NOT EXISTS Users (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id BINARY(16) UNIQUE NOT NULL, /* needs to be auto generated - based on UUID */
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(20) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

/*  unhex(replace(uuid(),'-','')) */
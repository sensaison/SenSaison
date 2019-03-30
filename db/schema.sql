CREATE DATABASE project2_db;
USE project2_db;

CREATE TABLE IF NOT EXISTS main_data (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id INT(50) NOT NULL,
    picture_id TEXT NOT NULL, /* let's see how cloudinary works */
    time_stamp TIMESTAMP NOT NULL,
    date_time_obs DATETIME NOT NULL,
    lat_lon POINT NOT NULL, /* would be cool to use google maps for this */
    category ENUM("animal", "plant", "fungus", "weather", "land & water") NOT NULL,
    species TEXT,
    species_sci_name TEXT,
    species_confidence ENUM("1 - low confidence", "2", "3", "4", "5 - very high confidence") DEFAULT("1 - low confidence") NOT NULL,
    weather TEXT,
    land_water TEXT,
    first_confidence ENUM("1 - low confidence", "2", "3", "4", "5 - very high confidence") DEFAULT("1 - low confidence") NOT NULL,
    notes TEXT NOT NULL,
    PRIMARY KEY (id)
);


/* ??? will need to figure out this one with Auri */
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email TEXT,
    username VARCHAR(50),
    pw PASSWORD, 
    PRIMARY KEY (id)
);
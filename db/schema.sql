CREATE DATABASE IF NOT EXISTS SenSaison_db;
USE SenSaison_db;

CREATE TABLE IF NOT EXISTS Observations (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL REFERENCES Users (userId)
        ON DELETE NO ACTION
        ON UPDATE CASCADE, /* tied to the id in next table */
    pictureId VARCHAR(50) NOT NULL, /* cloudinary */
    dateObs DATE NOT NULL,
    timeObs TIME NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    category ENUM("animal", "plant", "fungus", "weather", "land_water", "other") NOT NULL,
    firstConfidence ENUM("1", "2", "3", "4", "5") DEFAULT("1") NOT NULL,
    species VARCHAR(50),
    speciesSciName VARCHAR(50),
    speciesConfidence ENUM("1", "2", "3", "4", "5") DEFAULT("1"),
    briefDescription TEXT NOT NULL,
    extendedDescription TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS Users (
    id INT NOT NULL AUTO_INCREMENT,
    userId VARCHAR(30) NOT NULL, /* --Switching to varchar to increase the number limit, testing with google userId for right now. */
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    username VARCHAR(20) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY (userId), 
    UNIQUE KEY (email),
    UNIQUE KEY (username)
);

/*  unhex(replace(uuid(),'-','')) */
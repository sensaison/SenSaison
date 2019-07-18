CREATE DATABASE IF NOT EXISTS SenSaison_db;
USE SenSaison_db;

CREATE TABLE IF NOT EXISTS Observations (
    id INT NOT NULL AUTO_INCREMENT,
    openId VARCHAR(50) NOT NULL REFERENCES Users (openId)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    pictureId VARCHAR(100) NOT NULL,
    dateObs DATE NOT NULL,
    timeObs TIME NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    category ENUM("animal", "plant", "fungus", "weather", "land_water", "other") NOT NULL DEFAULT "other",
    firstConfidence ENUM("1", "2", "3", "4", "5") NOT NULL,
    species VARCHAR(50),
    speciesSciName VARCHAR(50),
    speciesConfidence ENUM("1", "2", "3", "4", "5") DEFAULT NULL,
    briefDescription TEXT NOT NULL,
    extendedDescription TEXT DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Users (
    id INT NOT NULL AUTO_INCREMENT,
    openId VARCHAR(50) NOT NULL,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    displayName VARCHAR(50),
    email VARCHAR(50) NOT NULL,
    issuer ENUM("email_pw", "google", "facebook", "twitter") NOT NULL,
    username VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY (openId), 
    UNIQUE KEY (email)
);
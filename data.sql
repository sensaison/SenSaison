-- MySQL dump 10.13  Distrib 8.0.15, for macos10.14 (x86_64)
--
-- Host: localhost    Database: SenSaison_db
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Observations`
--

DROP TABLE IF EXISTS `Observations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Observations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `pictureId` varchar(50) NOT NULL,
  `dateObs` date NOT NULL,
  `timeObs` time NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `category` enum('animal','plant','fungus','weather','land_water','other') NOT NULL,
  `firstConfidence` enum('1','2','3','4','5') NOT NULL DEFAULT (_utf8mb4'1'),
  `species` varchar(50) DEFAULT NULL,
  `speciesSciName` varchar(50) DEFAULT NULL,
  `speciesConfidence` enum('1','2','3','4','5') DEFAULT (_utf8mb4'1'),
  `briefDescription` text NOT NULL,
  `extendedDescription` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Observations`
--

LOCK TABLES `Observations` WRITE;
/*!40000 ALTER TABLE `Observations` DISABLE KEYS */;
INSERT INTO `Observations` VALUES (1,12345,'5','1989-12-31','23:59:59',68.5,-162.5,'animal','3','red-footed booby',NULL,'4','lalalallalalalala',NULL,'2019-04-11 00:15:05',NULL),(2,678910,'4','1990-12-31','23:59:59',69.5,-161.5,'animal','5','blue-footed booby',NULL,'3','rurururururururuur',NULL,'2019-04-11 00:15:05',NULL),(3,678910,'3','1883-12-31','23:59:59',70.5,-163.5,'plant','1','white oak',NULL,'1','kjkjkjkjkjkjkjkjkjkjk',NULL,'2019-04-11 00:15:05',NULL),(4,246810,'2','2015-12-31','23:59:59',68.55,-162.51,'plant','2','low-bush blueberry',NULL,'2','dfdfdfdfdhfdffdfdfdfdf',NULL,'2019-04-11 00:15:05',NULL),(5,246810,'1','1630-12-31','23:59:59',68.5,-162,'fungus','5','morelle',NULL,'3','ctctctctctctctctct',NULL,'2019-04-11 00:15:05',NULL),(6,246810,'100','1998-12-31','23:59:59',55.5,-132.5,'weather','1','hurricane',NULL,NULL,'sisisisisisisisisisis',NULL,'2019-04-11 00:15:05',NULL),(7,13579,'29','2000-12-31','23:59:59',45.5,32.5,'weather','5','monsoon rain',NULL,NULL,'mfmfmfmfmfmfmfmfmfmfm',NULL,'2019-04-11 00:15:05',NULL),(8,13579,'13','1766-12-31','23:59:59',88.5,162.5,'weather','5','above freezing',NULL,NULL,'bbebebebebebebebebebe',NULL,'2019-04-11 00:15:05',NULL),(9,13579,'35','2045-12-31','23:59:59',50.5,-150.5,'fungus','5','oyster mushroom',NULL,'4','hihihihihihihihihiihihi',NULL,'2019-04-11 00:15:05',NULL),(10,13579,'esr','1995-12-31','23:59:59',68.2,-161.9,'land_water','3','freeze',NULL,NULL,'hahahahahahahahahaha',NULL,'2019-04-11 00:15:05',NULL),(11,13579,'456','1995-12-01','23:59:59',68.1,-161.9,'other','2','something',NULL,NULL,'hahahahahahahahahaha',NULL,'2019-04-11 00:15:05',NULL);
/*!40000 ALTER TABLE `Observations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,12345,'Catherine','Pham','acpham028@gmail.com','catherine','2019-04-11 00:15:05',NULL),(2,678910,'Stefan','Apreutesei','sapreut@uw.edu','stefan','2019-04-11 00:15:05',NULL),(3,246810,'Julie','Mathews','julie@mathews.com','julie','2019-04-11 00:15:05',NULL),(4,13579,'Auri','Robbins-Phillips','auri@r-b.com','auri','2019-04-11 00:15:05',NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-11 22:08:50

# ************************************************************
# Sequel Pro SQL dump
# Version 5224
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 8.0.12)
# Database: cmpe_273_lab1_homeaway_mockup
# Generation Time: 2018-10-08 06:28:49 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table properties
# ------------------------------------------------------------

DROP TABLE IF EXISTS `properties`;

CREATE TABLE `properties` (
  `propertyId` varchar(36) NOT NULL DEFAULT '',
  `location` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `headline` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `description` blob NOT NULL,
  `type` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `bedrooms` int(11) NOT NULL,
  `accommodates` int(11) NOT NULL,
  `bathrooms` int(11) NOT NULL,
  `bookingOption` tinyint(4) NOT NULL COMMENT '1 for instant booking, 2 for 24-hour review',
  `rate` int(11) NOT NULL,
  `minimumStay` int(11) NOT NULL,
  `startDate` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `endDate` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `owner` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`propertyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;

INSERT INTO `properties` (`propertyId`, `location`, `headline`, `description`, `type`, `bedrooms`, `accommodates`, `bathrooms`, `bookingOption`, `rate`, `minimumStay`, `startDate`, `endDate`, `owner`)
VALUES
	('210d08ce-9bce-4a53-bc9a-9b0fc07cefbc','108 Honomu Ln, Honomu, HI 96728','Hamakua Coast Bay Private Paradise',X'48616E647320646F776E2C20697427732054484520706C61636520746F2073746179207768696C6520696E2048696C6F21204F757220677565737473207361792069742062657374202D2074686579206861766520756E616E696D6F75736C79206167726565642074686174206F757220686F73706974616C69747920616E642070726F70657274792061726520776F7274682065766572792070656E6E792E205468697320636F6D666F727461626C6520616E6420707269766174652072616E6368206D616B657320612067726561742027686F6D6520626173652720666F7220796F7572204269672049736C616E642076697369742E204672656520576946692C20746F6F2E20576879207374617920617420616E206F6C642C2064756D707920686F74656C206F7220736D616C6C65722073706F74207768656E20796F752063616E207374617920696E206F7572207761726D2C20636C65616E20616E642077656C636F6D696E6720707269766174652070617261646973653F','studio',1,5,1,1,89,1,'2018-10-09T05:49:37.000Z','2018-12-13T06:49:37.000Z','alice@example.com'),
	('a690bbac-f91d-404b-8d4b-74b93919617b','28 Honomu Rd, Honomu, HI 96728','Ocean View Couple\'s Condo',X'5377656570696E67207669657773206F66207468652050616369666963204F6365616E20616E6420737572726F756E64696E6720636F756E747279736964652077656C636F6D6520696E2062656175746966756C20676F6C64656E2073756E7269736573206F7665722074686973206F6E652D626564726F6F6D2C206F6E652062617468726F6F6D207072697661746520636F74746167652E204E65776C79206275696C742C20616D6F6E6720362061637265732077697468206120636F6F6C20737072696E672D6665642073747265616D2C20796F752077696C6C2066696E64206F7665722034303020667275697420616E642070616C6D2074726565732C20696E636C7564696E672061766F6361646F2C206C656D6F6E2C206C696D652C2062616E616E61732C20677261706566727569742C206F72616E6765732C206C79636865652C20616E64206F7468657220726172652074726F706963616C732E','condo',1,2,1,1,120,1,'2018-10-10T05:29:54.000Z','2018-12-01T06:29:54.000Z','alice@example.com');

/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trips
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trips`;

CREATE TABLE `trips` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `traveler` varchar(30) NOT NULL DEFAULT '',
  `startDate` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `endDate` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `houseId` varchar(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;

INSERT INTO `trips` (`id`, `traveler`, `startDate`, `endDate`, `houseId`)
VALUES
	(2,'bob@example.com','2018-10-12T06:10:46.000Z','2018-10-16T06:10:46.000Z','210d08ce-9bce-4a53-bc9a-9b0fc07cefbc'),
	(3,'bob@example.com','2018-10-26T06:20:07.000Z','2018-10-27T06:20:07.000Z','a690bbac-f91d-404b-8d4b-74b93919617b');

/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `passwordHash` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `firstName` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `lastName` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `image` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `phone` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `about` blob,
  `city` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `country` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `company` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `school` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `hometown` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `language` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `gender` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `isOwner` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `passwordHash`, `firstName`, `lastName`, `image`, `phone`, `about`, `city`, `country`, `company`, `school`, `hometown`, `language`, `gender`, `isOwner`)
VALUES
	(23,'alice@example.com','$2b$12$4F8toiWbbHuWBN0E.v.tleLTM.o6kljuW9F9hhhY8UrL4Y8TD6R7e','Alice','Smith','','',NULL,'San Jose','','','','','','',1),
	(24,'bob@example.com','$2b$12$UYK1mgsKCzEJ9nDz3RK.HeZ8wMKuNNbnN0hkNQFmqWGSG6fnN/dG2','Bob','Jackson','','',NULL,'','','','','','','',0);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

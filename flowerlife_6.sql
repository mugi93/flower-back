CREATE TABLE `user` (
   `id` varchar(40) PRIMARY KEY NOT NULL,
   `email` varchar(255),
   `password` varchar(255),
   `picture` mediumtext,
   `firstname` varchar(255),
   `lastname` varchar(255),
   `address` varchar(255),
   `cp` int,
   `country` varchar(255),
   `phone` int,
   `city` varchar(255),
   `verify` boolean DEFAULT false
 );

DROP TABLE IF EXISTS `annonce`;

CREATE TABLE `annonce` (
  `id` varchar(40) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `delivery` varchar(30) DEFAULT NULL,
  `flowerPot` varchar(30) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `priceOrigin` int(11) DEFAULT NULL,
  `priceWanted` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `validity` varchar(30) DEFAULT NULL,
  `photoA` mediumblob DEFAULT NULL,
  `photoB` mediumblob DEFAULT NULL,
  `photoC` mediumblob DEFAULT NULL,
  `user_Id` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `annonce`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_Id` (`user_Id`);

ALTER TABLE `annonce`
  ADD CONSTRAINT `annonce_ibfk_1` FOREIGN KEY (`user_Id`) REFERENCES `user` (`id`) ON DELETE NO ACTION;



DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `id` varchar(40) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `validatedAt` varchar(255) DEFAULT NULL,
  `feedbackAsked` tinyint(4) DEFAULT NULL,
  `user_Id` varchar(40) DEFAULT NULL,
  `annonce_Id` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `order`
ADD  PRIMARY KEY (`id`),
ADD  KEY `annonce_Id` (`annonce_Id`),
ADD  KEY `user_Id` (`user_Id`);

ALTER TABLE `order`
ADD  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`annonce_Id`) REFERENCES `annonce` (`id`),
ADD  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`user_Id`) REFERENCES `user` (`id`);





-- # ************************************************************
-- # Sequel Pro SQL dump
-- # Version 4541
-- #
-- # http://www.sequelpro.com/
-- # https://github.com/sequelpro/sequelpro
-- #
-- # Hôte: localhost (MySQL 5.5.5-10.4.17-MariaDB)
-- # Base de données: test
-- # Temps de génération: 2021-12-17 11:07:05 +0000
-- # ************************************************************


-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!40101 SET NAMES utf8 */;
-- /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
-- /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- # Affichage de la table annonce
-- # ------------------------------------------------------------

-- DROP TABLE IF EXISTS `annonce`;

-- CREATE TABLE `annonce` (
--   `id` varchar(40) NOT NULL,
--   `createdAt` varchar(255) DEFAULT NULL,
--   `category` varchar(255) DEFAULT NULL,
--   `delivery` varchar(30) DEFAULT NULL,
--   `flowerPot` varchar(30) DEFAULT NULL,
--   `title` varchar(255) DEFAULT NULL,
--   `stock` int(11) DEFAULT NULL,
--   `priceOrigin` int(11) DEFAULT NULL,
--   `priceWanted` int(11) DEFAULT NULL,
--   `description` varchar(255) DEFAULT NULL,
--   `photoA` mediumblob DEFAULT NULL,
--   `photoB` mediumblob DEFAULT NULL,
--   `photoC` mediumblob DEFAULT NULL,
--   `user_Id` varchar(40) DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `user_Id` (`user_Id`),
--   CONSTRAINT `annonce_ibfk_1` FOREIGN KEY (`user_Id`) REFERENCES `user` (`id`),
--   CONSTRAINT `annonce_ibfk_2` FOREIGN KEY (`user_Id`) REFERENCES `user` (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- LOCK TABLES `annonce` WRITE;
-- /*!40000 ALTER TABLE `annonce` DISABLE KEYS */;

-- INSERT INTO `annonce` (`id`, `createdAt`, `category`, `delivery`, `flowerPot`, `title`, `stock`, `priceOrigin`, `priceWanted`, `description`, `photoA`, `photoB`, `photoC`, `user_Id`)
-- VALUES
-- 	('24e58cdb-41bb-4d30-860c-397a367042ab','Thu Dec 09 2021 10:07:15 GMT+0100 (heure normale d’Europe centrale)','Cactus et plantes d\'extérieur','oui','yes','rosier',1,35,40,'rosier rouge','','','','cf02b9a6-513f-46e2-9675-8c9ca5b5e789'),
-- 	('580d3d2c-f1a5-4101-9bf6-f3bb54af3db8','Thu Dec 09 2021 10:07:15 GMT+0100 (heure normale d’Europe centrale)','Cactus et plantes d\'extérieur','oui','oui','palmier',1,20,25,'jolie palmier','','','','cf02b9a6-513f-46e2-9675-8c9ca5b5e789'),
-- 	('e9ce7009-cb2c-4cdd-a0d8-f82f0ef353b0','Mon Dec 13 2021 15:13:08 GMT+0100 (heure normale d’Europe centrale)','Cactus et plantes d\'extérieur','non','non','palmier',1,15,17,'','','','','cf02b9a6-513f-46e2-9675-8c9ca5b5e789');

-- /*!40000 ALTER TABLE `annonce` ENABLE KEYS */;
-- UNLOCK TABLES;


-- # Affichage de la table city
-- # ------------------------------------------------------------

-- DROP TABLE IF EXISTS `city`;

-- CREATE TABLE `city` (
--   `id` varchar(40) NOT NULL,
--   `name` varchar(255) DEFAULT NULL,
--   `region` varchar(255) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- # Affichage de la table feedback
-- # ------------------------------------------------------------

-- DROP TABLE IF EXISTS `feedback`;

-- CREATE TABLE `feedback` (
--   `id` varchar(40) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- # Affichage de la table order
-- # ------------------------------------------------------------

-- DROP TABLE IF EXISTS `order`;

-- CREATE TABLE `order` (
--   `id` varchar(40) NOT NULL,
--   `createdAt` varchar(255) DEFAULT NULL,
--   `email` varchar(255) DEFAULT NULL,
--   `quantity` int(11) DEFAULT NULL,
--   `validatedAt` varchar(255) DEFAULT NULL,
--   `feedbackAsked` tinyint(4) DEFAULT NULL,
--   `user_Id` varchar(40) DEFAULT NULL,
--   `annonce_Id` varchar(40) DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `annonce_Id` (`annonce_Id`),
--   KEY `user_Id` (`user_Id`),
--   CONSTRAINT `order_ibfk_1` FOREIGN KEY (`annonce_Id`) REFERENCES `annonce` (`id`),
--   CONSTRAINT `order_ibfk_2` FOREIGN KEY (`user_Id`) REFERENCES `user` (`id`),
--   CONSTRAINT `order_ibfk_3` FOREIGN KEY (`annonce_Id`) REFERENCES `annonce` (`id`),
--   CONSTRAINT `order_ibfk_4` FOREIGN KEY (`user_Id`) REFERENCES `user` (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- # Affichage de la table user
-- # ------------------------------------------------------------

-- DROP TABLE IF EXISTS `user`;

-- CREATE TABLE `user` (
--   `id` varchar(40) NOT NULL,
--   `email` varchar(255) DEFAULT NULL,
--   `password` varchar(255) DEFAULT NULL,
--   `picture` mediumblob DEFAULT NULL,
--   `firstname` varchar(255) DEFAULT NULL,
--   `lastname` varchar(255) DEFAULT NULL,
--   `address` varchar(255) DEFAULT NULL,
--   `cp` int(11) DEFAULT NULL,
--   `country` varchar(255) DEFAULT NULL,
--   `phone` varchar(255) DEFAULT NULL,
--   `city` varchar(255) DEFAULT NULL,
--   `verify` tinyint(1) DEFAULT 0,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- LOCK TABLES `user` WRITE;
-- /*!40000 ALTER TABLE `user` DISABLE KEYS */;

-- INSERT INTO `user` (`id`, `email`, `password`, `picture`, `firstname`, `lastname`, `address`, `cp`, `country`, `phone`, `city`, `verify`)
-- VALUES
-- 	('a60181ca-3ee5-484f-b42c-a6705b46e8aa','anais.mancois@gmail.com','$2a$10$IEL1W3aCulVZWjB6UQ4w0u1R4HJcUNTOFcJj986oH2BVRnyZs0xtO',NULL,'Anais','Labbé','28 rue du professeur chavannaz',33140,'villenave d\'ornon','0786863787',NULL,1),
-- 	('c3423f2d-20bc-4391-ab28-d99db1e01f8c','yoann189.labbe@laposte.net','$2a$10$dJe5V0K81qt6862Vfo30PO3OW0qNNYM63A0x9CDf8qmiXqy19vjje',NULL,'Yoann','Labbé','80 rue du docteur Alberd Barraud',33000,'Bordeaux','0786863787',NULL,1),
-- 	('cf02b9a6-513f-46e2-9675-8c9ca5b5e789','y.labbe.contact@gmail.com','$2a$10$qvhaEe00CYL4PAsTfNBT.OiWe1Vv.umjIXOR6zeRldoZhTU6vlj0G',NULL,'Yoann','Labbé','28 rue du professeur chavannaz',33140,'Villenave d\'Ornon','0786863787',NULL,1);

-- /*!40000 ALTER TABLE `user` ENABLE KEYS */;
-- UNLOCK TABLES;



-- /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
-- /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

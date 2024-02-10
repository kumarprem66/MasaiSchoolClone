-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: masaischoolclone
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'premkumaradmin@gmail.com','$2a$10$S3hnU18D/eGisoM940ESP.M7O2rR/dVE4D5BjULu5EXTbfV00xrhy','ROLE_ADMIN');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcement` (
  `aid` int NOT NULL AUTO_INCREMENT,
  `course_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `publish_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`aid`),
  KEY `FKnxopiti7syvupku89mwxpckmq` (`course_id`),
  KEY `FKrfh31p31a4i8mbpvhmmp5xoap` (`department_id`),
  CONSTRAINT `FKnxopiti7syvupku89mwxpckmq` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FKrfh31p31a4i8mbpvhmmp5xoap` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
INSERT INTO `announcement` VALUES (1,2,2,'2023-12-01 05:30:00.000000','adding some new concept in the course syllabus','Important regarding your course syllabus'),(5,9,2,'2024-02-03 05:30:00.000000','testing testing','testing'),(6,9,2,'2024-02-03 05:30:00.000000','holidays for valentine day','holiday 😀😀');
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment` (
  `an_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `lecture_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `instruction` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`an_id`),
  KEY `FKrop26uwnbkstbtfha3ormxp85` (`course_id`),
  KEY `FKt7w7y8stlecmskq35ebqmhge2` (`lecture_id`),
  CONSTRAINT `FKrop26uwnbkstbtfha3ormxp85` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FKt7w7y8stlecmskq35ebqmhge2` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` VALUES (2,2,'2024-02-03',4,'2024-02-02','djsghskdjghlksjdghslk','sdhgskgskhgk','shgkjhlkhglhgl'),(3,2,'2024-02-05',4,'2024-02-03','Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio aut quae doloribus reprehenderit quidem! Dolorum, incidunt mollitia? Ab, iure dolor quibusdam ratione accusantiu.',NULL,'Mutithreading problem-10'),(4,2,'2024-02-06',4,'2024-02-03','repellat sequi dignissimos nisi porro! Debitis quis delectus veritatis illo repudiandae?z',NULL,'spring security'),(5,2,'2024-02-16',3,'2024-02-03','skghkljghlk','dkgkl','sdkghskljh'),(6,2,'2024-02-16',3,'2024-02-03','skghkljghlk','dkgkl','sdkghskljh');
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Web Development'),(2,'Backend Development'),(3,'Frontend Development'),(4,'Android Development'),(5,'cyber security'),(6,'Languages'),(7,'Personality Development');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `category_id` int DEFAULT NULL,
  `course_price` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `instructor_id` int DEFAULT NULL,
  `is_available` bit(1) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `rating_count` int DEFAULT NULL,
  `student_enrolled` int DEFAULT NULL,
  `course_code` varchar(255) DEFAULT NULL,
  `course_language` varchar(255) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkyes7515s3ypoovxrput029bh` (`category_id`),
  KEY `FKi1btm7ma8n3gaj6afdno300wm` (`department_id`),
  KEY `FKqk2yq2yk124dhlsilomy36qr9` (`instructor_id`),
  CONSTRAINT `FKi1btm7ma8n3gaj6afdno300wm` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  CONSTRAINT `FKkyes7515s3ypoovxrput029bh` FOREIGN KEY (`category_id`) REFERENCES `category` (`cid`),
  CONSTRAINT `FKqk2yq2yk124dhlsilomy36qr9` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (2,1000,2,2,13,_binary '',9,2,1,'java1115','English','Java',' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque ut iusto incidunt illo vero repellat praesentium corrupti tempora aliquid, voluptate modi esse dolorum molestiae beatae nesciunt fuga','9 month','https://shorturl.at/lmpE0'),(2,5000,2,9,13,_binary '',4,1,2,'blockchain23','English','BlockChain Development','A comprehensive blockchain development of 12 month','12 month','https://t3.ftcdn.net/jpg/01/96/96/86/360_F_196968684_zp8obttcJzlY4tWhFHzDGOTbPkdY0Q3p.jpg'),(1,5000,2,10,13,_binary '',0,0,1,'webdev34','English','Web Development','Mater the web development','6 month','https://shorturl.at/yzDKL'),(5,10000,2,11,13,_binary '',0,0,1,'cyber232','English','Cyber Security','Master the cyber security','4 month','https://shorturl.at/kuDXY'),(1,5000,2,12,13,_binary '',0,0,0,'Node232','English','Node Development','Master the Node Development','4 month','https://shorturl.at/anNO5'),(1,10000,2,13,13,_binary '',0,0,0,'Mern232','English','Mern Development','Master the Mern Development','6 month','https://shorturl.at/anNO5'),(3,1000,2,14,13,_binary '',0,0,0,'Javascript232','English','JavaScript','Master the Javascript ','3 month','https://shorturl.at/jDEV2'),(3,1000,2,15,13,_binary '',0,0,0,'angular232','English','Angular','Master the Angular in Only 3 Month','3 month','https://shorturl.at/gjlsX'),(6,1000,3,16,14,_binary '',0,0,0,'eng232','English','Spoken English','Master the Spoken English in Only 3 Months','3 month','https://shorturl.at/blGO4'),(6,2000,3,17,14,_binary '',0,0,0,'french232','English','French','Master the French in Only 5 Months','5 month','https://shorturl.at/cdqyJ'),(NULL,2000,NULL,18,NULL,_binary '',0,0,0,'personal232','Hindi','Soft Skill','Master the Soft skills in Only 2 Months','2 month','https://shorturl.at/gnDW3'),(2,300,2,19,13,_binary '',0,0,0,'mysql','English','MySql','Complete course of MySQL database','1 month','https://shorturl.at/uILQR'),(2,1000,2,20,13,_binary '',0,0,0,'aws23','English','AWS CLOUD','Complete course of AWS cloud','5 month','https://shorturl.at/nzDZ1');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (2,'Software Development',NULL),(3,'Marketing',NULL),(4,'Business',NULL);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollment`
--

DROP TABLE IF EXISTS `enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollment` (
  `course_id` int DEFAULT NULL,
  `enrollment_date` date DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_81q4xon4lwv13ay3g8fxhj7f` (`student_id`),
  KEY `FKbhhcqkw1px6yljqg92m0sh2gt` (`course_id`),
  CONSTRAINT `FKbhhcqkw1px6yljqg92m0sh2gt` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FKio7fsy3vhvfgv7c0gjk15nyk4` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor` (
  `date_of_birth` date DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `expected_salary` int DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `user_uid` int DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `expertise` varchar(255) DEFAULT NULL,
  `gender` enum('FEMALE','MALE','OTHER') DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_9cv3ijuhkd0au1e2yqu973vgs` (`user_uid`),
  KEY `FKpk9ufdquofu3g1wmao4oh1wgo` (`department_id`),
  CONSTRAINT `FK3pyt49mxlmjgmyg0t93piushr` FOREIGN KEY (`user_uid`) REFERENCES `user` (`uid`),
  CONSTRAINT `FKpk9ufdquofu3g1wmao4oh1wgo` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES ('2000-01-23',2,80000,1,13,11,'9798287392','yoceho4652@cubene.com','Java Development','MALE','Raushan Kumar','$2a$10$COzyyFmg4FUivNbYNT57zOk5GIa/K0Fc7FRIOBUfO2bAGY9aUtW4K','MTech',NULL),('2008-02-03',3,60000,2,14,13,'7609854321','yoceho4652@cubene.com','Marketing','MALE','Rinku singh','123356','Bcom finance',NULL);
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture`
--

DROP TABLE IF EXISTS `lecture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture` (
  `course_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `instructor_id` int DEFAULT NULL,
  `timing` datetime(6) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `meeting_url` varchar(255) DEFAULT NULL,
  `topic_title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjoc9yetfohpygdvx5wv385vwb` (`course_id`),
  KEY `FKs8081ofsfxqp1cfwo22jhv8vy` (`instructor_id`),
  CONSTRAINT `FKjoc9yetfohpygdvx5wv385vwb` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FKs8081ofsfxqp1cfwo22jhv8vy` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture`
--

LOCK TABLES `lecture` WRITE;
/*!40000 ALTER TABLE `lecture` DISABLE KEYS */;
INSERT INTO `lecture` VALUES (2,3,13,'2024-02-03 23:19:00.000000',NULL,'http://localhost:4200/admin-create-lecture','Multithreading'),(2,4,13,'2024-02-03 23:58:00.000000',NULL,'http://localhost:4200/admin-create-lecture','Spring boot'),(9,5,13,'2024-02-05 03:30:00.000000',NULL,'https://www.youtube.com/watch?v=ENrjn-lD1e8&ab_channel=DhruvRathee','Introduction');
/*!40000 ALTER TABLE `lecture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `date_of_birth` date DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `user_uid` int DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `gender` enum('FEMALE','MALE','OTHER') DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_2b99c04j3owbq8lcr7f3sncgh` (`user_uid`),
  CONSTRAINT `FKjgcu58jo41esf3lucm1kkcoqf` FOREIGN KEY (`user_uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('2021-01-29',9,12,'8434341677','FEMALE','Riya Singh');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_courses`
--

DROP TABLE IF EXISTS `student_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_courses` (
  `student_id` int NOT NULL,
  `course_id` int NOT NULL,
  KEY `FKc614in0kdhj9sih7vw304qxgj` (`course_id`),
  KEY `FKiqufqwgb6im4n8xslhjvxmt0n` (`student_id`),
  CONSTRAINT `FKc614in0kdhj9sih7vw304qxgj` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `FKiqufqwgb6im4n8xslhjvxmt0n` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_courses`
--

LOCK TABLES `student_courses` WRITE;
/*!40000 ALTER TABLE `student_courses` DISABLE KEYS */;
INSERT INTO `student_courses` VALUES (9,2),(9,10),(9,9),(9,11);
/*!40000 ALTER TABLE `student_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submission`
--

DROP TABLE IF EXISTS `submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submission` (
  `assignment_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `lecture_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `submission_date` datetime(6) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `status_choices` enum('GRADED','LATE','SUBMITTED') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3q8643roa73llngo64dvpvtxt` (`assignment_id`),
  KEY `FKa151eo6b3so3q7inpk17kin14` (`lecture_id`),
  KEY `FKhncywuw9vwff2htaofx9m3m75` (`student_id`),
  CONSTRAINT `FK3q8643roa73llngo64dvpvtxt` FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`an_id`),
  CONSTRAINT `FKa151eo6b3so3q7inpk17kin14` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`),
  CONSTRAINT `FKhncywuw9vwff2htaofx9m3m75` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submission`
--

LOCK TABLES `submission` WRITE;
/*!40000 ALTER TABLE `submission` DISABLE KEYS */;
INSERT INTO `submission` VALUES (2,4,NULL,9,'2024-02-07 01:33:52.683000','https://github.com/kumarprem66/ServletProject','SUBMITTED'),(2,5,NULL,9,'2024-02-09 11:51:10.632000','https://github.com/kumarprem66/MasaiSchoolClone','SUBMITTED'),(2,6,NULL,9,'2024-02-09 14:34:55.188000','https://github.com/kumarprem66/MasaiSchoolClone','SUBMITTED');
/*!40000 ALTER TABLE `submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `reason` enum('ASSIGNMENT','LEAVE','SUPPORT') DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (11,'panditji@gmail.com','$2a$10$vy9UBsOmSCv/XfEsB/edYOSL.VdJ.hbkgOHL6CwJhNEUMEJBllbey','panditji','ROLE_INSTRUCTOR'),(12,'riyasingh12@gmail.com','$2a$10$z9HkX.EHTugMexHAMMod1ua9mLQ7GzpGxgRXpM8PvDULZWI5h231O','riyasingh','ROLE_STUDENT'),(13,'premkumaradmin@gmail.com','$2a$10$.gVzNJ6QpIc3uw2rVhvBdenM9sUb1r1TXtWqELQx2UchVQrrRRzla','adminprem','ROLE_INSTRUCTOR'),(14,'ssprem@gmail.com','$2a$10$XnUnXnBkB44prX8IDGq.z.aMALVwLLuDdssXANaHWxXjT9wcASUdK','sprem','ROLE_USER'),(16,'admin123@gmail.com','$2a$10$13lWXiOFfmoZ0Vf1YgdwtuWk5Op6lWlQ1GCZY06xqHY1pXohtifbu','adminp','ROLE_ADMIN');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-10 11:23:48

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 18, 2024 at 01:49 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sastra_law_bot_db`
--

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `login_user`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `login_user` (IN `users` VARCHAR(200), IN `pass` VARCHAR(200))   BEGIN
SELECT usermodel.username FROM usermodel WHERE (usermodel.username = users or usermodel.email = users) and usermodel.password = pass
;
END$$

DROP PROCEDURE IF EXISTS `validate_email`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `validate_email` (IN `email` VARCHAR(200))   BEGIN
SELECT usermodel.email FROM usermodel WHERE usermodel.email = email
;
END$$

DROP PROCEDURE IF EXISTS `validate_username`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `validate_username` (IN `users` VARCHAR(200))   BEGIN
SELECT usermodel.username FROM usermodel WHERE usermodel.username = users
;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_group_id_b120cbf9` (`group_id`),
  KEY `auth_group_permissions_permission_id_84c5c92e` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  KEY `auth_permission_content_type_id_2f476e4b` (`content_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add chat model', 7, 'add_chatmodel'),
(26, 'Can change chat model', 7, 'change_chatmodel'),
(27, 'Can delete chat model', 7, 'delete_chatmodel'),
(28, 'Can view chat model', 7, 'view_chatmodel'),
(29, 'Can add user model', 8, 'add_usermodel'),
(30, 'Can change user model', 8, 'change_usermodel'),
(31, 'Can delete user model', 8, 'delete_usermodel'),
(32, 'Can view user model', 8, 'view_usermodel'),
(33, 'Can add message model', 9, 'add_messagemodel'),
(34, 'Can change message model', 9, 'change_messagemodel'),
(35, 'Can delete message model', 9, 'delete_messagemodel'),
(36, 'Can view message model', 9, 'view_messagemodel');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE IF NOT EXISTS `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_user_id_6a12ed8b` (`user_id`),
  KEY `auth_user_groups_group_id_97559544` (`group_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE IF NOT EXISTS `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permissions_user_id_a95ead1b` (`user_id`),
  KEY `auth_user_user_permissions_permission_id_1fbb5f2c` (`permission_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chatmodel`
--

DROP TABLE IF EXISTS `chatmodel`;
CREATE TABLE IF NOT EXISTS `chatmodel` (
  `chatid` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`chatid`),
  KEY `ChatModel_username_1441a704` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6` (`user_id`)
) ;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(2, 'auth', 'permission'),
(3, 'auth', 'group'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session'),
(7, 'api', 'chatmodel'),
(8, 'api', 'usermodel'),
(9, 'api', 'messagemodel');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-07-03 01:50:17.566230'),
(2, 'auth', '0001_initial', '2024-07-03 01:50:18.020421'),
(3, 'admin', '0001_initial', '2024-07-03 01:50:18.190317'),
(4, 'admin', '0002_logentry_remove_auto_add', '2024-07-03 01:50:18.198320'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-07-03 01:50:18.205788'),
(6, 'api', '0001_initial', '2024-07-03 01:50:18.362701'),
(7, 'contenttypes', '0002_remove_content_type_name', '2024-07-03 01:50:18.425273'),
(8, 'auth', '0002_alter_permission_name_max_length', '2024-07-03 01:50:18.464258'),
(9, 'auth', '0003_alter_user_email_max_length', '2024-07-03 01:50:18.498277'),
(10, 'auth', '0004_alter_user_username_opts', '2024-07-03 01:50:18.505821'),
(11, 'auth', '0005_alter_user_last_login_null', '2024-07-03 01:50:18.538815'),
(12, 'auth', '0006_require_contenttypes_0002', '2024-07-03 01:50:18.543795'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2024-07-03 01:50:18.551794'),
(14, 'auth', '0008_alter_user_username_max_length', '2024-07-03 01:50:18.588854'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2024-07-03 01:50:18.617370'),
(16, 'auth', '0010_alter_group_name_max_length', '2024-07-03 01:50:18.640359'),
(17, 'auth', '0011_update_proxy_permissions', '2024-07-03 01:50:18.648360'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2024-07-03 01:50:18.677059'),
(19, 'sessions', '0001_initial', '2024-07-03 01:50:18.703590'),
(20, 'api', '0002_alter_usermodel_updated_at', '2024-07-03 10:24:55.173911');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messagemodel`
--

DROP TABLE IF EXISTS `messagemodel`;
CREATE TABLE IF NOT EXISTS `messagemodel` (
  `messageid` int NOT NULL AUTO_INCREMENT,
  `messagetype` tinyint(1) NOT NULL,
  `message` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `chatid` int NOT NULL,
  PRIMARY KEY (`messageid`),
  KEY `MessageModel_chatid_296f1d3c` (`chatid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usermodel`
--

DROP TABLE IF EXISTS `usermodel`;
CREATE TABLE IF NOT EXISTS `usermodel` (
  `username` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usermodel`
--

INSERT INTO `usermodel` (`username`, `email`, `password`, `created_at`, `updated_at`, `is_active`, `is_admin`, `is_superuser`) VALUES
('peter_07', 'parker@spider.net', 'parker_07', '2024-07-03 11:58:59.909041', NULL, 1, 0, 0),
('arjun', 'arjunmahadev752005@gmail.com', 'arjun752005', '2024-07-11 17:08:50.160482', NULL, 1, 0, 0),
('me13', 'me13@gmail.com', 'me13@13#', '2024-07-17 17:34:32.156987', NULL, 1, 0, 0),
('pe455', 'p2@g.com', 'p2g212345', '2024-08-01 17:13:54.772483', NULL, 1, 0, 0),
('dhaks13', 'd@gmail.com', 'Dhaks#13', '2024-08-01 19:20:52.619071', NULL, 1, 0, 0),
('dhaks135', 'dhaks@sastra.ac', 'avd12345', '2024-08-02 06:24:42.628119', NULL, 1, 0, 0),
('dhaks', 'avdh@gmai.com', 'avd12315', '2024-08-02 20:10:57.452548', NULL, 1, 0, 0),
('1234__', '123@gmail.com', 'avdavd123', '2024-09-09 15:53:25.947961', NULL, 1, 0, 0),
('ffcgcq1', 'fssd@fdfg.com', '5saac5a51', '2024-09-16 14:17:42.513794', NULL, 1, 0, 0),
('SASTRA_Admin', 'sastra@gmail.edu', 'sastra123', '2024-09-17 09:57:03.275983', NULL, 1, 0, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

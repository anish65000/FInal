-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2024 at 12:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fyp`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `stf_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `slot_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `stf_id`, `user_id`, `user_name`, `slot_time`) VALUES
(4, 4, 26, 'Aayusha Lamichhane', '0000-00-00 00:00:00'),
(6, 4, 27, 'leo Lamichhane', '2024-04-17 00:05:00'),
(11, 4, 30, 'Niharika kc', '2024-04-24 15:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `bloodbank_riders`
--

CREATE TABLE `bloodbank_riders` (
  `rider_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `blood_type` varchar(10) NOT NULL,
  `bike_model` varchar(100) NOT NULL,
  `license_number` varchar(50) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `gender` varchar(25) NOT NULL,
  `age` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bloodbank_riders`
--

INSERT INTO `bloodbank_riders` (`rider_id`, `name`, `email`, `phone_number`, `blood_type`, `bike_model`, `license_number`, `avatar`, `gender`, `age`, `created_at`) VALUES
(1, 'anish lamichhane', 'anishlamichhane65@gmail.com', '9813318711', 'A+', 'Yamah', '12346474748', 'avatar-1713021278830-935790358.png', 'Male', '23', '2024-03-29 22:58:46');

-- --------------------------------------------------------

--
-- Table structure for table `blood_bank`
--

CREATE TABLE `blood_bank` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `district` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` decimal(10,6) NOT NULL,
  `longitude` decimal(10,6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `donations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`donations`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blood_bank`
--

INSERT INTO `blood_bank` (`id`, `name`, `category`, `phone`, `district`, `address`, `latitude`, `longitude`, `email`, `donations`) VALUES
(3, 'Kathmandu Blood Bank', 'General', '9876543210', 'Kathmandu', '123 Kathmandu Street', 27.717200, 85.324000, 'kathmandubloodbank@example.com', NULL),
(4, 'Bhaktapur Bal club', 'basic', '9813345678', 'Kathmandu', 'New baneshowr , Kathmandu', 85.342000, 27.691500, 'Pralhadprasadlamichhane24@gmail.com', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blood_donations`
--

CREATE TABLE `blood_donations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `disease` varchar(255) DEFAULT NULL,
  `blood_group` varchar(5) DEFAULT NULL,
  `units` int(11) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blood_donations`
--

INSERT INTO `blood_donations` (`id`, `user_id`, `bank_id`, `name`, `age`, `gender`, `disease`, `blood_group`, `units`, `reason`, `date`, `status`) VALUES
(8, 1, 3, 'Pralhad lamichhane', 23, 'Male', 'good', 'A+', 1, 'voluntary', '0000-00-00', 'approved'),
(10, 26, 3, 'Aayusha Lamichhane', 23, 'Female', 'good', 'B+', 1, 'voluntary', '2024-04-14', 'approved'),
(11, 4, 3, 'Prastav lamichhane', 23, 'Male', 'good', 'B+', 2, 'voluntary', '2024-05-01', 'pending'),
(12, 4, 3, 'Prastav Lamichhane', 23, 'Male', 'good', 'A-', 2, 'voluntary', '2024-04-22', 'pending'),
(14, 30, 3, 'Niharika kc', 22, 'Female', 'good', 'B+', 1, 'Social service', '2024-04-23', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `blood_donation_feedback`
--

CREATE TABLE `blood_donation_feedback` (
  `stf_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  `feedback_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blood_donation_feedback`
--

INSERT INTO `blood_donation_feedback` (`stf_id`, `user_id`, `feedback`, `feedback_id`) VALUES
(4, 1, 'This is a test feedback.', 1),
(4, 1, 'nice behavior by the doctor ', 2),
(4, 1, 'he is so nice in donation', 3);

-- --------------------------------------------------------

--
-- Table structure for table `blood_inventory`
--

CREATE TABLE `blood_inventory` (
  `id` int(11) NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `total_unit` int(11) NOT NULL,
  `current_stock` int(11) NOT NULL,
  `blood_status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blood_inventory`
--

INSERT INTO `blood_inventory` (`id`, `blood_group`, `total_unit`, `current_stock`, `blood_status`, `created_at`) VALUES
(1, 'A+', 64, 56, 'Unavailable', '2024-03-03 14:46:54'),
(2, 'A-', 107, 38, 'Availaible', '2024-03-03 14:46:54'),
(3, 'B+', 145, 81, 'Available', '2024-03-03 14:46:54'),
(4, 'B-', 92, 26, 'Available', '2024-03-03 14:46:54'),
(5, 'AB+', 150, 71, 'Available', '2024-03-03 14:46:54'),
(6, 'AB-', 110, 55, 'Available', '2024-03-03 14:46:54'),
(7, 'O+', 200, 97, 'Available', '2024-03-03 14:46:54'),
(8, 'O-', 160, 80, 'Available', '2024-03-03 14:46:54');

-- --------------------------------------------------------

--
-- Table structure for table `blood_request`
--

CREATE TABLE `blood_request` (
  `id` int(11) NOT NULL,
  `blood_group` varchar(3) NOT NULL,
  `unit` int(11) NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `patient_address` varchar(255) NOT NULL,
  `patient_contact` varchar(20) NOT NULL,
  `request_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blood_request`
--

INSERT INTO `blood_request` (`id`, `blood_group`, `unit`, `patient_name`, `patient_address`, `patient_contact`, `request_date`, `user_id`) VALUES
(2, 'B-', 2, 'Rabin', 'Maitighar,kathmandu', '9814455', '2024-04-09 16:00:31', 2),
(3, 'B+', 2, 'Supratik ', 'Maitighar,kathmandu', '9814455', '2024-04-14 07:37:55', 2),
(4, 'A-', 2, 'Rabin lamichhane', 'Maitighar,kathmandu', '981445589', '2024-04-21 17:18:28', 2),
(25, 'A-', 2, 'Eva Acharya', 'Kamal Binayak ,Bhaktapur', '9813658910', '2024-04-21 17:58:34', 2),
(26, 'A-', 23, 'Bhawani ghimire', 'New Thimi, BKT', '9813859020', '2024-04-22 07:09:54', 28);

-- --------------------------------------------------------

--
-- Table structure for table `camps`
--

CREATE TABLE `camps` (
  `camp_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `organizer` varchar(255) DEFAULT NULL,
  `contact` varchar(15) DEFAULT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `camps`
--

INSERT INTO `camps` (`camp_id`, `name`, `date`, `address`, `district`, `bank_id`, `organizer`, `contact`, `startTime`, `endTime`, `created_at`) VALUES
(2, 'Leomessi camp', '2024-03-12', 'Maitighar,kathmandu', 'thimi', NULL, 'loe', '93838383', '00:00:10', '00:00:10', '2024-03-28 18:50:33'),
(10, 'Blood Donation Camp Kathmandu', '2024-04-20', 'Kathmandu, Nepal', 'Kathmandu', 3, 'Nepal Red Cross Society', '+977-123456789', '09:00:00', '03:00:00', '2024-04-19 14:36:35'),
(15, 'Nexus blood care ', '2024-04-24', 'Koteshowor, Kathmandu', 'Kathmandu', NULL, 'Prasad hari dev', '9813654320', '00:00:10', '00:00:20', '2024-04-22 07:38:13');

-- --------------------------------------------------------

--
-- Table structure for table `camp_donations`
--

CREATE TABLE `camp_donations` (
  `id` int(11) NOT NULL,
  `camp_id` int(11) NOT NULL,
  `donor_name` varchar(255) NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `donation_date` date NOT NULL,
  `donation_time` time NOT NULL,
  `blood_unit` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `camp_donations`
--

INSERT INTO `camp_donations` (`id`, `camp_id`, `donor_name`, `blood_group`, `donation_date`, `donation_time`, `blood_unit`, `created_at`) VALUES
(1, 2, 'anish', 'A-', '2024-03-05', '01:05:00', 2, '2024-03-28 19:18:35'),
(2, 2, 'Serene', 'A+', '2024-03-12', '01:39:00', 2, '2024-03-28 19:53:30'),
(3, 10, 'Sadikshya pokherel', 'A+', '2024-04-19', '17:31:00', 7, '2024-04-21 09:46:13'),
(4, 10, 'Amit baniya', 'B+', '2024-04-19', '10:02:00', 2, '2024-04-21 20:17:45'),
(5, 15, 'Rabin karki', 'B-', '2024-04-23', '13:31:00', 1, '2024-04-22 07:46:43');

-- --------------------------------------------------------

--
-- Table structure for table `confirmedappointments`
--

CREATE TABLE `confirmedappointments` (
  `confirmed_appointment_id` int(11) NOT NULL,
  `stf_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_age` int(11) NOT NULL,
  `user_phone` varchar(15) NOT NULL,
  `slot_time` datetime NOT NULL,
  `blood_donated` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `confirmedappointments`
--

INSERT INTO `confirmedappointments` (`confirmed_appointment_id`, `stf_id`, `user_id`, `user_name`, `user_age`, `user_phone`, `slot_time`, `blood_donated`) VALUES
(1, 4, 1, 'Anish', 25, '1234567890', '2024-03-08 04:15:00', '1'),
(3, 4, 27, 'Dipesh bhujel', 23, '986057789', '2024-04-17 00:05:00', '1'),
(6, 4, 1, 'Anish Lamichhane', 25, '1234567890', '2024-04-22 04:00:00', ''),
(7, 4, 27, 'Dipesh bhujel', 23, '986057789', '2024-04-22 00:00:00', ''),
(8, 4, 30, 'Niharika kc', 20, '9813455634', '2024-04-24 15:00:00', '1');

-- --------------------------------------------------------

--
-- Table structure for table `donor_inventory`
--

CREATE TABLE `donor_inventory` (
  `id` int(11) NOT NULL,
  `blood_group` varchar(5) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gender` varchar(25) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `address` varchar(255) NOT NULL,
  `donor_name` varchar(255) NOT NULL,
  `general_health` varchar(255) DEFAULT NULL,
  `disqualifying_medications` varchar(255) DEFAULT NULL,
  `recent_travel` tinyint(1) DEFAULT NULL,
  `recent_tattoos` tinyint(1) DEFAULT NULL,
  `recent_sexual_activity` tinyint(1) DEFAULT NULL,
  `drug_use` tinyint(1) DEFAULT NULL,
  `blood_test_result` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donor_inventory`
--

INSERT INTO `donor_inventory` (`id`, `blood_group`, `age`, `email`, `gender`, `phone`, `address`, `donor_name`, `general_health`, `disqualifying_medications`, `recent_travel`, `recent_tattoos`, `recent_sexual_activity`, `drug_use`, `blood_test_result`) VALUES
(2, 'A-', 25, 'anishlamichhane65@gmail.com', 'male', '9813318733', 'Changunrayan_7 Bkt', 'Prastav Lamichhane', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'A-', 22, 'sadikshaya234@gmail.com', 'female', '9845665555', ' Matatirtha, Chandragiri', 'Sadikshya pokhrel', 'good', 'no', 0, 0, 0, 0, 'safe'),
(105, 'A+', 20, 'john@example.com', 'Male', '+123456789', 'New York, USA', 'John Doe', 'Good', NULL, 0, 0, 0, 0, 'Normal'),
(107, 'A+', 22, 'sam@example.com', 'Male', '+112233445', 'London, UK', 'Sam Smith', 'Good', NULL, 0, 0, 0, 0, 'Normal'),
(108, 'A+', 23, 'sara@example.com', 'Female', '+998877665', 'Paris, France', 'Sara Johnson', 'Good', NULL, 0, 0, 0, 0, 'Normal'),
(109, 'A+', 24, 'mike@example.com', 'Male', '+1122334455', 'Berlin, Germany', 'Mike Brown', 'Good', NULL, 0, 0, 0, 0, 'Normal'),
(111, 'B+', 22, 'aayu234@gmail.com', 'Female', '9860578703', 'suncity,pepsicola ', 'Aayusha Lamichhane', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(112, 'B-', 23, 'dipeshbhujel12@gmail.com', 'Male', '986057789', 'Nalinchowk,Suryavinayk', 'Dipesh bhujel', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(113, 'B+', 20, 'nihukc456@gmail.com', 'Female', '9813455634', 'Tripureshwor ,Kathmandu', 'Niharika kc', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `donor_ratings`
--

CREATE TABLE `donor_ratings` (
  `id` int(11) NOT NULL,
  `donor_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `rated_by_user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donor_ratings`
--

INSERT INTO `donor_ratings` (`id`, `donor_id`, `rating`, `rated_by_user_id`, `created_at`, `updated_at`) VALUES
(1, 4, 5, 2, '2024-04-19 19:21:18', '2024-04-19 19:21:18'),
(2, 4, 5, 2, '2024-04-19 19:21:20', '2024-04-19 19:21:20'),
(3, 4, 5, 2, '2024-04-19 19:21:21', '2024-04-19 19:21:21'),
(4, 4, 5, 2, '2024-04-19 19:21:22', '2024-04-19 19:21:22'),
(5, 4, 5, 2, '2024-04-19 19:21:23', '2024-04-19 19:21:23'),
(6, 4, 5, 2, '2024-04-19 19:21:49', '2024-04-19 19:21:49'),
(7, 4, 5, 2, '2024-04-19 19:21:50', '2024-04-19 19:21:50'),
(8, 4, 5, 2, '2024-04-19 19:21:51', '2024-04-19 19:21:51'),
(9, 4, 3, 2, '2024-04-19 19:21:54', '2024-04-19 19:21:54'),
(10, 4, 3, 2, '2024-04-19 19:21:54', '2024-04-19 19:21:54'),
(11, 4, 3, 2, '2024-04-19 19:21:55', '2024-04-19 19:21:55'),
(12, 4, 3, 2, '2024-04-19 19:21:56', '2024-04-19 19:21:56'),
(13, 4, 3, 2, '2024-04-19 19:21:56', '2024-04-19 19:21:56'),
(14, 4, 3, 2, '2024-04-19 19:22:04', '2024-04-19 19:22:04'),
(15, 4, 3, 2, '2024-04-19 19:22:04', '2024-04-19 19:22:04'),
(16, 4, 4, 2, '2024-04-19 19:23:54', '2024-04-19 19:23:54'),
(17, 4, 4, 2, '2024-04-19 19:23:55', '2024-04-19 19:23:55'),
(18, 4, 4, 2, '2024-04-19 19:23:56', '2024-04-19 19:23:56'),
(19, 4, 4, 2, '2024-04-19 19:23:56', '2024-04-19 19:23:56'),
(20, 4, 4, 2, '2024-04-19 19:23:57', '2024-04-19 19:23:57'),
(21, 4, 4, 2, '2024-04-19 19:27:10', '2024-04-19 19:27:10'),
(22, 4, 3, 2, '2024-04-21 09:07:08', '2024-04-21 09:07:08'),
(23, 4, 5, 2, '2024-04-21 09:26:54', '2024-04-21 09:26:54');

-- --------------------------------------------------------

--
-- Table structure for table `donor_requests`
--

CREATE TABLE `donor_requests` (
  `id` int(11) NOT NULL,
  `donor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `message` text DEFAULT NULL,
  `status` varchar(25) NOT NULL DEFAULT 'Pending',
  `recipient_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donor_requests`
--

INSERT INTO `donor_requests` (`id`, `donor_id`, `user_id`, `requested_at`, `message`, `status`, `recipient_name`) VALUES
(4, 1, 2, '2024-04-22 15:55:20', 'w', 'denied', 'Aaron'),
(8, 1, 29, '2024-04-22 15:55:20', 'please prove us a blood in recent days', 'denied', 'Anika Deva'),
(9, 5, 28, '2024-04-22 07:14:30', 'help us out in blood transfusion on next Monday', 'pending', 'Bhawani lamichhane');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `stf_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_age` int(11) NOT NULL,
  `user_phone` varchar(20) NOT NULL,
  `slot_time` datetime NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `unit` int(11) NOT NULL,
  `donation_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `stf_id`, `user_id`, `user_name`, `user_age`, `user_phone`, `slot_time`, `blood_group`, `unit`, `donation_time`) VALUES
(3, 4, 1, 'Anish', 25, '1234567890', '2024-03-08 04:15:00', 'A-', 3, '2024-04-08 18:55:16'),
(4, 4, 27, 'Dipesh bhujel', 23, '986057789', '2024-04-17 00:05:00', 'B-', 2, '2024-04-20 20:57:22'),
(5, 4, 30, 'Niharika kc', 20, '9813455634', '2024-04-24 15:00:00', 'B+', 2, '2024-04-22 06:56:41');

-- --------------------------------------------------------

--
-- Table structure for table `premium_donors`
--

CREATE TABLE `premium_donors` (
  `premium_donor_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `donor_health` varchar(25) NOT NULL,
  `previous_dontaion` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `premium_donors`
--

INSERT INTO `premium_donors` (`premium_donor_id`, `user_id`, `latitude`, `longitude`, `availability`, `profile_picture`, `donor_health`, `previous_dontaion`) VALUES
(1, 1, 27.678376, 85.451768, 'available', 'profilePicture-1709449055365-993617724.jpeg', 'good', '3m ago'),
(2, 4, 27.675600, 85.345900, 'Notavailable', 'profilePicture-1712412773992-35142026.jpeg', 'good', 'no'),
(4, 26, 26.899900, 27.877470, 'Available', 'profilePicture-1713079962405-646438058.jpeg', 'good', 'no'),
(5, 30, 27.695000, 65.314900, 'Available', 'profilePicture-1713767170309-712027580.jpeg', 'good', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `recipient_inventory`
--

CREATE TABLE `recipient_inventory` (
  `id` int(11) NOT NULL,
  `recipient_name` varchar(255) NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipient_inventory`
--

INSERT INTO `recipient_inventory` (`id`, `recipient_name`, `blood_group`, `email`, `age`, `address`, `phone`) VALUES
(2, 'Kushum kafle', 'A+', 'anishlamichhane65@gmail.com', 23, 'Maitighar,kathmandu', '9813318711'),
(4, 'Srijan Lamichhane', 'A+', 'Sirulamichhane45@gmail.com', 30, 'New thimi BKT', '9813318754'),
(5, 'Srijan Lamichhane', 'A+', 'Sirulamichhane45@gmail.com', 30, 'New thimi BKT', '9813318754'),
(6, 'Srijan Lamichhane', 'A+', 'Sirulamichhane45@gmail.com', 30, 'New thimi BKT', '9813318754'),
(7, 'Anika Deva', 'AB-', 'anikadeva54@gmail.com', 20, 'Surya Vinayak, Bhaktapur', '981345678');

-- --------------------------------------------------------

--
-- Table structure for table `rider_login`
--

CREATE TABLE `rider_login` (
  `login_id` int(11) NOT NULL,
  `rider_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rider_login`
--

INSERT INTO `rider_login` (`login_id`, `rider_id`, `username`, `password`, `created_at`) VALUES
(1, 1, 'Srijan', '$2b$10$EJ5SP7S2V1jPqNfHMJdgtej1waN69cq566qgXq7uxydewcniDuS4q', '2024-03-30 16:13:46');

-- --------------------------------------------------------

--
-- Table structure for table `ride_requests`
--

CREATE TABLE `ride_requests` (
  `ride_id` int(11) NOT NULL,
  `request_id` int(11) DEFAULT NULL,
  `rider_id` int(11) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `donor_id` int(11) DEFAULT NULL,
  `donor_details` text DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `userPhone` varchar(20) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `status` varchar(25) NOT NULL,
  `recipient_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ride_requests`
--

INSERT INTO `ride_requests` (`ride_id`, `request_id`, `rider_id`, `destination`, `donor_id`, `donor_details`, `latitude`, `longitude`, `userName`, `userPhone`, `staff_id`, `status`, `recipient_name`) VALUES
(12, 10, 1, 'OM hospital', 1, '[{\"premium_donor_id\":1,\"user_id\":1,\"latitude\":\"27.678376\",\"longitude\":\"85.451768\",\"availability\":\"Available\",\"profile_picture\":\"profilePicture-1709449055365-993617724.jpeg\",\"donor_health\":\"good\",\"previous_dontaion\":\"3m ago\",\"userName\":\"Anish Lamichhane\",\"userPhone\":\"1234567890\",\"userAddress\":\"123 Main St\",\"Recipent_name\":\"Anika Deva\"}]', 27.67837600, 85.45176800, 'Anish Lamichhane', '1234567890', 3, 'ended', 'Anika Deva'),
(13, 9, 1, 'hh', 2, '[{\"premium_donor_id\":2,\"user_id\":4,\"latitude\":\"27.675600\",\"longitude\":\"85.345900\",\"availability\":\"Notavailable\",\"profile_picture\":\"profilePicture-1712412773992-35142026.jpeg\",\"donor_health\":\"good\",\"previous_dontaion\":\"no\",\"userName\":\"Aaron\",\"userPhone\":\"1234567890\",\"userAddress\":\"123 Main St\",\"Recipent_name\":\"Bhawani lamichhane\"}]', 27.67560000, 85.34590000, 'Aaron', '1234567890', 3, '', 'Bhawani lamichhane');

-- --------------------------------------------------------

--
-- Table structure for table `started_rides`
--

CREATE TABLE `started_rides` (
  `id` int(11) NOT NULL,
  `donor_id` int(11) DEFAULT NULL,
  `ride_id` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `end_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `started_rides`
--

INSERT INTO `started_rides` (`id`, `donor_id`, `ride_id`, `location`, `start_time`, `status`, `end_time`) VALUES
(11, 1, 12, 'bkt', '2024-04-22 18:04:00', 'ended', '2024-04-22 19:05:00');

-- --------------------------------------------------------

--
-- Table structure for table `stf_details`
--

CREATE TABLE `stf_details` (
  `id` int(11) NOT NULL,
  `stfName` varchar(255) DEFAULT NULL,
  `stfMail` varchar(255) DEFAULT NULL,
  `stfPhone` varchar(15) DEFAULT NULL,
  `stfAddress` text DEFAULT NULL,
  `stfStaffType` varchar(255) DEFAULT NULL,
  `avatar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stf_details`
--

INSERT INTO `stf_details` (`id`, `stfName`, `stfMail`, `stfPhone`, `stfAddress`, `stfStaffType`, `avatar`) VALUES
(3, 'Anish leo', 'Barcaboyanish@gmail.com', '98133567', 'new delhi', 'Staff', 'avatar-1713205805260-233232772.png'),
(4, 'anish lamichhane', 'anishlamichhane65@gmail.com', '9813318711', 'Maitighar,kathmandu', 'Doctor', 'profilePicture-1709214930421-276081155.jpeg'),
(5, 'roman', 'roman123@gmail.com', '9813318733', 'Pokhara', '22', 's'),
(6, 'Pralhad lamichhane', 'Pralhadlamichhane@gmail.com', '9813318711', 'Maitighar,kathmandu', 'Admin', ''),
(7, 'manoj2', 'newemaigmailcom', '9867554323', 'lokanthalbk', 'Staff', 'avatar-1712999797225-997804015.png'),
(8, 'Amit Baniya', 'amitbaniya65@gmail.com', '9841111111', 'dhobighat sanepa', 'Staff', 'avatar-1713153602190-778241617.png'),
(9, 'ANISH lamichhane', 'barcaboyanish14@gmail.com', '9813318711', 'Maitighar,kathmandu', 'Staff', 'avatar-1713651967171-369069429.png'),
(11, 'Bibek pulami', 'pulmaibibek675@gmai.com', '9876543209', 'Bode, purani thimi', 'Doctor', 'avatar-1713772297220-228740953.png');

-- --------------------------------------------------------

--
-- Table structure for table `stf_login`
--

CREATE TABLE `stf_login` (
  `staff_id` int(11) NOT NULL,
  `stf_id` int(11) DEFAULT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `stfStaffType` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stf_login`
--

INSERT INTO `stf_login` (`staff_id`, `stf_id`, `userName`, `password`, `stfStaffType`) VALUES
(1, 3, 'leomessi10', '$2b$10$Un51tHedXWabt8DxkGph5.WA89bwlOmAwp9yxXWKDN4cmNKRAQq56', 'Staff'),
(2, 4, 'pedri', '$2b$10$GAKNa/.v.gYI/Nf7uQ5lueHlzGrN58hi1rgVm.JE5L7A/8miA/dpW', 'Doctor'),
(3, 5, 'roman', '$2b$10$n/06EI2VynA4iABZcCNd3OTEH2KdKi2tKw7KMcB19Gh1lCOwn2/Ti', 'Staff'),
(4, 6, 'Admin', '$2b$10$mASRMlwY0xI38flHQ9PRKOswxVYDXPX1gOHXNZ0oLh82K6VSRE5pG', 'Admin'),
(5, 7, 'giri245', '$2b$10$VhMQ23LxMsz7exQ0jWjtjOgu.wHsUvSh1IB6cMNtlf6CpGrMfWVrC', 'Staff'),
(7, 9, 'roman22', '$2b$10$nTJdKS78c40nxWy9HiNFfOYW83cBM0yW1PBgHxaYDOkI2/FiCZUvu', 'Staff'),
(9, 11, 'bibek10', '$2b$10$aueJjUBHVL8ouZKugwqi8eE8KvX/wXNcnvN21Jh8z6NpU5IV/.1du', 'Doctor');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` int(11) NOT NULL,
  `stf_id` int(11) NOT NULL,
  `stf_staff_type` varchar(255) NOT NULL,
  `slot_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`id`, `stf_id`, `stf_staff_type`, `slot_time`) VALUES
(1, 4, 'Doctor', '2024-04-17 00:00:00'),
(4, 4, 'Doctor', '2024-04-17 00:05:00'),
(5, 4, 'Doctor', '2024-04-22 04:00:00'),
(6, 4, 'Doctor', '2024-04-21 00:00:00'),
(24, 4, 'Doctor', '2024-04-16 00:00:00'),
(25, 4, 'Doctor', '2024-04-18 00:00:00'),
(26, 4, 'Doctor', '2024-04-19 00:00:00'),
(30, 4, 'Doctor', '2024-04-24 15:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `urgent_requests`
--

CREATE TABLE `urgent_requests` (
  `id` int(11) NOT NULL,
  `donor_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `required_by_time` varchar(25) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `Recipent_name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `urgent_requests`
--

INSERT INTO `urgent_requests` (`id`, `donor_id`, `user_id`, `requested_at`, `required_by_time`, `message`, `location`, `Recipent_name`) VALUES
(9, 2, 28, '2024-04-15 13:50:35', '2024-04-15 20:05:35.828', 'ss', 'hh', 'Bhawani lamichhane'),
(10, 1, 29, '2024-04-21 19:32:24', '2024-04-22 01:47:24.236', 'please prove us a blood in recent days', 'OM hospital', 'Anika Deva');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `userAge` int(11) DEFAULT NULL,
  `userGender` varchar(10) DEFAULT NULL,
  `userBloodGroup` varchar(5) DEFAULT NULL,
  `userPhone` varchar(15) DEFAULT NULL,
  `userEmail` varchar(255) DEFAULT NULL,
  `userAddress` text DEFAULT NULL,
  `userRole` enum('Donor','Recipient') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `userName`, `userAge`, `userGender`, `userBloodGroup`, `userPhone`, `userEmail`, `userAddress`, `userRole`) VALUES
(1, 'Anish Lamichhane', 25, 'Male', 'A+', '1234567890', 'anishlamichhane65@gmail.com', '123 Main St', 'Donor'),
(2, 'Aaron sharma', 27, 'Male', 'A+', '1234567890', 'anishlamichhane464@gmail.com', '123 Main St', 'Recipient'),
(4, 'Prastav Lamichhane', 25, 'Male', 'A-', '9813318733', 'pratav650@gmail.com', 'Thimi Bhaktapur', 'Donor'),
(7, 'Amit baniya', 23, 'Male', 'AB+', '9841111111', 'amitbaniya32@gmail.com', 'dhobighat sanepa', 'Donor'),
(8, 'Kushum Kafle', 20, 'Female', 'AB+', '9841258795', 'lushum23@gmail.com', 'Maitighar,kathmandu', 'Recipient'),
(9, 'Rabin Karki', 20, 'Male', 'AB-', '9814456777', 'rabinkarki32@gmail.com', 'kamalbinayak,bkt', 'Donor'),
(22, 'John Doe', 30, 'Male', 'A+', '1234567890', 'john.doe@gmail.com', '123 Main St, City', 'Donor'),
(24, 'John Doe', 30, 'Male', 'A+', '1234567890', 'leomessi@gmail.com', '123 Main St, City', 'Donor'),
(26, 'Aayusha Lamichhane', 22, 'Female', 'B+', '9860578703', 'aayu234@gmail.com', 'suncity,pepsicola ', 'Donor'),
(27, 'Dipesh bhujel', 23, 'Male', 'B-', '986057789', 'dipeshbhujel12@gmail.com', 'Nalinchowk,Suryavinayk', 'Donor'),
(28, 'Bhawani lamichhane', 45, 'Female', 'B+', '9813859020', 'Bhawaniamichhane65@gmail.com', 'Changunarayan,7 bkt', 'Recipient'),
(29, 'Anika Deva', 20, 'Female', 'AB-', '981345678', 'anikadeva54@gmail.com', 'Surya Vinayak, Bhaktapur', 'Recipient'),
(30, 'Niharika kc', 20, 'Female', 'B+', '9813455634', 'nihukc456@gmail.com', 'Tripureshwor ,Kathmandu', 'Donor');

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `userPassword` varchar(255) DEFAULT NULL,
  `token` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`id`, `user_id`, `username`, `userPassword`, `token`) VALUES
(1, 1, 'anish', '$2b$10$917uDWgbs/fLZvBJ.0G.BOKkWe02grCSHAEqSPhY9zQe0JK4eYaRi', 'fdff6e82a8f6577baaf605ca67a83a5e8b7360a0'),
(2, 2, 'aaron', '$2b$10$0AzlPrYrHF611Ok9sGTvpu4HPeqDc2mOLP4tNOc8VFWw.YGJImV5O', '5507c7fdd6b7be8e11d87aaa73f2bece74d133fc'),
(4, 4, 'Prastav65', '$2b$10$dUpYSltVUOvKnkwiDj5nkun0Aecn.Iqr3OJABemrHRkQIMuW5QDOO', ''),
(7, 7, 'Amit65', '$2b$10$IR4ISOhQ72vAc8PR.Vg4iuXClSMfL5H8u4r0tw39kQ40KvlcJ.SWe', ''),
(8, 8, 'kushum100', '$2b$10$o9YK4FxHlgkWmt9PMP0bVeu7718JjWnz.rxXpAJVBP.L.T8NpVY1y', ''),
(9, 9, 'Rabin234', '$2b$10$LQKkp5tu1mgQhrlCIBMgB.gQIyp2zSeX3aKPNBY3dYI2BEjVBZztO', ''),
(22, 22, 'john_doe', '$2b$10$0IVJ6k5IXgsCkyaM8pn2v.UY6qQ4dYdbTuJq9G6H.uAffHsPU21PS', ''),
(24, 24, 'Leo_messi', '$2b$10$T/ugMPDe1QyLojGn8wx7A.WpICw/SexVdIKSFnX9Ws8SyCMRkmOmG', ''),
(26, 26, 'Aayusha11', '$2b$10$5uUFF5QePViZAeng.Wh41OyT0/qGQ8H3Upl0lobwSSPE8BRQ0jyee', ''),
(28, 28, 'bhawani1', '$2b$10$KmK739Kist4.SUyRbrTy.OcfOQXh4NKj/LRbQX5tNlb3mhW0clylu', ''),
(29, 29, 'Anika100', '$2b$10$mW8T2XNiGtJnStzQKzKKeOsS1cs9QoT/ZBUfSvtGpu/cBj371g6Xe', ''),
(30, 30, 'niharika110', '$2b$10$vR5WGx9Rb9G4kV79ZR7Zgutuq1T8gdJPXWYbaLwj55K4tb4NgFkHa', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `stf_id` (`stf_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `slot_time` (`slot_time`);

--
-- Indexes for table `bloodbank_riders`
--
ALTER TABLE `bloodbank_riders`
  ADD PRIMARY KEY (`rider_id`);

--
-- Indexes for table `blood_bank`
--
ALTER TABLE `blood_bank`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `blood_donations`
--
ALTER TABLE `blood_donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `bank_id` (`bank_id`);

--
-- Indexes for table `blood_donation_feedback`
--
ALTER TABLE `blood_donation_feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `fk_history_stf_id` (`stf_id`);

--
-- Indexes for table `blood_inventory`
--
ALTER TABLE `blood_inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blood_request`
--
ALTER TABLE `blood_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `camps`
--
ALTER TABLE `camps`
  ADD PRIMARY KEY (`camp_id`),
  ADD KEY `bank_id` (`bank_id`);

--
-- Indexes for table `camp_donations`
--
ALTER TABLE `camp_donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `camp_id` (`camp_id`);

--
-- Indexes for table `confirmedappointments`
--
ALTER TABLE `confirmedappointments`
  ADD PRIMARY KEY (`confirmed_appointment_id`),
  ADD KEY `stf_id` (`stf_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `slot_time` (`slot_time`);

--
-- Indexes for table `donor_inventory`
--
ALTER TABLE `donor_inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donor_ratings`
--
ALTER TABLE `donor_ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donor_id` (`donor_id`),
  ADD KEY `rated_by_user_id` (`rated_by_user_id`);

--
-- Indexes for table `donor_requests`
--
ALTER TABLE `donor_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donor_id` (`donor_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `history_ibfk_1` (`stf_id`);

--
-- Indexes for table `premium_donors`
--
ALTER TABLE `premium_donors`
  ADD PRIMARY KEY (`premium_donor_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `recipient_inventory`
--
ALTER TABLE `recipient_inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rider_login`
--
ALTER TABLE `rider_login`
  ADD PRIMARY KEY (`login_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `rider_id` (`rider_id`);

--
-- Indexes for table `ride_requests`
--
ALTER TABLE `ride_requests`
  ADD PRIMARY KEY (`ride_id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `rider_id` (`rider_id`);

--
-- Indexes for table `started_rides`
--
ALTER TABLE `started_rides`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donor_id` (`donor_id`),
  ADD KEY `ride_id` (`ride_id`);

--
-- Indexes for table `stf_details`
--
ALTER TABLE `stf_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stf_login`
--
ALTER TABLE `stf_login`
  ADD PRIMARY KEY (`staff_id`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD KEY `stf_id` (`stf_id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stf_id` (`stf_id`);

--
-- Indexes for table `urgent_requests`
--
ALTER TABLE `urgent_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donor_id` (`donor_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `bloodbank_riders`
--
ALTER TABLE `bloodbank_riders`
  MODIFY `rider_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blood_bank`
--
ALTER TABLE `blood_bank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `blood_donations`
--
ALTER TABLE `blood_donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `blood_donation_feedback`
--
ALTER TABLE `blood_donation_feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blood_inventory`
--
ALTER TABLE `blood_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `blood_request`
--
ALTER TABLE `blood_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `camps`
--
ALTER TABLE `camps`
  MODIFY `camp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `camp_donations`
--
ALTER TABLE `camp_donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `confirmedappointments`
--
ALTER TABLE `confirmedappointments`
  MODIFY `confirmed_appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `donor_inventory`
--
ALTER TABLE `donor_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `donor_ratings`
--
ALTER TABLE `donor_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `donor_requests`
--
ALTER TABLE `donor_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `premium_donors`
--
ALTER TABLE `premium_donors`
  MODIFY `premium_donor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `recipient_inventory`
--
ALTER TABLE `recipient_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rider_login`
--
ALTER TABLE `rider_login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ride_requests`
--
ALTER TABLE `ride_requests`
  MODIFY `ride_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `started_rides`
--
ALTER TABLE `started_rides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `stf_details`
--
ALTER TABLE `stf_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `stf_login`
--
ALTER TABLE `stf_login`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `urgent_requests`
--
ALTER TABLE `urgent_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`stf_id`) REFERENCES `stf_details` (`id`);

--
-- Constraints for table `blood_donations`
--
ALTER TABLE `blood_donations`
  ADD CONSTRAINT `blood_donations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`id`);

--
-- Constraints for table `blood_request`
--
ALTER TABLE `blood_request`
  ADD CONSTRAINT `blood_request_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`id`);

--
-- Constraints for table `camps`
--
ALTER TABLE `camps`
  ADD CONSTRAINT `camps_ibfk_1` FOREIGN KEY (`bank_id`) REFERENCES `blood_bank` (`id`);

--
-- Constraints for table `camp_donations`
--
ALTER TABLE `camp_donations`
  ADD CONSTRAINT `camp_donations_ibfk_1` FOREIGN KEY (`camp_id`) REFERENCES `camps` (`camp_id`);

--
-- Constraints for table `confirmedappointments`
--
ALTER TABLE `confirmedappointments`
  ADD CONSTRAINT `confirmedappointments_ibfk_1` FOREIGN KEY (`stf_id`) REFERENCES `stf_details` (`id`),
  ADD CONSTRAINT `confirmedappointments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`id`);

--
-- Constraints for table `donor_ratings`
--
ALTER TABLE `donor_ratings`
  ADD CONSTRAINT `donor_ratings_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `premium_donors` (`premium_donor_id`),
  ADD CONSTRAINT `donor_ratings_ibfk_2` FOREIGN KEY (`rated_by_user_id`) REFERENCES `user_details` (`id`);

--
-- Constraints for table `donor_requests`
--
ALTER TABLE `donor_requests`
  ADD CONSTRAINT `donor_requests_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `premium_donors` (`premium_donor_id`),
  ADD CONSTRAINT `donor_requests_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`id`);

--
-- Constraints for table `premium_donors`
--
ALTER TABLE `premium_donors`
  ADD CONSTRAINT `premium_donors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`id`);

--
-- Constraints for table `rider_login`
--
ALTER TABLE `rider_login`
  ADD CONSTRAINT `rider_login_ibfk_1` FOREIGN KEY (`rider_id`) REFERENCES `bloodbank_riders` (`rider_id`) ON DELETE CASCADE;

--
-- Constraints for table `ride_requests`
--
ALTER TABLE `ride_requests`
  ADD CONSTRAINT `ride_requests_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `urgent_requests` (`id`),
  ADD CONSTRAINT `ride_requests_ibfk_2` FOREIGN KEY (`rider_id`) REFERENCES `bloodbank_riders` (`rider_id`);

--
-- Constraints for table `started_rides`
--
ALTER TABLE `started_rides`
  ADD CONSTRAINT `started_rides_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `premium_donors` (`premium_donor_id`),
  ADD CONSTRAINT `started_rides_ibfk_2` FOREIGN KEY (`ride_id`) REFERENCES `ride_requests` (`ride_id`);

--
-- Constraints for table `stf_login`
--
ALTER TABLE `stf_login`
  ADD CONSTRAINT `stf_login_ibfk_1` FOREIGN KEY (`stf_id`) REFERENCES `stf_details` (`id`);

--
-- Constraints for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD CONSTRAINT `time_slots_ibfk_1` FOREIGN KEY (`stf_id`) REFERENCES `stf_details` (`id`);

--
-- Constraints for table `urgent_requests`
--
ALTER TABLE `urgent_requests`
  ADD CONSTRAINT `urgent_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `urgent_requests_ibfk_2` FOREIGN KEY (`donor_id`) REFERENCES `premium_donors` (`premium_donor_id`) ON UPDATE CASCADE;

--
-- Constraints for table `user_login`
--
ALTER TABLE `user_login`
  ADD CONSTRAINT `user_login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

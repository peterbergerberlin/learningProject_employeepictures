-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 17. Jun 2020 um 16:12
-- Server-Version: 10.4.11-MariaDB
-- PHP-Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `mitarbeiterbilderprojekt`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `mitarbeiterbilder`
--

CREATE TABLE `mitarbeiterbilder` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `vorname` varchar(100) NOT NULL,
  `nachname` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `gebaeude` varchar(100) NOT NULL,
  `raum` varchar(100) NOT NULL,
  `bilddateiname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `mitarbeiterbilder`
--

INSERT INTO `mitarbeiterbilder` (`id`, `userid`, `vorname`, `nachname`, `position`, `gebaeude`, `raum`, `bilddateiname`) VALUES
(1, 1, 'Peter', 'Berger', 'Frontend Developer', 'Gebäude 2', 'Raum 208', '1_peter_berger.jpg'),
(2, 2, 'Horst', 'Schlaemmer', 'Backend Developer', 'Gebäude 2', 'Raum 207', '2_horst_schlaemmer.jpg'),
(3, 3, 'Bernd', 'Stromberg', 'Chef vom Dienst', 'Gebäude 2', 'Raum 310', '3_bernd_stromberg.jpg'),
(14, 4, 'Linus', 'Neumann', 'Fullstack Developer und Psychologe', 'Gebäude 2', 'Raum 5a', 'fi_connect_Referenten_1170px_neumann.jpg'),
(15, 5, 'Tim', 'Pritlove', 'Fullstack Developer und Podcaster', 'Gebäude 2', 'Raum 5b', 'tim_pritlove.jpg'),
(24, 6, 'Jade', 'Raymond', 'Gamedeveloper', 'Gebäude 2', 'Raum 5c', 'jaderaymond-1200x900.jpg');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `mitarbeiterbilder`
--
ALTER TABLE `mitarbeiterbilder`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `mitarbeiterbilder`
--
ALTER TABLE `mitarbeiterbilder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

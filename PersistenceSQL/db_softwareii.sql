-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-05-2018 a las 16:03:00
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_softwareii`
--
CREATE DATABASE IF NOT EXISTS `db_softwareii` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `db_softwareii`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cars`
--

DROP TABLE IF EXISTS `cars`;
CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `owner` varchar(50) NOT NULL,
  `team` varchar(50) NOT NULL, 
  `spendingGas` float NOT NULL,
  `model` varchar(50) NOT NULL,
  `seats` int(11) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `cars`:
--

--
-- Truncar tablas antes de insertar `cars`
--

TRUNCATE TABLE `cars`;
--
-- Volcado de datos para la tabla `cars`
--

INSERT INTO `cars` (`id`, `ownerId`, `owner`, `spendingGas`, `model`) VALUES
(1, 1, 'Pablo', 12, 'ferrary'),
(2, 2, 'Dani', 5, 'Daewoo Matiz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pavilions`
--

DROP TABLE IF EXISTS `pavilions`;
CREATE TABLE `pavilions` (
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `pavilions`:
--

--
-- Truncar tablas antes de insertar `pavilions`
--

TRUNCATE TABLE `pavilions`;
--
-- Volcado de datos para la tabla `pavilions`
--

INSERT INTO `pavilions` (`name`) VALUES
('benito camela'),
('tu casa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `players`
--

DROP TABLE IF EXISTS `players`;
CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `team` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `nick` varchar(50) NOT NULL,
  `dorsal` int(11) NOT NULL,
  `debt` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `players`:
--

--
-- Truncar tablas antes de insertar `players`
--

TRUNCATE TABLE `players`;
--
-- Volcado de datos para la tabla `players`
--

INSERT INTO `players` (`id`, `team`, `name`, `email`, `nick`, `debt`) VALUES
(1, 'Cuatro Valles', 'Pablo', 'pablo@yo.com', 'Pablo', 0),
(2, 'Cuatro Valles', 'Daniel', 'dani@yo.com', 'Dani', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teams`
--

DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
  `name` varchar(50) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `teams`:
--

--
-- Truncar tablas antes de insertar `teams`
--

TRUNCATE TABLE `teams`;
--
-- Volcado de datos para la tabla `teams`
--

INSERT INTO `teams` (`name`) VALUES
('Cuatro Valles'),
('Delicias');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teams_pav_rel`
--

DROP TABLE IF EXISTS `teams_pav_rel`;
CREATE TABLE `teams_pav_rel` (
  `team` varchar(50) NOT NULL,
  `pavilion` varchar(50) NOT NULL,
  `distance` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `teams_pav_rel`:
--

--
-- Truncar tablas antes de insertar `teams_pav_rel`
--

TRUNCATE TABLE `teams_pav_rel`;
--
-- Volcado de datos para la tabla `teams_pav_rel`
--

INSERT INTO `teams_pav_rel` (`team`, `pavilion`, `distance`) VALUES
('Cuatro Valles', 'tu casa', 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pavilions`
--
ALTER TABLE `pavilions`
  ADD PRIMARY KEY (`name`);

--
-- Indices de la tabla `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`name`);

--
-- Indices de la tabla `teams_pav_rel`
--
ALTER TABLE `teams_pav_rel`
  ADD PRIMARY KEY (`team`,`pavilion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
 

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
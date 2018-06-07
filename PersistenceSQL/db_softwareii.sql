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
  `gasPrice` float NOT NULL,
  `model` varchar(50) NOT NULL,
  `seats` int(11) NOT NULL
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

INSERT INTO `cars` (`id`, `ownerId`, `owner`, `team`, `spendingGas`, `model`) VALUES
(1, 1, 'Pablo', 'Cuatro Valles', 12, 'ferrary'),
(2, 2, 'Dani', 'Cuatro Valles', 5, 'Daewoo Matiz');

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

INSERT INTO `players` (`id`, `team`, `name`, `email`, `nick`, `password`, `debt`) VALUES
(1, 'Cuatro Valles', 'Pablo', 'pablo@yo.com', 'Pablo', 'Pablo0', 0),
(2, 'Cuatro Valles', 'Daniel', 'dani@yo.com', 'Dani', 'Dani0', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teams`
--

DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
  `name` varchar(50) NOT NULL
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
-- Estructura de tabla para la tabla `pavilions`
--

DROP TABLE IF EXISTS `pavilions`;
CREATE TABLE `pavilions` (
  `id`  int(11) NOT NULL,
  `team` varchar(50) NOT NULL,
  `pavilion` varchar(50) NOT NULL,
  `distance` double NOT NULL
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

INSERT INTO `pavilions` (`id`, `team`, `pavilion`, `distance`) VALUES
(1,'Cuatro Valles', 'tu casa', 5);

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
  ADD PRIMARY KEY (`id`);

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

  ALTER TABLE `pavilions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
 


/*Tablas del historico, posibles cambios*/
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historic`
--
DROP TABLE IF EXISTS `historic`;
CREATE TABLE `historic` (
  `date` varchar(12) NOT NULL,
  `team` varchar(40) NOT NULL,
  `pavilionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tripCars`
--
DROP TABLE IF EXISTS `tripCars`;
CREATE TABLE `tripCars` (
  `date` varchar(12) NOT NULL,
  `team` varchar(40) NOT NULL,
  `carId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `tripPlayers`
--
DROP TABLE IF EXISTS `tripPlayers`;
CREATE TABLE `tripPlayers` (
  `date` varchar(12) NOT NULL,
  `team` varchar(40) NOT NULL,
  `playerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (`token` varchar(14) NOT NULL, `email` varchar(40) NOT NULL);
--
-- Indices de la tabla `historic`
--
ALTER TABLE `historic`
  ADD PRIMARY KEY (`date`, `team`);
--
-- Indices de la tabla `tripCars`
--
ALTER TABLE `tripCars`
  ADD PRIMARY KEY (`date`, `team` ,`carId`);
--
-- Indices de la tabla `tripPlayers`
--
ALTER TABLE `tripPlayers`
  ADD PRIMARY KEY (`date`,`team`, `playerId`);



--
-- Restricciones
--
ALTER TABLE `cars` (
  DROP CONSTRAINT team
  ADD CONSTRAINT teamCarConst
    FOREIGN KEY (team)
    REFERENCES teams (name)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  DROP CONSTRAINT owner,
  DROP CONSTRAINT ownerId,  
  ADD CONSTRAINT playerCarConst
    FOREIGN KEY (owner, ownerId)
    REFERENCES players (name, id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

ALTER TABLE `players`
  ADD CONSTRAINT teamPlayerConst
    FOREIGN KEY (team)
    REFERENCES teams (name)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE `pavilions`
  ADD CONSTRAINT teamPavConst
    FOREIGN KEY (team)
    REFERENCES teams (name)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

ALTER TABLE `historic`
  ADD CONSTRAINT teamHistoricConst
    FOREIGN KEY (team)
    REFERENCES teams (name)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
  ADD CONSTRAINT pavHistoricConst
    FOREIGN KEY (pavilionId)
    REFERENCES pavilions (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE `tripCars`
  ADD CONSTRAINT teamTCarsConst
    FOREIGN KEY (team)
    REFERENCES teams (name)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
  ADD CONSTRAINT historicTCarConst
    FOREIGN KEY (date)
    REFERENCES historic (date)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE `tripPlayers`
  ADD CONSTRAINT teamTPlayersConst
    FOREIGN KEY (team)
    REFERENCES teams (name)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
  ADD CONSTRAINT historicTPlayersConst
    FOREIGN KEY (date)
    REFERENCES historic (date)
    ON DELETE CASCADE
    ON UPDATE CASCADE;




/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
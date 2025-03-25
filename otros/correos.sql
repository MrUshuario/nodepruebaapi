-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-03-2025 a las 23:41:33
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bcnclean`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `correos`
--

CREATE TABLE `correos` (
  `id` int(11) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `NIF` int(11) NOT NULL,
  `Telefono` int(11) NOT NULL,
  `Direccion` varchar(50) DEFAULT NULL,
  `Edificio` varchar(25) DEFAULT NULL,
  `Puntaje` int(11) DEFAULT NULL,
  `MetrosTerreno` int(11) DEFAULT NULL,
  `Comentario` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `correos`
--

INSERT INTO `correos` (`id`, `Correo`, `Nombres`, `NIF`, `Telefono`, `Direccion`, `Edificio`, `Puntaje`, `MetrosTerreno`, `Comentario`) VALUES
(34, 'prueba58@gmail.com', 'Edgar Poma', 0, 2147483647, '', 'Empresa', 0, 1000, 'asd'),
(35, 'lenonpoma@gmail.com', 'Edgar', 1000, 9000, 'Lima', 'AAA', 0, 100, 'PRUEBA'),
(36, 'lenonpomaaa@gmail.com', 'Edgar', 1000, 9000, 'Lima', 'AAA', 0, 100, 'PRUEBA'),
(37, 'prueba7998@gmail.com', 'Ed Ad', 0, 2147483647, '', 'Hogar', 0, 500000000, 'ASD'),
(38, 'prueba799a8@gmail.com', 'Ed Ad', 0, 2147483647, '', 'Hogar', 0, 500000000, 'ASD'),
(39, 'prueba79a9a8@gmail.com', 'Ed Ad', 0, 2147483647, '', 'Hogar', 0, 500000000, 'ASD'),
(40, 'prueba79a9aa8@gmail.com', 'Ed Ad', 0, 2147483647, '', 'Hogar', 0, 500000000, 'ASD'),
(41, 'lenonpomaaaa@gmail.com', 'Edgar', 1000, 9000, 'Lima', 'AAA', 0, 100, 'PRUEBA'),
(42, 'prueb9a9aa8@gmail.com', 'Ed Ad', 0, 2147483647, '', 'Hogar', 0, 500000000, 'ASD'),
(43, 'pruaaz8@gmail.com', 'Ed Ad', 0, 2147483647, '', 'Hogar', 0, 500000000, 'ASD');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `correos`
--
ALTER TABLE `correos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `correos`
--
ALTER TABLE `correos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

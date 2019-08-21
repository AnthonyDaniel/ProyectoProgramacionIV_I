-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-08-2019 a las 16:56:33
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `avantiparking`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `espacio`
--

CREATE TABLE `espacio` (
  `idEspacio` varchar(15) NOT NULL,
  `estado` tinyint(4) DEFAULT NULL,
  `tipoEspacio` varchar(40) DEFAULT NULL,
  `zona` varchar(40) NOT NULL,
  `parqueo` int(11) NOT NULL,
  `users` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parqueo`
--

CREATE TABLE `parqueo` (
  `idParqueo` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `zona` varchar(40) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `sede` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('anthonymmarinbolivar@gmail.com', 'tKzttSXw0VfqP332ZF1CsYaGQiaWpq2ncUN6thACBcpLG5Z4rBB4b1NciDH9', '2019-08-21 20:38:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id` int(11) NOT NULL,
  `fechaReserva` date NOT NULL,
  `horaInicio` time NOT NULL,
  `horaFinal` time NOT NULL,
  `espacio` varchar(15) NOT NULL,
  `users` varchar(45) NOT NULL,
  `vehiculo` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sede`
--

CREATE TABLE `sede` (
  `idSede` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `provincia` varchar(25) NOT NULL,
  `canton` varchar(25) NOT NULL,
  `direccion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `email` varchar(45) NOT NULL,
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `tipo` tinyint(4) DEFAULT NULL,
  `password` varchar(250) NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`email`, `id`, `nombre`, `direccion`, `telefono`, `tipo`, `password`, `updated_at`, `created_at`, `image`) VALUES
('anthonymmarinbolivar@gmail.com', 604550257, 'Anthony Daniel Marin Bolivar', 'Liberia, Guanacaste, Costa Rica', 84314444, 1, '$2y$10$ewf/fJ.zAmj5hQ92vQx1tuiE1LwG/3/MqNrowC1/oyziXRfO7pm.S', '2019-08-21', '2019-08-21', '1566398545descarga.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `placa` varchar(12) NOT NULL,
  `marca` varchar(20) NOT NULL,
  `modelo` varchar(20) NOT NULL,
  `users` varchar(45) NOT NULL,
  `image` varchar(255) NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`placa`, `marca`, `modelo`, `users`, `image`, `updated_at`, `created_at`) VALUES
('123', '123', '123', 'anthonymmarinbolivar@gmail.com', '1566399336descarga.jpg', '2019-08-21', '2019-08-21');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `espacio`
--
ALTER TABLE `espacio`
  ADD PRIMARY KEY (`idEspacio`),
  ADD UNIQUE KEY `users_UNIQUE` (`users`),
  ADD KEY `FK_ESPACIO_PARQUEO_idx` (`parqueo`),
  ADD KEY `FK_ESPACIO_PARQUEO_ZONA` (`zona`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `parqueo`
--
ALTER TABLE `parqueo`
  ADD PRIMARY KEY (`idParqueo`),
  ADD UNIQUE KEY `zona_UNIQUE` (`zona`),
  ADD KEY `FK_PARQUEO_SEDE_idx` (`sede`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_RESERVA_ESPACIO_idx` (`espacio`),
  ADD KEY `FK_RESERVA_USERS_idx` (`users`),
  ADD KEY `FK_RESERVA_VEHICULO_idx` (`vehiculo`);

--
-- Indices de la tabla `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`idSede`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `telefono_UNIQUE` (`telefono`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`placa`),
  ADD KEY `FK_VEHICULO_USERS_idx` (`users`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `parqueo`
--
ALTER TABLE `parqueo`
  MODIFY `idParqueo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `espacio`
--
ALTER TABLE `espacio`
  ADD CONSTRAINT `FK_ESPACIO_PARQUEO` FOREIGN KEY (`parqueo`) REFERENCES `parqueo` (`idParqueo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ESPACIO_PARQUEO_ZONA` FOREIGN KEY (`zona`) REFERENCES `parqueo` (`zona`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ESPACIO_USERS` FOREIGN KEY (`users`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `parqueo`
--
ALTER TABLE `parqueo`
  ADD CONSTRAINT `FK_PARQUEO_SEDE` FOREIGN KEY (`sede`) REFERENCES `sede` (`idSede`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `FK_RESERVA_ESPACIO` FOREIGN KEY (`espacio`) REFERENCES `espacio` (`idEspacio`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_RESERVA_USERS` FOREIGN KEY (`users`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_RESERVA_VEHICULO` FOREIGN KEY (`vehiculo`) REFERENCES `vehiculo` (`placa`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `FK_VEHICULO_USUARIO` FOREIGN KEY (`users`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

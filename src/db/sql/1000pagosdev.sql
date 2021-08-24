-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-08-2021 a las 17:05:33
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `1000pagosdev`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_activity`
--

CREATE TABLE `fm_activity` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_bank`
--

CREATE TABLE `fm_bank` (
  `id` int(11) NOT NULL,
  `code` int(4) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_bank_commerce`
--

CREATE TABLE `fm_bank_commerce` (
  `id` int(11) NOT NULL,
  `id_commerce` int(11) DEFAULT NULL,
  `id_bank` int(11) DEFAULT NULL,
  `bank_account_num` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_ciudades`
--

CREATE TABLE `fm_ciudades` (
  `id` int(11) NOT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `ciudad` int(250) DEFAULT NULL,
  `capital` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_client`
--

CREATE TABLE `fm_client` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `last_name` varchar(128) DEFAULT NULL,
  `id_roles` int(11) DEFAULT 0,
  `password` varchar(255) DEFAULT NULL,
  `id_ident_type` int(11) DEFAULT NULL,
  `nro_ident` varchar(11) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_cod_postal`
--

CREATE TABLE `fm_cod_postal` (
  `id` int(11) NOT NULL,
  `id_parroquia` int(11) DEFAULT NULL,
  `cod` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_commerce`
--

CREATE TABLE `fm_commerce` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `id_ident_type` int(11) DEFAULT NULL,
  `nro_ident` varchar(128) DEFAULT NULL,
  `special_contributor` tinyint(1) DEFAULT NULL,
  `id_activity` int(11) DEFAULT NULL,
  `id_location` int(11) DEFAULT NULL,
  `id_aci` int(11) DEFAULT NULL,
  `id_client` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_depart`
--

CREATE TABLE `fm_depart` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_dir_pos`
--

CREATE TABLE `fm_dir_pos` (
  `id` int(11) NOT NULL,
  `id_location` int(11) DEFAULT NULL,
  `id_commerce` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_estados`
--

CREATE TABLE `fm_estados` (
  `id` int(11) NOT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `iso_3166` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_ident_type`
--

CREATE TABLE `fm_ident_type` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `fm_ident_type`
--

INSERT INTO `fm_ident_type` (`id`, `name`) VALUES
(1, 'v'),
(2, 'e'),
(3, 'j'),
(4, 'p');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_location`
--

CREATE TABLE `fm_location` (
  `id` int(11) NOT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `id_municipio` int(11) DEFAULT NULL,
  `id_ciudad` int(11) DEFAULT NULL,
  `id_parroquia` int(11) DEFAULT NULL,
  `id_cod_postal` int(11) DEFAULT NULL,
  `sector` varchar(11) DEFAULT NULL,
  `calle` varchar(11) DEFAULT NULL,
  `local` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_municipios`
--

CREATE TABLE `fm_municipios` (
  `id` int(11) NOT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `municipio` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_parroquias`
--

CREATE TABLE `fm_parroquias` (
  `id` int(11) NOT NULL,
  `id_municipio` int(11) DEFAULT NULL,
  `parroquia` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_phone`
--

CREATE TABLE `fm_phone` (
  `id` int(11) NOT NULL,
  `user_id` int(128) DEFAULT NULL,
  `phone_number` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_request`
--

CREATE TABLE `fm_request` (
  `id` int(11) NOT NULL,
  `cont_post` int(11) DEFAULT NULL,
  `fm_act` varchar(255) DEFAULT NULL,
  `fm_pro_doc` varchar(255) DEFAULT NULL,
  `fm_services` varchar(255) DEFAULT NULL,
  `fm_contributor` varchar(255) DEFAULT NULL,
  `fm_ref_bank` varchar(255) DEFAULT NULL,
  `fm_ref_perso` varchar(255) DEFAULT NULL,
  `fm_account` varchar(255) DEFAULT NULL,
  `fm_front_local` varchar(255) DEFAULT NULL,
  `fm_in_local` varchar(255) DEFAULT NULL,
  `fm_rif` varchar(255) DEFAULT NULL,
  `fm_ident_card` varchar(255) DEFAULT NULL,
  `id_way_pay` int(11) DEFAULT NULL,
  `id_client` int(11) DEFAULT NULL,
  `id_commerce` int(11) DEFAULT NULL,
  `id_type_request` int(11) DEFAULT NULL,
  `id_status_request` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_roles`
--

CREATE TABLE `fm_roles` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `fm_roles`
--

INSERT INTO `fm_roles` (`id`, `name`) VALUES
(1, 'client'),
(2, 'client');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_status_request`
--

CREATE TABLE `fm_status_request` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_type_request`
--

CREATE TABLE `fm_type_request` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_way_pay`
--

CREATE TABLE `fm_way_pay` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fm_worker`
--

CREATE TABLE `fm_worker` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `last_name` varchar(128) DEFAULT NULL,
  `id_roles` int(11) DEFAULT 0,
  `password` varchar(255) DEFAULT NULL,
  `id_ident_type` int(11) DEFAULT NULL,
  `nro_ident` varchar(11) DEFAULT NULL,
  `id_depart` int(11) DEFAULT 0,
  `phone` varchar(32) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fm_activity`
--
ALTER TABLE `fm_activity`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fm_bank`
--
ALTER TABLE `fm_bank`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fm_bank_commerce`
--
ALTER TABLE `fm_bank_commerce`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fm_bank_commerce_fm_commerce_fk_0` (`id_commerce`),
  ADD KEY `fm_bank_commerce_fm_bank_fk_1` (`id_bank`);

--
-- Indices de la tabla `fm_ciudades`
--
ALTER TABLE `fm_ciudades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fm_ciudades_fm_estados_fk_0` (`id_estado`);

--
-- Indices de la tabla `fm_client`
--
ALTER TABLE `fm_client`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ident_type` (`id_ident_type`),
  ADD KEY `id_roles` (`id_roles`);

--
-- Indices de la tabla `fm_cod_postal`
--
ALTER TABLE `fm_cod_postal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fm_cod_postal_fm_parroquias_fk_0` (`id_parroquia`);

--
-- Indices de la tabla `fm_commerce`
--
ALTER TABLE `fm_commerce`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fm_commerce_fm_ident_typefk_0` (`id_ident_type`),
  ADD KEY `fm_bank_commerce_fm_activity_fk_0` (`id_activity`),
  ADD KEY `id_location` (`id_location`),
  ADD KEY `id_aci` (`id_aci`),
  ADD KEY `id_client` (`id_client`);

--
-- Indices de la tabla `fm_depart`
--
ALTER TABLE `fm_depart`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fm_dir_pos`
--
ALTER TABLE `fm_dir_pos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fm_dir_pos_fm_location_fk_0` (`id_location`),
  ADD KEY `fm_dir_pos_fm_commerce_fk_1` (`id_commerce`);

--
-- Indices de la tabla `fm_estados`
--
ALTER TABLE `fm_estados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fm_ident_type`
--
ALTER TABLE `fm_ident_type`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fm_location`
--
ALTER TABLE `fm_location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fm_location_fm_estados_fk_0` (`id_estado`),
  ADD KEY `fm_location_fm_municipios_fk_1` (`id_municipio`),
  ADD KEY `fm_location_fm_ciudades_fk_2` (`id_ciudad`),
  ADD KEY `fm_location_fm_parroquias_fk_3` (`id_parroquia`),
  ADD KEY `fm_location_fm_cod_postal_fk_4` (`id_cod_postal`);

--
-- Indices de la tabla `fm_municipios`
--
ALTER TABLE `fm_municipios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fm_municipios_fm_estados_fk_0` (`id_estado`);

--
-- Indices de la tabla `fm_parroquias`
--
ALTER TABLE `fm_parroquias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fm_parroquias_fm_municipios_fk_0` (`id_municipio`);

--
-- Indices de la tabla `fm_phone`
--
ALTER TABLE `fm_phone`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `fm_request`
--
ALTER TABLE `fm_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_way_pay` (`id_way_pay`),
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_commerce` (`id_commerce`),
  ADD KEY `id_type_request` (`id_type_request`),
  ADD KEY `id_status_request` (`id_status_request`);

--
-- Indices de la tabla `fm_roles`
--
ALTER TABLE `fm_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fm_status_request`
--
ALTER TABLE `fm_status_request`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fm_type_request`
--
ALTER TABLE `fm_type_request`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fm_way_pay`
--
ALTER TABLE `fm_way_pay`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `fm_worker`
--
ALTER TABLE `fm_worker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ident_type` (`id_ident_type`),
  ADD KEY `id_depart` (`id_depart`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fm_activity`
--
ALTER TABLE `fm_activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_bank`
--
ALTER TABLE `fm_bank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_bank_commerce`
--
ALTER TABLE `fm_bank_commerce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_ciudades`
--
ALTER TABLE `fm_ciudades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_client`
--
ALTER TABLE `fm_client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_cod_postal`
--
ALTER TABLE `fm_cod_postal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_commerce`
--
ALTER TABLE `fm_commerce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_depart`
--
ALTER TABLE `fm_depart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_dir_pos`
--
ALTER TABLE `fm_dir_pos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_estados`
--
ALTER TABLE `fm_estados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_ident_type`
--
ALTER TABLE `fm_ident_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `fm_location`
--
ALTER TABLE `fm_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_municipios`
--
ALTER TABLE `fm_municipios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_parroquias`
--
ALTER TABLE `fm_parroquias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_phone`
--
ALTER TABLE `fm_phone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_request`
--
ALTER TABLE `fm_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_roles`
--
ALTER TABLE `fm_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `fm_status_request`
--
ALTER TABLE `fm_status_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_type_request`
--
ALTER TABLE `fm_type_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_way_pay`
--
ALTER TABLE `fm_way_pay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `fm_worker`
--
ALTER TABLE `fm_worker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fm_bank_commerce`
--
ALTER TABLE `fm_bank_commerce`
  ADD CONSTRAINT `fm_bank_commerce_fm_bank_fk_1` FOREIGN KEY (`id_bank`) REFERENCES `fm_bank` (`id`),
  ADD CONSTRAINT `fm_bank_commerce_fm_commerce_fk_0` FOREIGN KEY (`id_commerce`) REFERENCES `fm_commerce` (`id`);

--
-- Filtros para la tabla `fm_ciudades`
--
ALTER TABLE `fm_ciudades`
  ADD CONSTRAINT `fm_ciudades_fm_estados_fk_0` FOREIGN KEY (`id_estado`) REFERENCES `fm_estados` (`id`);

--
-- Filtros para la tabla `fm_client`
--
ALTER TABLE `fm_client`
  ADD CONSTRAINT `fm_client_ibfk_1` FOREIGN KEY (`id_ident_type`) REFERENCES `fm_ident_type` (`id`),
  ADD CONSTRAINT `fm_client_ibfk_2` FOREIGN KEY (`id_roles`) REFERENCES `fm_roles` (`id`);

--
-- Filtros para la tabla `fm_cod_postal`
--
ALTER TABLE `fm_cod_postal`
  ADD CONSTRAINT `fm_cod_postal_fm_parroquias_fk_0` FOREIGN KEY (`id_parroquia`) REFERENCES `fm_parroquias` (`id`);

--
-- Filtros para la tabla `fm_commerce`
--
ALTER TABLE `fm_commerce`
  ADD CONSTRAINT `fm_bank_commerce_fm_activity_fk_0` FOREIGN KEY (`id_activity`) REFERENCES `fm_activity` (`id`),
  ADD CONSTRAINT `fm_bank_commerce_fm_client_fk_0` FOREIGN KEY (`id_client`) REFERENCES `fm_client` (`id`),
  ADD CONSTRAINT `fm_bank_commerce_fm_location_fk_0` FOREIGN KEY (`id_location`) REFERENCES `fm_location` (`id`),
  ADD CONSTRAINT `fm_bank_commerce_fm_worker_fk_0` FOREIGN KEY (`id_aci`) REFERENCES `fm_worker` (`id`),
  ADD CONSTRAINT `fm_commerce_fm_ident_type_fk_0` FOREIGN KEY (`id_ident_type`) REFERENCES `fm_ident_type` (`id`),
  ADD CONSTRAINT `fm_commerce_fm_ident_typefk_0` FOREIGN KEY (`id_ident_type`) REFERENCES `fm_ident_type` (`id`),
  ADD CONSTRAINT `fm_commerce_ibfk_1` FOREIGN KEY (`id_location`) REFERENCES `fm_location` (`id`),
  ADD CONSTRAINT `fm_commerce_ibfk_2` FOREIGN KEY (`id_aci`) REFERENCES `fm_worker` (`id`),
  ADD CONSTRAINT `fm_commerce_ibfk_3` FOREIGN KEY (`id_client`) REFERENCES `fm_client` (`id`);

--
-- Filtros para la tabla `fm_dir_pos`
--
ALTER TABLE `fm_dir_pos`
  ADD CONSTRAINT `fm_dir_pos_fm_commerce_fk_1` FOREIGN KEY (`id_commerce`) REFERENCES `fm_commerce` (`id`),
  ADD CONSTRAINT `fm_dir_pos_fm_location_fk_0` FOREIGN KEY (`id_location`) REFERENCES `fm_location` (`id`);

--
-- Filtros para la tabla `fm_location`
--
ALTER TABLE `fm_location`
  ADD CONSTRAINT `fm_location_fm_ciudades_fk_2` FOREIGN KEY (`id_ciudad`) REFERENCES `fm_ciudades` (`id`),
  ADD CONSTRAINT `fm_location_fm_cod_postal_fk_4` FOREIGN KEY (`id_cod_postal`) REFERENCES `fm_cod_postal` (`id`),
  ADD CONSTRAINT `fm_location_fm_estados_fk_0` FOREIGN KEY (`id_estado`) REFERENCES `fm_estados` (`id`),
  ADD CONSTRAINT `fm_location_fm_municipios_fk_1` FOREIGN KEY (`id_municipio`) REFERENCES `fm_municipios` (`id`),
  ADD CONSTRAINT `fm_location_fm_parroquias_fk_3` FOREIGN KEY (`id_parroquia`) REFERENCES `fm_parroquias` (`id`);

--
-- Filtros para la tabla `fm_municipios`
--
ALTER TABLE `fm_municipios`
  ADD CONSTRAINT `fm_municipios_fm_estados_fk_0` FOREIGN KEY (`id_estado`) REFERENCES `fm_estados` (`id`);

--
-- Filtros para la tabla `fm_parroquias`
--
ALTER TABLE `fm_parroquias`
  ADD CONSTRAINT `fm_parroquias_fm_municipios_fk_0` FOREIGN KEY (`id_municipio`) REFERENCES `fm_municipios` (`id`);

--
-- Filtros para la tabla `fm_phone`
--
ALTER TABLE `fm_phone`
  ADD CONSTRAINT `fm_phone_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `fm_client` (`id`);

--
-- Filtros para la tabla `fm_request`
--
ALTER TABLE `fm_request`
  ADD CONSTRAINT `fm_request_ibfk_1` FOREIGN KEY (`id_way_pay`) REFERENCES `fm_way_pay` (`id`),
  ADD CONSTRAINT `fm_request_ibfk_2` FOREIGN KEY (`id_client`) REFERENCES `fm_client` (`id`),
  ADD CONSTRAINT `fm_request_ibfk_3` FOREIGN KEY (`id_commerce`) REFERENCES `fm_commerce` (`id`),
  ADD CONSTRAINT `fm_request_ibfk_4` FOREIGN KEY (`id_type_request`) REFERENCES `fm_type_request` (`id`),
  ADD CONSTRAINT `fm_request_ibfk_5` FOREIGN KEY (`id_status_request`) REFERENCES `fm_status_request` (`id`);

--
-- Filtros para la tabla `fm_worker`
--
ALTER TABLE `fm_worker`
  ADD CONSTRAINT `fm_worker_ibfk_1` FOREIGN KEY (`id_ident_type`) REFERENCES `fm_ident_type` (`id`),
  ADD CONSTRAINT `fm_worker_ibfk_2` FOREIGN KEY (`id_depart`) REFERENCES `fm_type_request` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

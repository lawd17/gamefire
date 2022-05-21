-- phpMyAdmin SQL Dump
-- version 5.0.4deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 07-05-2022 a las 19:29:10
-- Versión del servidor: 10.5.12-MariaDB-0+deb11u1
-- Versión de PHP: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gamefire`
--
CREATE DATABASE IF NOT EXISTS `gamefire` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `gamefire`;

-- --------------------------------------------------------
CREATE USER 'gamefire'@'localhost' IDENTIFIED WITH mysql_native_password BY 'gamefire2022';
GRANT ALL PRIVILEGES ON gamefire.* TO 'gamefire'@'localhost';
FLUSH PRIVILEGES;


--
-- Estructura de tabla para la tabla `Categorias`
--

CREATE TABLE IF NOT EXISTS `Categorias` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(500) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `Categorias`
--

INSERT INTO `Categorias` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Videojuegos', ''),
(2, 'Perifericos', ''),
(3, 'Consola', ''),
(4, 'Merchandising', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Detalles_venta`
--

CREATE TABLE IF NOT EXISTS `Detalles_venta` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `id_venta` int(50) NOT NULL,
  `id_producto` int(50) NOT NULL,
  `cantidad` int(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `detalleVenta_venta` (`id_venta`),
  KEY `detalleVenta_producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Direcciones`
--

CREATE TABLE IF NOT EXISTS `Direcciones` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `direccion` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `ciudad` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `codigo_postal` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `pais` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `id_usuario` int(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_direccion` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `Direcciones`
--

INSERT INTO `Direcciones` (`id`, `direccion`, `ciudad`, `codigo_postal`, `pais`, `id_usuario`) VALUES
(1, 'Urb. La cuesta', 'La Orotava', '38301', 'España', 1),
(2, 'Calle la cuesta', 'El puerto de la Cruz', '38201', 'España', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Metodos_pago`
--

CREATE TABLE IF NOT EXISTS `Metodos_pago` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `tipo_pago` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `titular` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `numero_cuenta` bigint(16) DEFAULT NULL,
  `expiracion` varchar(7) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `ccv` int(3) DEFAULT NULL,
  `id_usuario` int(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_metodo_pago` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `Metodos_pago`
--

INSERT INTO `Metodos_pago` (`id`, `tipo_pago`, `titular`, `numero_cuenta`, `expiracion`, `ccv`, `id_usuario`) VALUES
(1, 'CREDIT_CARD', 'JONAY HERNÁNDEZ IZQUIERDO', 5393486835524948, '05/2022', 785, 1),
(2, 'PAYPAL', NULL, NULL, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Productos`
--

CREATE TABLE IF NOT EXISTS `Productos` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `imagen` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(10000) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `precio_venta` float NOT NULL,
  `stock` int(50) NOT NULL,
  `id_categoria` int(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `Productos`
--

INSERT INTO `Productos` (`id`, `nombre`, `imagen`, `descripcion`, `precio_venta`, `stock`, `id_categoria`) VALUES
(1, 'Elden Ring', 'assets/img/eldenRing.png', 'Nuevo Juego de From Software', 59.99, 10, 1),
(2, 'The Word end width you final\r\nmix', 'assets/img/the_world_end_with_you_final_mix.png', 'Aclamado por la crítica en su lanzamiento en Nintendo DS, la aventura de rol y acción The World Ends With You recibe reedición en Nintendo Switch con The World Ends With You -Final Remix-. El videojuego anima a conocer a Neku que, tras conocer a la misteriosa Shiki, debe completar una serie de retorcidas misiones o será borrado. En su llegada a la consola híbrida se permite superar cada cada combate con los controles tradicionales del juego o usa los mandos Joy-Con para conseguir un estilo de combate más fresco.', 59.99, 10, 1),
(3, 'NEO: The World\r\nEnds With You', 'assets/img/neo_the_world_end_with_you.png', 'NEO: The World Ends With You es un videojuego de rol y acción firmado por Square Enix continuación de un clásico moderno del género lanzado en 2007 para Nintendo DS, The World Ends with You. Sus responsables apuestan por llevar a los usuarios hasta las calles de Shibuya, donde se verán obligados a participar en el Juego de los Segadores, una contienda a vida o muerte por la supervivencia llena de misterios. NEO: The World Ends With You brinda a los jugadores una recreación del barrio de Shibuya moderno con un estilo único inspirado en cómics que pueden explorar y disfrutar en todos los sentidos, habiendo de derrotar a monstruos en combates trepidantes con ayuda de diferentes aliados y completar misiones con el objetivo de cambiar el destino que se les han impuesto.', 59.99, 5, 1),
(4, 'Horizon: Forbidden\r\nWest', 'assets/img/horizon_forbidden_west.png', 'Horizon: Forbidden West es la continuación de las aventuras de Aloy para PS5 y PS4 tras la exitosa recepción de Horizon: Zero Dawn, y nos lleva a otra tierra de fantasía de manos de Guerrilla Entertainment autores, además, de la saga Killzone. En concreto, la historia de este videojuego sigue los pasos de Aloy mientras avanza hacia el oeste en una América de un futuro lejano para enfrentar una frontera majestuosa, pero amenazante, en la que se enfrentará a máquinas asombrosas y nuevas amenazas misteriosas. Sus responsables apuestan a ofrecer con Horizon: Forbidden West una producción aún más bella y realista que saque partido al hardware de PlayStation 5.\r\n\r\nEn su viaje hacia el Oeste Prohibido, a Aloy le espera un enorme mundo abierto que recorrer con frondosos bosques, ciudades hundidas e imponentes montañas en el que no faltan nuevos peligros. Horizon: Forbidden West nos desafía a luchar en batallas estratégicas contra máquinas enormes y los enemigos humanos que la controlando, dominando diferentes armas, equipo y tramas improvisadas con las piezas que encontremos a lo largo de este RPG de acción y aventura que apuesta a ser épico. En juego está descubrir el secreto del inminente colapso de la Tierra y sacar a la luz un capítulo oculto del pasado lejano... que cambiará a la protagonista de esta historia para siempre.', 59.99, 8, 1),
(5, 'King Arthur: Knight\'sTale', 'assets/img/king_arthur.png', 'King Arthur: Knight\'s Tale es un videojuego de rol táctico con fuerte énfasis en sus personajes que busca ofrecer un acercamiento moderno a una historia clásica de la mitología artúrica con toques de fantasía oscura. Neocore Games garantizan con este King Arthur: Knight\'s Tale una aventura con decisiones morales significantes para el desarrollo de la partida, agregando de esta forma tensión adicional a las decisiones tácticas y de gestión de un título con una estructura rogue-lite.\r\n\r\nCon esta premisa, es de esperar de King Arthur: Knight\'s Tale una potente y cuidada ambientación, llevando a usuario a explorar una tierra de pesadilla en la que monstruos malignos y criaturas mágicas acechan en bosques y castillos. ¿El culpable de todo ello? Nada menos que Arturo, quien tras caer en combate con Mordred ha sido resucitado llenando de oscuridad a Britania. Poner fin a este estado maldito es el objetivo del jugador, en el rol de Mordred, que tendrá que reunir a un equipo equipo de héroes con varias clases (defensor, campeón, tirador, vanguardia, arcanista y sabio).', 59.99, 5, 1),
(6, 'Hogwarts Legacy', 'assets/img/Hogwarts_Legacy.png', 'Disfruta del Hogwarts del siglo XIX. \r\nTu personaje es un alumno o alumna del famoso colegio que tiene la clave de un antiguo secreto que amenaza con destruir el mundo mágico. \r\nAhora puedes tomar el control de la acción y ser el centro de tu propia aventura en el mundo mágico.', 79.99, 2, 1),
(7, 'Minecraft Starter Collection Refresh', 'assets/img/Minecraft_Starter_Collection_Refresh.png', 'Tu nueva experiencia Minecraft está \r\naquí, en esta nueva y completa edición de tu juego favorito se incluye contenido extra como parte de la Bedrock Edition, así podrás disfrutar de un Minecraft con\r\n un mundo más grande, mejor y mucho más bonito. Descubre nuevas formas de jugar y compartir.', 29.99, 5, 1),
(8, 'Leyendas de Pokemon: Arceus', 'assets/img/leyendas_pokemon_arceus.png', 'Celebra el 25 aniversario de Pokémon con una aventura \r\nen el antiguo Sinnoh con un Pokemon completamente nuevo. En Leyendas Pokémon: Arceus, se mezclan las bases de los juegos de Pokémon anteriores con elementos propios\r\n de los juegos de acción y RPG. \n Tus aventuras se desarrollan en el majestuoso entorno natural de la región de Hisui, donde te encargarás de investigar Pokémon para \r\n crear la primera Pokédex de la región.', 49.99, 3, 1),
(9, 'Kirby y La Tierra Olvidada', 'assets/img/kirby_la_tierra_olvidad.png', 'Explora con Kirby y viaja hasta un mundo misterioso\r\n para descubrir que los Waddle Dees, los habitantes más comunes de Dream Land, están siendo secuestrados por la jauría. \r\n Para rescatarlos Kirby emprenderá una aventura junto a Elfilin, un personaje que conoce en el nuevo mundo.', 59.99, 10, 1),
(10, 'Resident Evil Village Edición Steelbook', 'assets/img/Resident_Evil_Village_Edición_Steelbook.png', 'Años despues de la\r\n pesadilla, Ethan Winters ha conseguido cierta estabilidad y una vida normal con su familia. Una vida que no tardará en ser destruida por un héroe de antaño,\r\n Chris Redfield. Ambientado después de los terroríficos eventos del aclamado Resident Evil 7 Biohazard, la historia comienza con Ethan Winters y su mujer Mia \r\n viviendo pacíficamente en una nueva localidad, libre de sus pasadas pesadillas. Justo cuando empiezan a construir su nueva vida juntos la tragedia se ceba con \r\n ellos de nuevo.', 39.99, 5, 1),
(11, 'Controller Sony Dualshock 4 V2 Magma Red', 'assets/img/controller_sony_dualshock_v2_magma_red.png', 'Toma el control de una nueva \r\ngeneración de videojuegos con un mando inalámbrico DualShock 4 Magma Red rediseñado que pone en tus manos\r\n la mayor precisión en tus juegos de PlayStation 4', 59.99, 2, 2),
(12, 'Mando Inalánbrico Dualsense Midnight Black', 'assets/img/mando_inalambrico_dualsense_midnight_black.png', '', 69.95, 3, 2),
(13, 'Corsair HS80 - RGB - Wireless - Negro - PC (Dolby Atmos)- PS4 - PS5 (Audio 3D) - Auriculares Gaming', 'assets/img/corsair_hs80_negro.png', '', 149.99, 10, 2),
(14, 'Soporte de Carga para Mandos Joy-Con', 'assets/img/soporte_carga_joy_con.png', 'Acopla el Joy-Con izquierdo y el Joy-Con derecho a este soporte de carga y úsalo como un mando tradicional.\r\n A diferencia del soporte para mandos Joy-Con incluido con la consola Nintendo Switch, el soporte de carga permite recargar los Joy-Con mientras juegas, así que no tienes que preocuparte por quedarte sin batería.', 24.95, 6, 2),
(15, 'Estacion de recarga Dualsense', 'assets/img/estacion_recarga_dualsense.png', 'Acopla rápida y fácilmente hasta dos mandos inalámbricos DualSense con el diseño de acoplamiento sencillo de la estación de recarga. Los mandos se cargan tan rápido como al conectarlos a la PS5, de forma que puedes liberar puertos USB sin sacrificar el rendimiento.', 29.95, 15, 2),
(16, 'Mando a distancia multimedia', 'assets/img/mando_distancia_multimedia.png', 'Navega cómodamente por el entretenimiento en tu consola PlayStation®5 con los intuitivos controles multimedia y para tu TV. ', 29.99, 15, 2),
(17, 'Auriculares Xbox Edicion Especial 20 Aniversario', 'assets/img/auriculares_xbox_edicion_20_aniversario.png', 'Juega alto y claro con los Cascos estéreo de Xbox: Edición especial del 20º aniversario en color negro clásico con toques verdes que vuelven a los inicios y mucho más', 64.95, 35, 2),
(18, 'Joy-Con (set Izda/Dcha) Azul Neón/Rojo Neón', 'assets/img/joy-con-izda_dcha_azul_neon_rojo_neon.png', 'Un mando o dos, en vertical o en horizontal, control por movimiento o mediante botones… Con los nuevos mandos Joy-Con para Nintendo Switch tendrás flexibilidad total a la hora de jugar y descubrirás nuevas formas de interactuar que transformarán por completo tus experiencias de juego.', 74.95, 5, 2),
(19, 'Set Funda + Protector Pantalla Switch OLED y Switch Estandar', 'assets/img/set_funda_protector_pantalla_switch_oled.png', 'Este pack está fabricado con los mejores materiales para ofrecer una protección inmejorable para tu Nintendo Switch OLED o Estándar.  También dispones de dos protectores para tu consola, por si alguno se te parte, tener uno disponible de reserva.', 19.95, 10, 2),
(20, 'Cable HDMI 2.1 8K Trust Ruza PS4-PS5-XSX-NSW', 'assets/img/cable_hdmi_trust_ruza_ps4_ps5_xsx_nsw.png', 'Cable HDMI de velocidad ultraalta y de 1,8 m de longitud para disfrutar del gaming de próxima generación con altas resoluciones de hasta 8 K.', 14.95, 3, 2),
(21, 'Xbox Series S + Xbox Game Pass', 'assets/img/xbox_serie_s_xbox_game_pass.png', 'Compra la consola Xbox Series S y llévate una suscripción de 3 meses de Xbox Game Pas para disfrutar del mundo digital a un precio increíble.', 299.95, 15, 3),
(22, 'Game & Watch The Legend of Zelda', 'assets/img/game_and_watch_the_legend_of_zeld.png', 'Rejuega algunos de los juegos más emblemáticos de The Legend of Zelda en una consola inspirada en el estilo retro que es ideal tanto para jugar como para coleccionar. Se pueden jugar la versiones de los juegos en inglés o japonés.', 49.95, 5, 3),
(23, 'Nintendo Switch Azul Neon Rojo Neon', 'assets/img/nintendo_switch_azul_neon_rojo_neon.png', 'A la potencia de una consola doméstica se le une la movilidad de una consola portátil en Nintendo Switch, la nueva generación de Nintendo que ofrece emociones en casa para uno o varios jugadores y la posibilidad de jugar al mismo título donde quieras, cuando quieras y con quien quieras.', 299.95, 10, 3),
(24, 'Nintendo Switch Lite Gris', 'assets/img/nintendo_switch_lite_gris.png', 'Una consola enfocada al juego portátil. Ideal para los jugadores que no se están quietos. Nintendo Switch Lite, la nueva incorporación a la familia Nintendo Switch, es una consola compacta, ligera y fácil de transportar, que cuenta con controles integrados.', 219.95, 5, 3),
(25, 'Nintendo Switch Lite Amarillo', 'assets/img/nintendo_switch_lite_amarillo.png', 'Una consola enfocada al juego portátil. Ideal para los jugadores que no se están quietos. Nintendo Switch Lite, la nueva incorporación a la familia Nintendo Switch, es una consola compacta, ligera y fácil de transportar, que cuenta con controles integrados.', 219.95, 5, 3),
(26, 'Figura POP Pokemon: Bulbasur', 'assets/img/figurar_pop_pokemon_bulbasur.png', 'Bulbasaur es un Pokémon de tipo planta/veneno introducido en la primera generación. Es uno de los Pokémon iniciales que pueden elegir los entrenadores que empiezan su aventura en la región Kanto, junto a Squirtle y Charmander (excepto en Pokémon Amarillo). Destaca por ser el primer Pokémon de la Pokédex Nacional y la en la Pokédex de Kanto.', 14.95, 10, 4),
(27, 'Figura POP Pokemon: Charmander', 'assets/img/figurar_pop_pokemon_charmander.png', 'Charmander es un Pokémon de tipo fuego introducido en la primera generación. Es uno de los Pokémon iniciales que pueden elegir los entrenadores que empiezan su aventura en la región Kanto, junto a Bulbasaur y Squirtle, excepto en Pokémon Amarillo y Pokémon: Let\' s\r\n    Go,\r\n      Pikachu ! y Pokémon: Let \'s Go, Eevee!', 14.95, 10, 4),
(28, 'Figura One Piece Moneky D. Luffy', 'assets/img/figura_one_piece_monkeydluffy.png', 'Compra esta espectacular figura de Monkey D. Luffy. El orgulloso capitán de los Piratas del Sombrero de Paja y usuario de una de las frutas del diablo, Luffy sueña con ser el Rey de los Piratas encontrando el legendario tesoro One Piece.', 29.95, 5, 4),
(29, 'Star Wars: Retro Game', 'assets/img/star_awrs_retro_game.png', 'Revive tus mejores recuerdos de la galaxia con esta edición retro del juego Star Wars-Escape de la Estrella de la Muerte del juego original, editado por Kenner en el año 1977. Los verdaderos fans de Star Wars podrán volver a experimentar momentos tan épicos como ayudar a sus personajes favoritos a escapar del temible Estrella de la Muerte. Ayuda a Luke Skywalker, Han Solo, Chewbacca o la mismísima Princesa Leia a traer a la galaxia de nuevo la libertad.', 9.95, 5, 4),
(30, 'Figurar POP My Hero Academia S8: Infinite Deku con Eri', 'assets/img/figura_poo_my_hero_academia_s8_infinite_deku_con_eri.png', '', 14.95, 10, 4);


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE IF NOT EXISTS `Usuarios` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `email` varchar(150) COLLATE utf32_spanish_ci NOT NULL,
  `username` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(120) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(150) COLLATE utf32_spanish_ci NOT NULL,
  `apellidos` varchar(150) COLLATE utf32_spanish_ci NOT NULL,
  `telefono` varchar(15) COLLATE utf32_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf32 COLLATE=utf32_spanish_ci;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`id`, `email`, `username`, `password`, `nombre`, `apellidos`, `telefono`) VALUES
(1, 'lawd45@gmail.com', 'lawd45', '"$2y$10$XQgc2VUViBd3u/iNkJPIwuJ/4UTxDbjh4RYOhaVnytSg2q01Zd.iW"', 'Jonay', 'Hernández Izquierdo', '922336243'),
(2, 'javier12@gmail.com', 'javi12', '"$2y$10$XQgc2VUViBd3u/iNkJPIwuJ/4UTxDbjh4RYOhaVnytSg2q01Zd.iW"', 'Javier', 'Lima Pérez', '922336244');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Ventas`
--

CREATE TABLE IF NOT EXISTS `Ventas` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `fecha` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `impuesto` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `total` float NOT NULL,
  `id_usuario` int(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `venta_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Detalles_venta`
--
ALTER TABLE `Detalles_venta`
  ADD CONSTRAINT `detalleVenta_producto` FOREIGN KEY (`id_producto`) REFERENCES `Productos` (`id`),
  ADD CONSTRAINT `detalleVenta_venta` FOREIGN KEY (`id_venta`) REFERENCES `Ventas` (`id`);

--
-- Filtros para la tabla `Direcciones`
--
ALTER TABLE `Direcciones`
  ADD CONSTRAINT `usuario_direccion` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Metodos_pago`
--
ALTER TABLE `Metodos_pago`
  ADD CONSTRAINT `usuario_metodo_pago` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Productos`
--
ALTER TABLE `Productos`
  ADD CONSTRAINT `producto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `Categorias` (`id`);

--
-- Filtros para la tabla `Ventas`
--
ALTER TABLE `Ventas`
  ADD CONSTRAINT `venta_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.4deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 16-03-2022 a las 17:07:49
-- Versión del servidor: 10.5.12-MariaDB-0+deb11u1
-- Versión de PHP: 7.4.28
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Base de datos: `gamefire`
--
CREATE DATABASE IF NOT EXISTS `gamefire` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `gamefire`;
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `categoria`
--
DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria` (
  `id` int(50) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_spanish_ci;
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `detalle_venta`
--
DROP TABLE IF EXISTS `detalle_venta`;
CREATE TABLE `detalle_venta` (
  `id` int(50) NOT NULL,
  `id_venta` int(50) NOT NULL,
  `id_producto` int(50) NOT NULL,
  `cantidad` int(5) NOT NULL,
  `precio` float NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_spanish_ci;
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `direccion`
--
DROP TABLE IF EXISTS `direccion`;
CREATE TABLE `direccion` (
  `id` int(50) NOT NULL,
  `user_id` int(50) NOT NULL,
  `direccion1` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `direccion2` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `ciudad` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `codigo_postal` int(10) NOT NULL,
  `pais` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_spanish_ci;
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `metodo_pago`
--
DROP TABLE IF EXISTS `metodo_pago`;
CREATE TABLE `metodo_pago` (
  `id` int(50) NOT NULL,
  `user_id` int(50) NOT NULL,
  `tipo_pago` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `proveedor` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `numero_cuenta` int(25) NOT NULL,
  `expiracion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_spanish_ci;
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `producto`
--
DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `id` int(50) NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `imagen` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `precio_venta` float NOT NULL,
  `stock` int(5) NOT NULL,
  `id_categoria` int(50) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_spanish_ci;
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `usuario`
--
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` int(50) NOT NULL,
  `username` varchar(15) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(120) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(120) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(9) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_spanish_ci;
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `venta`
--
DROP TABLE IF EXISTS `venta`;
CREATE TABLE `venta` (
  `id` int(50) NOT NULL,
  `id_usuario` int(50) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `impuesto` varchar(5) COLLATE utf8mb4_spanish_ci NOT NULL,
  `total` float NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_spanish_ci;
--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
ADD PRIMARY KEY (`id`);
--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
ADD PRIMARY KEY (`id`),
  ADD KEY `venta_detalles-venta` (`id_venta`),
  ADD KEY `producto_detalle-venta` (`id_producto`);
--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_direccion` (`user_id`);
--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_metodo-pago` (`user_id`);
--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
ADD PRIMARY KEY (`id`),
  ADD KEY `producto_categoria` (`id_categoria`);
--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
ADD PRIMARY KEY (`id`);
--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_compra` (`id_usuario`);
--
-- Restricciones para tablas volcadas
--
--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
ADD CONSTRAINT `producto_detalle-venta` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `venta_detalles-venta` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
ADD CONSTRAINT `usuario_direccion` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Filtros para la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
ADD CONSTRAINT `usuario_metodo-pago` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
ADD CONSTRAINT `producto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
ADD CONSTRAINT `usuario_compra` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
-- Insert Productos --
-- Insert Videojuegos --
INSERT INTO producto
VALUES (
    1,
    'Elden Ring',
    'src/assets/img/eldenRing.png',
    'Nuevo Juego de From
Software',
    59.99,
    100,
    1
  );
INSERT INTO producto
VALUES (
    2,
    'The Word end width you final
mix',
    'src/assets/img/the_world_end_with_you_final_mix.png',
    'The Word end width you final
mix","imagen":"\/assets\/img\/the_word_end_with_you.png","descripcion":"Aclamado por la cr\u00edtica en su lanzamiento
en Nintendo DS, la aventura de rol y acci\u00f3n The World Ends With You recibe reedici\u00f3n en Nintendo Switch con
The World Ends With You -Final Remix-. El videojuego anima a conocer a Neku que, tras conocer a la misteriosa Shiki,
debe completar una serie de retorcidas misiones o ser\u00e1 borrado. En su llegada a la consola h\u00edbrida se permite
superar cada cada combate con los controles tradicionales del juego o usa los mandos Joy-Con para conseguir un estilo de
combate m\u00e1s fresco.","precio_venta":"59.99","stock":"60","id_categoria":"1"},{"id":"3","nombre":"NEO: The World
Ends With You',
    59.99,
    100,
    1
  );
INSERT INTO producto
VALUES (
    3,
    'NEO: The World
Ends With You',
    'src/assets/img/neo_the_word_end_with_you.png',
    'NEO: The World Ends With You es un
videojuego de rol y acci\u00f3n firmado por Square Enix continuaci\u00f3n de un cl\u00e1sico moderno del g\u00e9nero
lanzado en 2007 para Nintendo DS, The World Ends with You. Sus responsables apuestan por llevar a los usuarios hasta las
calles de Shibuya, donde se ver\u00e1n obligados a participar en el Juego de los Segadores, una contienda a vida o
muerte por la supervivencia llena de misterios. NEO: The World Ends With You brinda a los jugadores una recreaci\u00f3n
del barrio de Shibuya moderno con un estilo \u00fanico inspirado en c\u00f3mics que pueden explorar y disfrutar en todos
los sentidos, habiendo de derrotar a monstruos en combates trepidantes con ayuda de diferentes aliados y completar
misiones con el objetivo de cambiar el destino que se les han
impuesto.',
    59.99,
    50,
    1
  );
INSERT INTO producto
VALUES (
    4,
    'Horizon: Forbidden
West',
    'src/assets/img/horizon_forbidden_wes.png',
    'Horizon: Forbidden West es la continuaci\u00f3n
de las aventuras de Aloy para PS5 y PS4 tras la exitosa recepci\u00f3n de Horizon: Zero Dawn, y nos lleva a otra tierra
de fantas\u00eda de manos de Guerrilla Entertainment autores, adem\u00e1s, de la saga Killzon',
    59.99,
    80,
    1
  );
INSERT INTO producto
VALUES (
    5,
    "King Arthur: Knight's
Tale",
    'src/assets/img/king_arthur.png',
    "King Arthur: Knight's Tale es un videojuego de rol
t\u00e1ctico con fuerte \u00e9nfasis en sus personajes que busca ofrecer un acercamiento moderno a una historia
cl\u00e1sica de la mitolog\u00eda art\u00farica con toques de fantas\u00eda oscura",
    59.99,
    50,
    1
  );
INSERT INTO producto
VALUES (
    6,
    'Hogwarts Legacy',
    'src/assets/img/Hogwarts_Legacy.png',
    'Disfruta del Hogwarts del siglo XIX. 
Tu personaje es un alumno o alumna del famoso colegio que tiene la clave de un antiguo secreto que amenaza con destruir el mundo mágico. 
Ahora puedes tomar el control de la acción y ser el centro de tu propia aventura en el mundo mágico.',
    79.99,
    20,
    1
  );
INSERT INTO producto
VALUES (
    7,
    'Minecraft Starter Collection Refresh',
    'src/assets/img/Minecraft_Starter_Collection_Refresh.png',
    'Tu nueva experiencia Minecraft está 
aquí, en esta nueva y completa edición de tu juego favorito se incluye contenido extra como parte de la Bedrock Edition, así podrás disfrutar de un Minecraft con
 un mundo más grande, mejor y mucho más bonito. Descubre nuevas formas de jugar y compartir.',
    29.99,
    50,
    1
  );
INSERT INTO producto
VALUES (
    8,
    'Leyendas de Pokemon: Arceus',
    'src/assets/img/leyendas_pokemon_arceus.png',
    'Celebra el 25 aniversario de Pokémon con una aventura 
en el antiguo Sinnoh con un Pokemon completamente nuevo. En Leyendas Pokémon: Arceus, se mezclan las bases de los juegos de Pokémon anteriores con elementos propios
 de los juegos de acción y RPG. \n Tus aventuras se desarrollan en el majestuoso entorno natural de la región de Hisui, donde te encargarás de investigar Pokémon para 
 crear la primera Pokédex de la región.',
    49.99,
    30,
    1
  );
INSERT INTO producto
VALUES (
    9,
    'Kirby y La Tierra Olvidada',
    'src/assets/img/kirby_la_tierra_olvidad.png',
    'Explora con Kirby y viaja hasta un mundo misterioso
 para descubrir que los Waddle Dees, los habitantes más comunes de Dream Land, están siendo secuestrados por la jauría. 
 Para rescatarlos Kirby emprenderá una aventura junto a Elfilin, un personaje que conoce en el nuevo mundo.',
    59.99,
    100,
    1
  );
INSERT INTO producto
VALUES (
    10,
    'Resident Evil Village Edición Steelbook',
    'src/assets/img/Resident_Evil_Village_Edición_Steelbook.png',
    'Años despues de la
 pesadilla, Ethan Winters ha conseguido cierta estabilidad y una vida normal con su familia. Una vida que no tardará en ser destruida por un héroe de antaño,
 Chris Redfield. Ambientado después de los terroríficos eventos del aclamado Resident Evil 7 Biohazard, la historia comienza con Ethan Winters y su mujer Mia 
 viviendo pacíficamente en una nueva localidad, libre de sus pasadas pesadillas. Justo cuando empiezan a construir su nueva vida juntos la tragedia se ceba con 
 ellos de nuevo.',
    39.99,
    50,
    1
  );
-- Insert Perifericos --
INSERT INTO producto
VALUES (
    11,
    'Controller Sony Dualshock 4 V2 Magma Red',
    'src/assets/img/controller_sony_dualshock_v2_magma_red.png',
    'Toma el control de una nueva 
generación de videojuegos con un mando inalámbrico DualShock 4 Magma Red rediseñado que pone en tus manos
 la mayor precisión en tus juegos de PlayStation 4',
    59.99,
    20,
    2
  );
INSERT INTO producto
VALUES (
    12,
    'Mando Inalánbrico Dualsense Midnight Black',
    'src/assets/img/mando_inalambrico_dualsense_midnight_black.png',
    '',
    69.95,
    30,
    2
  );
INSERT INTO producto
VALUES (
    13,
    'Corsair HS80 - RGB - Wireless - Negro - PC (Dolby Atmos)- PS4 - PS5 (Audio 3D) - Auriculares Gaming',
    'src/assets/img/corsair_hs80_negro.png',
    '',
    149.99,
    100,
    2
  );
INSERT INTO producto
VALUES (
    14,
    'Soporte de Carga para Mandos Joy-Con',
    'src/assets/img/soporte_carga_joy_con.png',
    'Acopla el Joy-Con izquierdo y el Joy-Con derecho a este soporte de carga y úsalo como un mando tradicional.
 A diferencia del soporte para mandos Joy-Con incluido con la consola Nintendo Switch, el soporte de carga permite recargar los Joy-Con mientras juegas, así que no tienes que preocuparte por quedarte sin batería.',
    24.95,
    60,
    2
  );
INSERT INTO producto
VALUES (
    15,
    'Estacion de recarga Dualsense',
    'src/assets/img/estacion_recarga_dualsense.png',
    'Acopla rápida y fácilmente hasta dos mandos inalámbricos DualSense con el diseño de acoplamiento sencillo de la estación de recarga. Los mandos se cargan tan rápido como al conectarlos a la PS5, de forma que puedes liberar puertos USB sin sacrificar el rendimiento.',
    29.95,
    15,
    2
  );
INSERT INTO producto
VALUES (
    16,
    'Mando a distancia multimedia',
    'src/assets/img/mando_distancia_multimedia.png',
    'Navega cómodamente por el entretenimiento en tu consola PlayStation®5 con los intuitivos controles multimedia y para tu TV. ',
    29.99,
    15,
    2
  );
INSERT INTO producto
VALUES (
    17,
    'Auriculares Xbox Edicion Especial 20 Aniversario',
    'src/assets/img/auriculares_xbox_edicion_20_aniversario.png',
    'Juega alto y claro con los Cascos estéreo de Xbox: Edición especial del 20º aniversario en color negro clásico con toques verdes que vuelven a los inicios y mucho más',
    64.95,
    35,
    2
  );
INSERT INTO producto
VALUES (
    18,
    'Joy-Con (set Izda/Dcha) Azul Neón/Rojo Neón',
    'src/assets/img/joy-con-izda_dcha_azul_neon_rojo_neon.png',
    'Un mando o dos, en vertical o en horizontal, control por movimiento o mediante botones… Con los nuevos mandos Joy-Con para Nintendo Switch tendrás flexibilidad total a la hora de jugar y descubrirás nuevas formas de interactuar que transformarán por completo tus experiencias de juego.',
    74.95,
    50,
    2
  );
INSERT INTO producto
VALUES (
    19,
    'Set Funda + Protector Pantalla Switch OLED y Switch Estandar',
    'src/assets/img/set_funda_protector_pantalla_switch_oled.png',
    'Este pack está fabricado con los mejores materiales para ofrecer una protección inmejorable para tu Nintendo Switch OLED o Estándar.  También dispones de dos protectores para tu consola, por si alguno se te parte, tener uno disponible de reserva.',
    19.95,
    100,
    2
  );
INSERT INTO producto
VALUES (
    20,
    'Cable HDMI 2.1 8K Trust Ruza PS4-PS5-XSX-NSW',
    'src/assets/img/cable_hdmi_trust_ruza_ps4_ps5_xsx_nsw.png',
    'Cable HDMI de velocidad ultraalta y de 1,8 m de longitud para disfrutar del gaming de próxima generación con altas resoluciones de hasta 8 K.',
    14.95,
    30,
    2
  );
-- Insert Consola --
INSERT INTO producto
VALUES (
    21,
    'Xbox Series S + Xbox Game Pass',
    'src/assets/img/xbox_serie_s_xbox_game_pass.png',
    'Compra la consola Xbox Series S y llévate una suscripción de 3 meses de Xbox Game Pas para disfrutar del mundo digital a un precio increíble.',
    299.95,
    150,
    3
  );
INSERT INTO producto
VALUES (
    22,
    'Game & Watch The Legend of Zelda',
    'src/assets/img/game_and_watch_the_legend_of_zeld.png',
    'Rejuega algunos de los juegos más emblemáticos de The Legend of Zelda en una consola inspirada en el estilo retro que es ideal tanto para jugar como para coleccionar. Se pueden jugar la versiones de los juegos en inglés o japonés.',
    49.95,
    50,
    3
  );
INSERT INTO producto
VALUES (
    23,
    'Nintendo Switch Azul Neon Rojo Neon',
    'src/assets/img/nintendo_switch_azul_neon_rojo_neon.png',
    'A la potencia de una consola doméstica se le une la movilidad de una consola portátil en Nintendo Switch, la nueva generación de Nintendo que ofrece emociones en casa para uno o varios jugadores y la posibilidad de jugar al mismo título donde quieras, cuando quieras y con quien quieras.',
    299.95,
    100,
    3
  );
INSERT INTO producto
VALUES (
    24,
    'Nintendo Switch Lite Gris',
    'src/assets/img/nintendo_switch_lite_gris.png',
    'Una consola enfocada al juego portátil. Ideal para los jugadores que no se están quietos. Nintendo Switch Lite, la nueva incorporación a la familia Nintendo Switch, es una consola compacta, ligera y fácil de transportar, que cuenta con controles integrados.',
    219.95,
    50,
    3
  );
INSERT INTO producto
VALUES (
    25,
    'Nintendo Switch Lite Amarillo',
    'src/assets/img/nintendo_switch_lite_amarillo.png',
    'Una consola enfocada al juego portátil. Ideal para los jugadores que no se están quietos. Nintendo Switch Lite, la nueva incorporación a la familia Nintendo Switch, es una consola compacta, ligera y fácil de transportar, que cuenta con controles integrados.',
    219.95,
    50,
    3
  );
-- Insert Figuras --
INSERT INTO producto
VALUES (
    26,
    'Figura POP Pokemon: Bulbasur',
    'src/assets/img/figurar_pop_pokemon_bulbasur.png',
    'Bulbasaur es un Pokémon de tipo planta/veneno introducido en la primera generación. Es uno de los Pokémon iniciales que pueden elegir los entrenadores que empiezan su aventura en la región Kanto, junto a Squirtle y Charmander (excepto en Pokémon Amarillo). Destaca por ser el primer Pokémon de la Pokédex Nacional y la en la Pokédex de Kanto.',
    14.95,
    100,
    4
  );
INSERT INTO producto
VALUES (
    27,
    'Figura POP Pokemon: Charmander',
    'src/assets/img/figurar_pop_pokemon_charmander.png',
    "Charmander es un Pokémon de tipo fuego introducido en la primera generación. Es uno de los Pokémon iniciales que pueden elegir los entrenadores que empiezan su aventura en la región Kanto, junto a Bulbasaur y Squirtle, excepto en Pokémon Amarillo y Pokémon: Let's Go, Pikachu! y Pokémon: Let's Go, Eevee!",
    14.95,
    100,
    4
  );
INSERT INTO producto
VALUES (
    28,
    'Figura One Piece Moneky D. Luffy',
    'src/assets/img/figura_one_piece_monkeydluffy.png',
    'Compra esta espectacular figura de Monkey D. Luffy. El orgulloso capitán de los Piratas del Sombrero de Paja y usuario de una de las frutas del diablo, Luffy sueña con ser el Rey de los Piratas encontrando el legendario tesoro One Piece.',
    29.95,
    50,
    4
  );
INSERT INTO producto
VALUES (
    29,
    'Star Wars: Retro Game',
    'src/assets/img/star_awrs_retro_game.png',
    'Revive tus mejores recuerdos de la galaxia con esta edición retro del juego Star Wars-Escape de la Estrella de la Muerte del juego original, editado por Kenner en el año 1977. Los verdaderos fans de Star Wars podrán volver a experimentar momentos tan épicos como ayudar a sus personajes favoritos a escapar del temible Estrella de la Muerte. Ayuda a Luke Skywalker, Han Solo, Chewbacca o la mismísima Princesa Leia a traer a la galaxia de nuevo la libertad.',
    9.95,
    50,
    4
  );
INSERT INTO producto
VALUES (
    30,
    'Figurar POP My Hero Academia S8: Infinite Deku con Eri',
    'src/assets/img/figura_poo_my_hero_academia_s8_infinite_deku_con_eri.png',
    '',
    14.95,
    100,
    4
  );
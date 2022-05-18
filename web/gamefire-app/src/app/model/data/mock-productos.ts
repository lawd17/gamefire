import { itemCarrito } from "./itemCarrito";

//Datos mock para relizar pruebas
export const PRODUCTOS: itemCarrito[] = [
  {
    producto: {
      id: 1,
      nombre: "Elden Ring",
      imagen: "assets/img/eldenRing.png",
      descripcion:"Nuevo Juego de From Software",
      precio_venta: 59.99,
      stock: 100,
      id_categoria: 1
    },
    cantidad : 5
  },
  {
    producto: {
      id: 2,
      nombre: "The Word end width you final mix",
      imagen: "assets/img/the_world_end_with_you_final_mix.png",
      descripcion: "Aclamado por la crítica en su lanzamiento en Nintendo DS, la aventura de rol y acción The World Ends With You recibe reedición en Nintendo Switch con The World Ends With You -Final Remix-. El videojuego anima a conocer a Neku que, tras conocer a la misteriosa Shiki, debe completar una serie de retorcidas misiones o será borrado. En su llegada a la consola híbrida se permite superar cada cada combate con los controles tradicionales del juego o usa los mandos Joy-Con para conseguir un estilo de combate más fresco",
      precio_venta:  59.99,
      stock: 60,
      id_categoria: 1
    },
    cantidad : 1

  },
  {
    producto: {
      id: 3,
      nombre: "NEO: The World Ends With You",
      imagen: "assets/img/neo_the_world_end_with_you.png",
      descripcion:"NEO: The World Ends With You es un videojuego de rol y acción firmado por Square Enix continuación de un clásico moderno del género lanzado en 2007 para Nintendo DS, The World Ends with You. Sus responsables apuestan por llevar a los usuarios hasta las calles de Shibuya, donde se verán obligados a participar en el Juego de los Segadores, una contienda a vida o muerte por la supervivencia llena de misterios. NEO: The World Ends With You brinda a los jugadores una recreación del barrio de Shibuya moderno con un estilo único inspirado en cómics que pueden explorar y disfrutar en todos los sentidos, habiendo de derrotar a monstruos en combates trepidantes con ayuda de diferentes aliados y completar misiones con el objetivo de cambiar el destino que se les han impuesto.",
      precio_venta: 59.99,
      stock:50,
      id_categoria:1
    },
    cantidad : 3

  },
  {
    producto: {
      id: 4,
      nombre: "Horizon: Forbidden West",
      imagen: "assets/img/horizon_forbidden_west.png",
      descripcion:"Horizon: Forbidden West es la continuación de las aventuras de Aloy para PS5 y PS4 tras la exitosa recepción de Horizon: Zero Dawn, y nos lleva a otra tierra de fantasía de manos de Guerrilla Entertainment autores, además, de la saga Killzone. En concreto, la historia de este videojuego sigue los pasos de Aloy mientras avanza hacia el oeste en una América de un futuro lejano para enfrentar una frontera majestuosa, pero amenazante, en la que se enfrentará a máquinas asombrosas y nuevas amenazas misteriosas. Sus responsables apuestan a ofrecer con Horizon: Forbidden West una producción aún más bella y realista que saque partido al hardware de PlayStation 5.\n En su viaje hacia el Oeste Prohibido, a Aloy le espera un enorme mundo abierto que recorrer con frondosos bosques, ciudades hundidas e imponentes montañas en el que no faltan nuevos peligros. Horizon: Forbidden West nos desafía a luchar en batallas estratégicas contra máquinas enormes y los enemigos humanos que la controlando, dominando diferentes armas, equipo y tramas improvisadas con las piezas que encontremos a lo largo de este RPG de acción y aventura que apuesta a ser épico. En juego está descubrir el secreto del inminente colapso de la Tierra y sacar a la luz un capítulo oculto del pasado lejano... que cambiará a la protagonista de esta historia para siempre.",
      precio_venta: 59.99,
      stock:100,
      id_categoria:1
    },
    cantidad : 2

  },
  {
    producto: {
          id: 5,
          nombre: "King Arthur: Knight's Tale",
          imagen: "assets/img/king_arthur.png",
          descripcion:"King Arthur: Knight's Tale es un videojuego de rol táctico con fuerte énfasis en sus personajes que busca ofrecer un acercamiento moderno a una historia clásica de la mitología artúrica con toques de fantasía oscura. Neocore Games garantizan con este King Arthur: Knight's Tale una aventura con decisiones morales significantes para el desarrollo de la partida, agregando de esta forma tensión adicional a las decisiones tácticas y de gestión de un título con una estructura rogue-lite. Con esta premisa, es de esperar de King Arthur: Knight's Tale una potente y cuidada ambientación, llevando a usuario a explorar una tierra de pesadilla en la que monstruos malignos y criaturas mágicas acechan en bosques y castillos. ¿El culpable de todo ello? Nada menos que Arturo, quien tras caer en combate con Mordred ha sido resucitado llenando de oscuridad a Britania. Poner fin a este estado maldito es el objetivo del jugador, en el rol de Mordred, que tendrá que reunir a un equipo equipo de héroes con varias clases (defensor, campeón, tirador, vanguardia, arcanista y sabio).",
          precio_venta: 59.99,
          stock:100,
          id_categoria:1
    },
    cantidad : 1

  },
];

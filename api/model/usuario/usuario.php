<?php
include "../config.php";
include "../utilsDb.php";
$dbConn =  connect($db);

function validarDatos($input){
  $valido = true;

  if (isset($input["id"])) {
    //valido cualquier letra y numero sin especio entre 1 y 50 caracteres
    $valido = preg_match("/^[A-Za-z0-9]{1,50}$/", $input["id"]) ? $valido : false;
  }

  if (isset($input["username"])) {
    //valido nombre con letra y numero sin punto ni barra entre 8 y 15 caracteres 
    $valido = preg_match("/^(?=.{8,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/", $input["username"]) ? $valido : false;
  }

  if (isset($input["password"])) {
    //Minimo un digito, Mayuscula y una miniscula puede tener otros caracteres, entre 8 y 25 caracteres
    $valido = preg_match("/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z]?)\S{8,25}$/", $input["password"]) ? $valido : false;
  }

  if (isset($input["nombre"])) {
    $valido = preg_match("/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/", $input["nombre"]) ? $valido : false;
  }

  if (isset($input["apellidos"])) {
    //Maximo 5 palabra con la primera en mayuscula y puede tener espacios
    $valido = preg_match("/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]?){1,5}$/", $input["apellidos"]) ? $valido : false;
  }

  if (isset($input["telefono"])) {
    //puede empezar por +34 ó -, seguid de 9 numeros que pueden estar separados por -
    $valido = preg_match("/(\+34|0034|34)?[ -]*([0-9][ -]*){9}/", $input["telefono"]) ? $valido : false;
  }

  return $valido;
}

$get_400 = "HTTP/1.1 400 Incorrect some data";

/*
  listar todos los posts o solo uno
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if (isset($_GET['id'])) {
    //Mostrar un post
    if (!validarDatos($_GET)) {
      header($get_400);
      exit();
    }
    $sql = $dbConn->prepare("SELECT * FROM usuario where id=:id");
    $sql->bindValue(':id', $_GET['id']);
    $sql->execute();
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetch(PDO::FETCH_ASSOC));
    exit();
  } else {
    //Mostrar lista de post
    $sql = $dbConn->prepare("SELECT * FROM usuario LIMIT 10");
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll());
    exit();
  }
}
// Crear un nuevo post
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $input = $_POST;
  if (!validarDatos($_POST)) {
    header($get_400);
    exit();
  }
  $sql = "INSERT INTO usuario
          (id, username, password, nombre, apellidos, telefono)
          VALUES
          (:id, :username, :password, :nombre, :apellidos, :telefono)";
  $statement = $dbConn->prepare($sql);
  bindAllValues($statement, $input);
  $statement->execute();
  $postId = $dbConn->lastInsertId();
  if ($postId) {
    $input['id'] = $postId;
    header("HTTP/1.1 200 OK");
    echo json_encode($input);
    exit();
  }
}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
  if (!validarDatos($_GET)) {
    header($get_400);
    exit();
  }
  $id = $_GET['id'];
  $statement = $dbConn->prepare("DELETE FROM usuario where id=:id");
  $statement->bindValue(':id', $id);
  $statement->execute();
  header("HTTP/1.1 200 OK");
  exit();
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
  if (!validarDatos($_GET)) {
    header($get_400);
    exit();
  }
  $input = $_GET;
  $postId = $input['id'];
  $fields = getParams($input);
  $sql = "
          UPDATE usuario
          SET $fields
          WHERE id='$postId'
           ";
  $statement = $dbConn->prepare($sql);
  bindAllValues($statement, $input);
  $statement->execute();
  header("HTTP/1.1 200 OK");
  exit();
}

//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

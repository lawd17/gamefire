<?php
include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$idName = "id";
$tableName = "usuario";


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

/*
  listar todos los posts o solo uno
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    if (isset($_GET[$idName])){
      $input = $_GET;
      if (!validarDatos($input)) {
        error_400("Some data are invalid");
        exit();
      }

      $response = obtenerUno($dbConn,$tableName, $idName ,$input);
      ok_200();
      echo json_encode($response);
      exit();
	  }
    else {
      $response = obtenerTodos($dbConn,$tableName);
      ok_200();
      echo json_encode($response);
      exit();
	}
}

// Crear un nuevo post
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $input = $_POST;
    if (!validarDatos($input)) {
      header($get_400);
      exit();
    }

    $response = insertar($dbConn, $tableName, $input);
    ok_200();
    echo json_encode($response);
    exit;

}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
  $input = $_GET;
  if (!validarDatos($input)) {
    error_400("Some data are invalid");
    exit();
  }

  $response = eliminar($idName, $dbConn, $tableName, $input);
  ok_200();
  echo json_encode($response);
  exit;
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
  $input = $_GET;
  if (!validarDatos($input)) {
    error_400("Some data are invalid");
    exit();
  }
  $response = actualizar($idName, $dbConn, $tableName, $input);
  ok_200();
  echo json_encode($response);
  exit;
}

//En caso de que ninguna de las opciones anteriores se haya ejecutado
error_400();


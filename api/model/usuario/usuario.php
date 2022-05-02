<?php
header('Access-Control-Allow-Origin: *', true);

include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$idName = "id";
$username = "username";
$tableName = "usuario";

function validarDatos($input){
  $message = "";

  $message = evaluarParametro($input,"id", "/^[A-Za-z0-9]{1,50}$/", $message);
  $message = evaluarParametro($input,"username", "/^(?=.{8,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/", $message);
  $message = evaluarParametro($input,"password", "/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z]?)\S{8,25}$/", $message);
  $message = evaluarParametro($input,"nombre", "/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/", $message);
  $message = evaluarParametro($input,"apellidos", "/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]?){1,5}$/", $message);
  $message = evaluarParametro($input,"telefono", "/(\+34|0034|34)?[ -]*([0-9][ -]*){9}/", $message);

  if ($message != 0) {
    header(error_400() . $message);
    exit;
  }
}

/*
  listar todos los posts o solo uno
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if (isset($_GET[$idName])){
    $input = $_GET;
    $response = obtenerUno($dbConn,$tableName, $idName , $input);
    ok_200();
    echo json_encode($response);
    exit();
  } 

  if (isset($_GET[$username])){
    $input = $_GET;
    $response = obtenerUno($dbConn, $tableName, $username , $input);
    ok_200();
    echo json_encode($response);
    exit();
  } 

    $response = obtenerTodos($dbConn,$tableName);
    ok_200();
    echo json_encode($response);
    exit();

}

// Crear un nuevo post
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  $input = $_POST;
  validarDatos($input);

  $response = insertar($dbConn, $tableName, $input);

  ok_200();
  echo json_encode($response);
  exit;

}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
$input = $_GET;
validarDatos($input);

$response = eliminar($idName, $dbConn, $tableName, $input);
ok_200();
echo json_encode($response);
exit;
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
$input = $_GET;

validarDatos($input);

$response = actualizar($idName, $dbConn, $tableName, $input);
ok_200();
echo json_encode($response);
exit;
}

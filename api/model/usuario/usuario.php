<?php
header('Access-Control-Allow-Origin: *', true);

include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$fieldId = "id";
$fieldEmail = "email";
$tableName = "Usuarios";
$fieldPassword = "password";

function validarDatos($input){
  $message = "";
  $password = $input["password"];
  $message = evaluarParametro($input,"username", "/^[a-z0-9_-]{3,15}$/", $message);
  if (substr($password, 0, 3) != "$2y") {
    $message = evaluarParametro($input,"password", "/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z]?)\S{8,25}$/", $message);
  }
  $message = evaluarParametro($input,"nombre", "/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/", $message);
  $message = evaluarParametro($input,"apellidos", "/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]?){1,5}$/", $message);
  $message = evaluarParametro($input,"telefono", "/(\+34|0034|34)?[ -]*([0-9][ -]*){9}/", $message);

  if ($message != "") {
    header(error_400() . $message);
    exit;
  }
}

/*
  listar todos los posts o solo uno
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if (isset($_GET[$fieldId])){
    $input = $_GET[$fieldIdUser];
    $response = obtenerUno($dbConn, $tableName, $fieldId , $input);
    ok_200();
    echo json_encode($response);
    exit();
  } 

  if (isset($_GET[$fieldEmail])){
    $input = $_GET[$fieldEmail];
    $response = obtenerUno($dbConn, $tableName, $fieldEmail , $input);
    ok_200();
    echo json_encode($response);
    exit();
  } 

    $response = obtenerTodos($dbConn, $tableName);
    ok_200();
    echo json_encode($response);
    exit();

}

// Crear un nuevo post
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  $input = obtenerDatosEntrada();
  validarDatos($input);

  $existe = existe($dbConn, $tableName, $fieldId, $input[$fieldId]);
  
  //encriptar contraseña
  if (substr($input[$fieldPassword], 0, 3) != "$2y") {
    $input[$fieldPassword] = password_hash($input[$fieldPassword], PASSWORD_DEFAULT);
  }

  if ($existe) {
    $response = actualizar($fieldId, $dbConn, $tableName, $input);
  } else {
    $response = insertar($dbConn, $tableName, $input);
  }

  ok_200();
  echo json_encode($response);
  exit;

}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
$input = $_GET;
validarDatos($input);

$response = eliminar($fieldId, $dbConn, $tableName, $input);
ok_200();
echo json_encode($response);
exit;
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
$input = $_GET;

validarDatos($input);

//encriptar contraseña
$input[$fieldPassword] = password_hash($input[$fieldPassword], PASSWORD_DEFAULT);

$response = actualizar($fieldId, $dbConn, $tableName, $input);
ok_200();
echo json_encode($response);
exit;
}


header(error_400() . $message);
exit;
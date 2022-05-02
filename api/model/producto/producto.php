<?php
header('Access-Control-Allow-Origin: *', true);

include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$idName = "id";
$categoria = "id_categoria";
$nombre = "nombre";
$tableName = "producto";

function validarDatos($input){
  $message = "";

  $message = evaluarParametro($input,"id", "/^[A-Za-z0-9]{1,50}$/", $message);
  $message = evaluarParametro($input,"nombre", "/^[A-ZÁÉÍÓÚa-zñáéíóú\s]*$/", $message);
  $message = evaluarParametro($input,"imagen", "/^[\w/\.]+(\s|)$/", $message);
  $message = evaluarParametro($input,"precio_venta", "/^[\d]+(\.\,[\d]{1,4})?$/", $message);
  $message = evaluarParametro($input,"stock", "/^\d{1,5}$/", $message);
  $message = evaluarParametro($input,"id_categoria", "/^[A-Za-z0-9]{1,50}$/", $message);


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
    $input = $_GET[$idName];
    $response = obtenerUno($dbConn,$tableName, $idName ,$input);
    ok_200();
    header('Access-Control-Allow-Origin: http://site-a.com', false);
    echo json_encode($response);
    exit();
  } else if (isset($_GET[$categoria])){
    $input = $_GET[$categoria];
    $response = obtenerUno($dbConn,$tableName, $idName ,$input);
    ok_200();
    echo json_encode($response);
    exit();
  } else if (isset($_GET[$nombre])){
    $input = $_GET[$nombre];
    $response = obtenerUno($dbConn,$tableName, $idName ,$input);
    ok_200();
    echo json_encode($response);
    exit();
  } else {
    $response = obtenerTodos($dbConn,$tableName);
    ok_200();
    echo json_encode($response);
    exit();
  }
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

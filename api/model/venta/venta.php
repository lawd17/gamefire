<?php
include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$idName = "id";
$tableName = "venta";

function validarDatos($input){
  $message = "";

  $message = evaluarParametro($input,"id", "/^[A-Za-z0-9]{1,50}$/", $message);
  $message = evaluarParametro($input,"id_usuario", "/^[A-Za-z0-9]{1,50}$/", $message);
  $message = evaluarParametro($input,"fecha", "/^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/", $message);
  $message = evaluarParametro($input,"impuesto", "/^[\d]+(\.\,[\d]{1,4})?$/", $message);
  $message = evaluarParametro($input,"total", "/^[\d]+(\.\,[\d]{1,4})?$/", $message);

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

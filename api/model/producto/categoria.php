<?php
header('Access-Control-Allow-Origin: *', true);

include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$fieldId = "id";
$fieldIdCategorias = "id_categoria";
$fieldNombre = "nombre";
$tableName = "Productos";
$limit = 10;//limite para los campos por defecto

/**
 * Metodo que se encarga de comprobar que los datos cumplen 
 * el formato requerido si no se lanza un http 400
 */
function validarDatos(array $input): void{
  $message = "";

  $message = evaluarParametro($input["nombre"], "/^[A-ZÁÉÍÓÚa-zñáéíóú\s]*$/", $message);
  $message = evaluarParametro($input["imagen"], "/^[\w/\.]+(\s|)$/", $message);
  $message = evaluarParametro($input["precio_venta"], "/^[\d]+(\.\,[\d]{1,4})?$/", $message);
  $message = evaluarParametro($input["stock"], "/^\d{1,5}$/", $message);
  $message = evaluarParametro($input["id_categoria"], "/^[A-Za-z0-9]{1,50}$/", $message);


  if ($message != 0) {
    header(error_400() . $message);
    exit;
  }
}

$dbConn =  connect($db);
$fieldId = "id";
$fieldIdCategorias = "id_categoria";
$fieldNombre = "nombre";
$tableName = "Productos";
$limit = 10;
/*
  listar todos los posts o solo uno
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if (isset($_GET["limit"])) {
    $limit = intval($_GET["limit"]);
  }

  if (isset($_GET[$fieldId])){
    $input = $_GET[$fieldId];
    $response = obtenerUno($dbConn,$tableName, $fieldId ,$input);
    ok_200();
    echo json_encode($response);
    exit();

  } else if (isset($_GET[$fieldIdCategorias])){
    $input = $_GET[$fieldIdCategorias];
    $response = obtenerTodosByField($dbConn, $tableName, $fieldIdCategorias, $input, $limit);
    ok_200();
    echo json_encode($response);
    exit();

  } else if (isset($_GET[$fieldNombre])){
    $input = $_GET[$fieldNombre];
    $response = obtenerPorNombre($dbConn, $tableName, $fieldNombre, $input, $limit);
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
/*
//Peticion POST
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  $input = obtenerDatosEntrada();
  validarDatos($input);

  $existe = existe($dbConn, $tableName, $fieldId, $input[$fieldId]);

  if ($existe) {
    $response = actualizar($fieldId, $dbConn, $tableName, $input);
  } else {
    $response = insertar($dbConn, $tableName, $input);
  }

  ok_200();
  echo json_encode($response);
  exit;

}

//Peticion DELETE
if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
$input = $_GET;
validarDatos($input);

$response = eliminar($idName, $dbConn, $tableName, $input);
ok_200();
echo json_encode($response);
exit;
}

//Peticion PUT

if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
$input = $_GET;

validarDatos($input);

$response = actualizar($idName, $dbConn, $tableName, $input);
ok_200();
echo json_encode($response);
exit;
}

*/

header(error_400() . $message);
exit;
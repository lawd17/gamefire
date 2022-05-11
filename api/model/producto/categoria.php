<?php
header('Access-Control-Allow-Origin: *', true);

include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$fieldId = "id";
$tableName = "Categorias";

function validarDatos($input){
  $message = "";

  $message = evaluarParametro($input,"nombre", "/^[A-ZÁÉÍÓÚa-zñáéíóú\s]*$/", $message);

  if ($message != 0) {
    header(error_400() . $message);
    exit;
  }
}

/*
  listar todos los posts o solo uno
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if (isset($_GET[$fieldId])){
    $input = $_GET[$fieldId];
    $response = obtenerUno($dbConn, $tableName, $fieldId ,$input);
    
    ok_200();
    echo json_encode($response);
    exit();
  } 

    $response = obtenerTodos($dbConn,$tableName);
    
    ok_200();
    echo json_encode($response);
    exit();

}

/*
// Crear un nuevo post
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

$response = actualizar($fieldId, $dbConn, $tableName, $input);
ok_200();
echo json_encode($response);
exit;
}
*/

header(error_400() . $message);
exit;
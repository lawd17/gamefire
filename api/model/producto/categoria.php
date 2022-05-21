<?php
header('Access-Control-Allow-Origin: *', true);

include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$fieldId = "id";
$tableName = "Categorias";

/**
 * Metodo que se encarga de comprobar que los datos cumplen 
 * el formato requerido si no se lanza un http 400
 */
function validarDatos(array $input) : void{
  $message = "";

  $message = evaluarParametro($input["nombre"], "/^[A-ZÁÉÍÓÚa-zñáéíóú\s]*$/", $message);

  if ($message != 0) {
    header(error_400() . $message);
    exit;
  }
}

//Peticion GET
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

//Funciones deshabilitadas
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

$response = eliminar($fieldId, $dbConn, $tableName, $input);
ok_200();
echo json_encode($response);
exit;
}


//Peticion PUT
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
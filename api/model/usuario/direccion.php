<?php
header('Access-Control-Allow-Origin: *', true);

include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$fieldId = "id";
$fieldUserId = "id_usuario";
$tableName = "Direcciones";

function validarDatos($input){
  $message = "";

  $message = evaluarParametro($input,"id_usuario", "/^[A-Za-z0-9]{1,50}$/", $message);
  $message = evaluarParametro($input,"ciudad", "/^(\w*[\s]?){1,5}$/", $message);
  $message = evaluarParametro($input,"codigo_postal", "/^[0-5][1-9]{3}[0-9]$/", $message);
  $message = evaluarParametro($input,"pais", "/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)$/", $message);

  if ($message != "") {
    header(error_400() . $message);
    exit;
  }
}

/*
  listar todos los posts o solo uno
 */

 if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if (isset($_GET[$fieldUserId])){
    $input = $_GET[$fieldUserId];
    $response = obtenerUno($dbConn,$tableName, $fieldUserId ,$input);

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
  $input = obtenerDatosEntrada();
  validarDatos($input);

  $existe = existe($dbConn, $tableName, $fieldUserId, $input[$fieldUserId]);

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

/*
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
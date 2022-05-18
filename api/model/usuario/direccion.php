<?php
header('Access-Control-Allow-Origin: *', true);

include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$fieldId = "id";
$fieldUserId = "id_usuario";
$tableName = "Direcciones";

/**
 * Metodo que se encarga de comprobar que los datos cumplen 
 * el formato requerido si no se lanza un http 400
 */
function validarDatos(array $input): void
{
  $message = "";

  $message = evaluarParametro($input["id_usuario"], "/^[A-Za-z0-9]{1,50}$/", $message);
  $message = evaluarParametro($input["ciudad"], "/^(\w*[\s]?){1,5}$/", $message);
  $message = evaluarParametro($input["codigo_postal"], "/^[0-5][1-9]{3}[0-9]$/", $message);
  $message = evaluarParametro($input["pais"], "/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)$/", $message);

  if ($message != "") {
    header(error_400() . $message);
    exit;
  }
}


//Peticion GET
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if (isset($_GET[$fieldUserId])) {
    $input = $_GET[$fieldUserId];
    $response = obtenerUno($dbConn, $tableName, $fieldUserId, $input);

    ok_200();
    echo json_encode($response);
    exit();
  }

  $response = obtenerTodos($dbConn, $tableName);
  ok_200();
  echo json_encode($response);
  exit();
}

// Peticion POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
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

// Peticion DELETE
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
  $input = $_GET;
  validarDatos($input);

  $response = eliminar($fieldId, $dbConn, $tableName, $input);

  ok_200();
  echo json_encode($response);
  exit;
}

/*
// Peticion PUT
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

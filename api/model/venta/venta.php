<?php
header('Access-Control-Allow-Origin: *', true);

include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$fieldId = "id";
$fieldIdUser = "id_usuario";
$tableName = "Ventas";

/**
 * Metodo que se encarga de comprobar que los datos cumplen 
 * el formato requerido si no se lanza un http 400
 */
function validarDatos(array $input): void{
  $message = "";

  //$message = evaluarParametro($input["fecha"], "/(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/m", $message);
  $message = evaluarParametro($input["impuesto"], "/^([A-Z]){2,10}$/", $message);

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
    $input = $_GET[$fieldId];
    $response = obtenerUno($dbConn,$tableName, $fieldId ,$input);

    ok_200();
    echo json_encode($response);
    exit();
  } 

  if (isset($_GET[$fieldIdUser])){
    $input = $_GET[$fieldIdUser];
    $response = obtenerTodosByField($dbConn, $tableName, $fieldIdUser, $input);

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
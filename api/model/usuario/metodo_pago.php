<?php
header('Access-Control-Allow-Origin: *', true);

include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$fieldId = "id";
$fieldIdUser = "id_usuario";
$tableName = "Metodos_pago";

function validarDatos($input){
  $message = "";

  $message = evaluarParametro($input,"id_usuario", "/^[A-Za-z0-9]{1,50}$/", $message);
  $message = evaluarParametro($input,"tipo_pago", "/\w*/", $message);
  
  if ($input["numero_cuenta"] != 0) {
    $message = evaluarParametro($input,"numero_cuenta", "/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$/", $message);
  }
  if ($input["expiracion"] != "") {
    $message = evaluarParametro($input,"expiracion", "/^([(0+[1-9]|1+[0-2])+[\/]+([2-9][0-9])$/", $message);
  }

  if ($message != "") {
    header(error_400() . $message);
    exit;
  }
}

function verificarDatos($input){
  if ($input["numero_cuenta"] == 0) {
    $input["numero_cuenta"] = null;
  }
  if ($input["expiracion"] == "") {
    $input["expiracion"] = null;
  }
  if ($input["titular"] == "") {
    $input["titular"] = null;
  }
  if ($input["cvv"] == 0) {
    $input["cvv"] = null;
  }

  return $input;
}

/*
  listar todos los posts o solo uno
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  if (isset($_GET[$fieldIdUser])){
    $input = $_GET[$fieldIdUser];
    $response = obtenerUno($dbConn, $tableName, $fieldIdUser ,$input);
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

  $input = verificarDatos($input);

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
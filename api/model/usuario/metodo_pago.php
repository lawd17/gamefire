<?php
include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$idName = "user_id";
$tableName = "metodo_pago";

function validarDatos($input){
  $valido = true;

  if (isset($input["id"])) {
    //valido cualquier letra y numero sin especio entre 1 y 50 caracteres
    $valido = preg_match("/^[A-Za-z0-9]{1,50}$/", $input["id"]) ? $valido : false;
  }

  if (isset($input["user_id"])) { 
    //valido cualquier letra y numero sin especio entre 1 y 50 caracteres
    $valido = preg_match("/^[A-Za-z0-9]{1,50}$/", $input["user_id"]) ? $valido : false;
  }

  if (isset($input["tipo_pago"])) {
    $valido = preg_match("/\w*/", $input["tipo_pago"]) ? $valido : false;
  }

  if (isset($input["proveedor"])) {
    //cualquer palabra que puede tener letras, caracteres y numeros
    $valido = preg_match("/\w*/", $input["proveedor"]) ? $valido : false;
  }

  if (isset($input["numero_cuenta"])) {
    //Cualquier palabra con la primera letra en mayuscula
    $valido = preg_match("/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$/", $input["numero_cuenta"]) ? $valido : false;
  }

  if (isset($input["expiracion"])) {
    //puede empezar por +34 ó -, seguid de 9 numeros que pueden estar separados por -
    $valido = preg_match("/^([(0+[1-9]|1+[0-2])+[\/]+([2-9][0-9])$/", $input["expiracion"]) ? $valido : false;
  }

  return $valido;
}

/*
  listar todos los posts o solo uno
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    if (isset($_GET[$idName])){
      $input = $_GET;
      if (!validarDatos($input)) {
        error_400("Some data are invalid");
        exit();
      }

      $response = obtenerUno($dbConn,$tableName, $idName ,$input);
      ok_200();
      echo json_encode($response);
      exit();
	  }
    else {
      $response = obtenerTodos($dbConn,$tableName);
      ok_200();
      echo json_encode($response);
      exit();
	}
}

// Crear un nuevo post
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $input = $_POST;
    if (!validarDatos($input)) {
      header($get_400);
      exit();
    }

    $response = insertar($dbConn, $tableName, $input);
    ok_200();
    echo json_encode($response);
    exit;

}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
  $input = $_GET;
  if (!validarDatos($input)) {
    error_400("Some data are invalid");
    exit();
  }

  $response = eliminar($idName, $dbConn, $tableName, $input);
  ok_200();
  echo json_encode($response);
  exit;
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
  $input = $_GET;
  if (!validarDatos($input)) {
    error_400("Some data are invalid");
    exit();
  }
  $response = actualizar($idName, $dbConn, $tableName, $input);
  ok_200();
  echo json_encode($response);
  exit;
}

//En caso de que ninguna de las opciones anteriores se haya ejecutado
error_400();

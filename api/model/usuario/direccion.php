<?php
include "../config.php";
include "../utilsDb.php";
include "../errors.php";
$dbConn =  connect($db);
$idName = "user_id";
$tableName = "direccion";

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

  if (isset($input["direccion1"]) && isset($input["direccion2"])) {
    //cualquer palabra que puede tener letras, caracteres y numeros
    $valido = preg_match("/^(((\w\d*)+[,:.º-]?[\s\d]){1,20})+$/", $input["direccion1"]) ? $valido : false;
  
  }

  if (isset($input["direccion2"]) && $input["direccion2"] !== "") {
    //cualquer palabra que puede tener letras, caracteres y numeros
    $valido = preg_match("/^(((\w\d*)+[,:.º-]?[\s\d]){1,20})$/", $input["direccion1"]) ? $valido : false;
  }

  if (isset($input["ciudad"])) {
    //Cualquier palabra con la primera letra en mayuscula
    $valido = preg_match("/^(\w*[\s]?){1,5}$/", $input["ciudad"]) ? $valido : false;
  }

  if (isset($input["codigo_postal"])) {
    //puede empezar por +34 ó -, seguid de 9 numeros que pueden estar separados por -
    $valido = preg_match("/^[0-5][1-9]{3}[0-9]$/", $input["codigo_postal"]) ? $valido : false;
  }

  if (isset($input["pais"])) {
    //puede empezar por +34 ó -, seguid de 9 numeros que pueden estar separados por -
    $valido = preg_match("/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+)$/", $input["pais"]) ? $valido : false;
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

<?php
header('Access-Control-Allow-Origin: *', true);

include "./model/config.php";
include "./model/utilsDb.php";
include "./model/errors.php";
$dbConn =  connect($db);

function validarDatos($username, $password){
  $message = "";

  $message = evaluarParametro($username,"username", "/^(?=.{8,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/", $message);
  $message = evaluarParametro($password,"password", "/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z]?)\S{8,25}$/", $message);

  if ($message != 0) {
    header(error_400() . $message);
    exit;
  }
}

$tableName = "usuario";
$username = "username";
$password = "password";

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $usernameValue = $data->$username;
    $passwordValue = $data->$password;

    validarDatos($usernameValue, $passwordValue);
    $response = obtenerUno($dbConn, $tableName, $username, $usernameValue); 
    if ($response != false) {
      if ($response['password'] == $passwordValue) {
        $response = true;
        ok_200();
        echo json_encode($response);
        exit();
      }
    }

    error_400("Icorrect data"); 
}
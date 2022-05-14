<?php
header('Access-Control-Allow-Origin: *', true);

include "./model/config.php";
include "./model/utilsDb.php";
include "./model/errors.php";
$dbConn =  connect($db);

function validarDatos($input){
  $message = "";

  $message = evaluarParametro($input,"email", "/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/", $message);
  $message = evaluarParametro($input,"password", "/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z]?)\S{8,25}$/", $message);

  if ($message != "") {
    error_400();
    exit();
  }
}

$tableName = "Usuarios";
$fieldEmail = "email";
$fieldPassword = "password";

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $json = file_get_contents('php://input');
    $stdClass = json_decode($json);

    $input = json_decode(json_encode($stdClass), TRUE);

    validarDatos($input);

    $email = $input[$fieldEmail];
    $password = $input[$fieldPassword];

    $pp = password_hash($password, PASSWORD_DEFAULT);


    $response = obtenerUno($dbConn, $tableName, $fieldEmail, $email); 
    if ($response != false) {
      if (password_verify( $password, $response[$fieldPassword])) {
        $response = $email;
        ok_200();
        echo json_encode($response);
        exit();
      }
    }

    error_400();
    exit();
}
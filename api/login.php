<?php
header('Access-Control-Allow-Origin: *', true);

include "./model/config.php";
include "./model/utilsDb.php";
include "./model/errors.php";
$dbConn =  connect($db);

/**
 * Metodo que se encarga de comprobar que los datos cumplen 
 * el formato requerido si no se lanza un http 400
 */
function validarDatos(array $input): void{
  $message = "";

  $message = evaluarParametro($input["email"], "/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/", $message);
  $message = evaluarParametro($input["password"], "/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z]?)\S{8,25}$/", $message);

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
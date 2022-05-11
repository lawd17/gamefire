<?php
//Abrir conexion a la base de datos
function connect($db){
  try {
    $conn = new PDO("mysql:host={$db['host']};dbname={$db['db']};charset=utf8", $db['username'], $db['password']);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $conn;
  } catch (PDOException $exception) {
    exit($exception->getMessage());
  }
}

//Obtener parametros para actualizar
function getParams($input){
  $filterParams = [];
  foreach ($input as $param => $value) {
    $filterParams[] = "$param=:$param";
  }
  return implode(", ", $filterParams);
}

//Asociar todos los parametros a un sql
function bindAllValues($statement, $params){
  foreach ($params as $param => $value) {
    $statement->bindValue(':' . $param, $value);
  }
  return $statement;
}

function getSqlParams($input){
  $params = "";
  foreach ($input as $key => $value) {
    if ($params == "") {
      $params .= "($key";
    } else {
      $params .= ", " . $key;
    }
  }
  $params .= ")";

  return $params;
}

function getSqlValues($input){
  $params = "";
  foreach ($input as $key => $value) {
    if ($params == "") {
      $params .= "(:$key";
    } else {
      $params .= ", :" . $key;
    }
  }
  $params .= ")";

  return $params;
}

function insertar($dbConn, $tableName, $input){
  try {
    $params = getSqlParams($input);
    $values = getSqlValues($input);
    $sql = "INSERT INTO $tableName $params VALUES $values";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();

    return true;
  } catch (PDOException $exception) {
    error_500($exception);
    exit();
  }
}

function eliminar($idName, $dbConn, $tableName, $input)
{
  try {
    $id = $input[$idName];
    $statement = $dbConn->prepare("DELETE FROM $tableName where $idName=:$idName");
    $statement->bindValue(":$idName", $id);
    $response = $statement->execute();

    return $response;
  } catch (PDOException $exception) {
    error_500($exception);
    exit();
  }
}

function actualizar($idName, $dbConn, $tableName, $input){
  try {
    $id = $input[$idName];
    $fields = getParams($input);

    $sql = "UPDATE $tableName SET $fields WHERE $idName=:$idName";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $response = $statement->execute();

    return $response;
  } catch (Exception $exception) {
    error_500($exception);
    exit();
  }
}

function obtenerTodos($dbConn, $tableName, $limit = 10){
  try {
    $statement = $dbConn->prepare("SELECT * FROM $tableName LIMIT $limit");
    $statement->execute();
    $statement->setFetchMode(PDO::FETCH_ASSOC);

    return $statement->fetchAll();
  } catch (PDOException $exception) {
    error_500($exception);
    exit();
  }
}

function obtenerPorCategoria($dbConn, $tableName, $columName, $input,  $limit = 10){
  try {
    $statement = $dbConn->prepare("SELECT * FROM $tableName where $columName=:$columName LIMIT $limit");
    $statement->bindValue(":$columName", $input[$columName]);
    $statement->execute();
    $statement->setFetchMode(PDO::FETCH_ASSOC);

    return $statement->fetchAll();
  } catch (PDOException $exception) {
  } catch (PDOException $exception) {
    error_500($exception);
    exit();
  }
}

function obtenerPorNombre($dbConn, $tableName, $columName, $value,  $limit = 10){
  try {
    $statement = $dbConn->prepare("SELECT * FROM $tableName WHERE $columName LIKE '%$value%' LIMIT $limit");
    $statement->execute();
    $statement->setFetchMode(PDO::FETCH_ASSOC);

    return $statement->fetchAll();
  } catch (PDOException $exception) {
    error_500($exception);
    exit();
  }
}

function existe($dbConn, $tableName, $columName, $columnValue){
  $elemento = obtenerUno($dbConn, $tableName, $columName, $columnValue);

  if ($elemento != "") {
    return true;
  }

  return false;
}

function obtenerUno($dbConn, $tableName, $columName, $columnValue){
  try {
    $statement = $dbConn->prepare("SELECT * FROM $tableName where $columName=:$columName");
    $statement->bindValue(":$columName", $columnValue);
    $statement->execute();

    return $statement->fetch(PDO::FETCH_ASSOC);
  } catch (PDOException $exception) {
    error_500($exception);
    exit();
  }
}

function evaluarParametro($input, $param, $regex, $message){
  $valido = false;

  if (isset($input[$param])) {
    $valido = preg_match($regex, $input[$param]) ? true : false;
  } else {
    $message .= "El campo $param no existe \n";
  }

  if (!$valido) {
    $message .= "El campo $param no cumple el patrón de validacion. \n";
  }


  return $message;
}

function obtenerDatosEntrada(){
  if ($data = file_get_contents('php://input')) {
    $stdClass = json_decode($data);
    return json_decode(json_encode($stdClass), TRUE);
  }

  return $_POST;
}

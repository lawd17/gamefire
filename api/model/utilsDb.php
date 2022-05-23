<?php
//Abrir conexion a la base de datos
function connect(array $db): PDO{
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
function getParams(array $input): string{
  $filterParams = [];
  foreach ($input as $param => $value) {
    $filterParams[] = "$param=:$param";
  }
  return implode(", ", $filterParams);
}

//Asociar todos los parametros a un sql
function bindAllValues(PDOStatement $statement , array $params){
  foreach ($params as $param => $value) {
    $statement->bindValue(':' . $param, $value);
  }
  return $statement;
}

//
function getSqlParams(array $input): string{
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

function getSqlValues(array $input): string{
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

/**
 * Funcion que se encarga de insertar un campo en la base de datos
 */
function insertar(PDO $dbConn, string $tableName, array $input){
  try {
    $params = getSqlParams($input);
    $values = getSqlValues($input);
    $sql = "INSERT INTO $tableName $params VALUES $values";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();

    return $dbConn->lastInsertId();
  } catch (PDOException $exception) {
    error_500($exception);
    exit();
  }
}

/**
 * Funcion que se encarga de eliminar un campo en la base de datos
 */
function eliminar(string $fieldId, PDO $dbConn, string $tableName, $input){
  try {
    $id = $input[$fieldId];
    $statement = $dbConn->prepare("DELETE FROM $tableName where $fieldId=:$fieldId");
    $statement->bindValue(":$fieldId", $id);
    $response = $statement->execute();

    return $response;
  } catch (PDOException $exception) {
    error_500($exception);
    exit();
  }
}

/**
 * Funcion que se encarga de actualizar un campo en la base de datos
 */
function actualizar(string $fieldId, PDO $dbConn, string $tableName, $input){
  try {
    $id = $input[$fieldId];
    $fields = getParams($input);

    $sql = "UPDATE $tableName SET $fields WHERE $fieldId=:$fieldId";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();

    return $dbConn->lastInsertId();
  } catch (Exception $exception) {
    error_500($exception);
    exit();
  }
}

/**
 * Funcion que se encarga de obtener todos los registros que cumplan con el parametro, con un limite 
 * por defecto de 20
 */
function obtenerTodosByField(PDO $dbConn, string $tableName, string $columName, $columValue, $limit = 20){
  try {
    $statement = $dbConn->prepare("SELECT * FROM $tableName where $columName=:$columName LIMIT $limit");
    $statement->bindValue(":$columName", $columValue);
    $statement->execute();
    $statement->setFetchMode(PDO::FETCH_ASSOC);

    return $statement->fetchAll();
  } catch (PDOException $exception) {
    error_500($exception);
    exit();
  }
}

/**
 * Funcion que se encarga de obtener todos los reistros de una tabla con un limite por defecto de 10
 */
function obtenerTodos(PDO $dbConn, string $tableName, $limit = 10){
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

/**
 * Funcion que se encarga de obtenr todos los registros de un campo que incluya en el nombre el valor 
 * pasado por parametros
 */
function obtenerPorNombre(PDO $dbConn, string $tableName, string $columName, string $value, $limit = 20){
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

/**
 * Funcion que se encarga e comprobar is un elementos ya existe en la base de datos 
 */
function existe(PDO $dbConn, string $tableName, string $columName, string $columnValue){
  $elemento = obtenerUno($dbConn, $tableName, $columName, $columnValue);

  if ($elemento != "") {
    return true;
  }

  return false;
}

/**
 * Funcion especifica que obtiene los datos basicos de los productos de una venta
 */
function obtenerListaProductosVenta(PDO $dbConn, string $valueIdVenta){
  try {
    $statement = $dbConn->prepare("SELECT Detalles_venta.id, 
    Detalles_venta.id_producto, 
    Detalles_venta.id_venta,
    Productos.nombre,
    Productos.imagen,
    Productos.descripcion,
    Productos.precio_venta,
    Productos.id_categoria,
    Detalles_venta.cantidad FROM Detalles_venta 
    INNER JOIN Productos ON Detalles_venta.id_producto=Productos.id WHERE Detalles_venta.id_venta = $valueIdVenta;");
    $statement->execute();

    $statement->setFetchMode(PDO::FETCH_ASSOC);

    return $statement->fetchAll();
  } catch (PDOException $exception) {
    error_500($exception);
    exit();
  }
}

/**
 * Funcion que se obtiene un registro concreto de la base de datos 
 */
function obtenerUno(PDO $dbConn, string $tableName, string $columName, string $columnValue){
  try {
    $statement = $dbConn->prepare("SELECT * FROM $tableName where $columName=:$columName");
    $statement->bindValue(":$columName", $columnValue);
    $statement->execute();

    $response = $statement->fetch(PDO::FETCH_ASSOC);
    return $response;
  } catch (PDOException $exception) {
    error_500($exception);
    exit();
  }
}

/**
 * Funcion que valida si el parametros cumple el patron
 */
function evaluarParametro($value, $regex, string $message){

  $valido = false;
  if(preg_match($regex, $value) == 1){
    $valido = true;
  } 

  if (!$valido) {
    $message .= "El campo '$value' no cumple el patrón de validacion. \n";
  }

  return $message;
}

/**
 * Funcion que recoje los datos de una peticion post u los convierte a array 
 * si es necesario, puederesiver $_POST o un json
 */
function obtenerDatosEntrada(){
  if ($data = file_get_contents('php://input')) {
    $stdClass = json_decode($data);
    return json_decode(json_encode($stdClass), TRUE);
  }

  return $_POST;
}

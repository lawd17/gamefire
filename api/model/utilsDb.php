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

function lanzarConsulta($dbConn, $input, $sql){
    try {
        $statement = $dbConn->prepare($sql);
        bindAllValues($statement, $input);
        $respone = $statement->execute();
        return $respone;

    } catch (PDOException $exception) {
        echo json_encode($exception);
        exit;
    }
  }
  
  function getSqlParams($input){
    $params = "";
    foreach ($input as $key => $value) {
      if ($params == "") {
        $params .= "($key";
      } else {
        $params .= ", ". $key;
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
        $params .= ", :". $key;
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

        $postId = $statement->lastInsertId();
        if($postId){
            $input['id'] = $postId;
            header("HTTP/1.1 200 OK");
            echo json_encode($input);
            exit();
        }
      } catch (PDOException $exception) {
        header("HTTP/1.1 500 Internal error");
        exit($exception);
      }
  }

  function eliminar($idName, $dbConn, $tableName, $input){
    try {
        $id = $input[$idName];
        $statement = $dbConn->prepare("DELETE FROM $tableName where $idName=:$idName");
        $statement->bindValue(":$idName", $id);
        $response = $statement->execute();

        return $response;
    } catch (PDOException $exception) {
        header("HTTP/1.1 500 Internal error");
        exit($exception);
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
        header("HTTP/1.1 500 Internal error");
        exit($exception);
    }
  }

  function obtenerTodos($dbConn, $tableName, $limit = 10){
    try {
        $statement = $dbConn->prepare("SELECT * FROM $tableName LIMIT $limit");
        $statement->execute();
        $statement->setFetchMode(PDO::FETCH_ASSOC);

        return $statement->fetchAll();
    } catch (PDOException $exception) {
        exit($exception);
    }
  }

function obtenerUno($dbConn, $tableName, $idName, $input){
    try {
        $statement = $dbConn->prepare("SELECT * FROM $tableName where $idName=:$idName");
        $statement->bindValue(":$idName", $input[$idName]);
        $statement->execute();

        return $statement->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $exception) {
        header("HTTP/1.1 500 Internal error");
        exit($exception);
    }
}
  

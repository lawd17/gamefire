<?php
include "../config.php";
include "../utilsDb.php";
$dbConn =  connect($db);
$get_400 = "HTTP/1.1 400 Incorrect some data";

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
    if (isset($_GET['user_id'])){
      //Mostrar un post
      if (!validarDatos($_GET)) {
        header($get_400);
        exit();
      }
      $sql = $dbConn->prepare("SELECT * FROM direccion where user_id=:user_id");
      $sql->bindValue(':user_id', $_GET['user_id']);
      $sql->execute();
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetch(PDO::FETCH_ASSOC));
      exit();
	  }
    else {
      //Mostrar lista de post
      $sql = $dbConn->prepare("SELECT * FROM direccion LIMIT 10");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode($sql->fetchAll());
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

    $sql = "INSERT INTO direccion
          (id, user_id, direccion1, direccion2, ciudad, codigo_postal, pais)
          VALUES
          (:id, :user_id, :direccion1, :direccion2, :ciudad, :codigo_postal, :pais)";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    $postId = $dbConn->lastInsertId();
    if($postId){
      $input['id'] = $postId;
      header("HTTP/1.1 200 OK");
      echo json_encode($input);
      exit();
	 }
}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
	$id = $_GET['user_id'];
  if (!validarDatos($_GET)) {
    header($get_400);
    exit();
  }
  $statement = $dbConn->prepare("DELETE FROM direccion where user_id=:user_id");
  $statement->bindValue(':user_id', $id);
  $statement->execute();
	header("HTTP/1.1 200 OK");
	exit();
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
    $input = $_GET;
    if (!validarDatos($input)) {
      header($get_400);
      exit();
    }
    $postId = $input['user_id'];
    $fields = getParams($input);
    $sql = "
          UPDATE direccion
          SET $fields
          WHERE user_id='$postId'";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    header("HTTP/1.1 200 OK");
    exit();
}

//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

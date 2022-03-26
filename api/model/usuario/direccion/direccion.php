<?php
include "../config.php";
include "../utilsDb.php";
$dbConn =  connect($db);

function validarDatos($input){
  $valido = true;

  if (isset($input["id"])) {
    //valido cualquier letra y numero sin especio entre 1 y 50 caracteres
    $valido = preg_match("/^[A-Za-z0-9]{1,50}$/", $input["id"]) ? $valido : false;
  }

  if (isset($input["user_id"])) { 
    //valido nombre con letra y numero sin punto ni barra entre 8 y 15 caracteres 
    $valido = preg_match("/^[A-Za-z0-9]{1,50}$/", $input["user_id"]) ? $valido : false;
  }

  if (isset($input["direccion1"])) {
    //Minimo un digito, Mayuscula y una miniscula puede tener otros caracteres, entre 8 y 25 caracteres
    $valido = preg_match("/^[a-zñáéíóú]+$/", $input["direccion1"]) ? $valido : false;
  }

  if (isset($input["direccion2"])) {
    $valido = preg_match("/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/", $input["direccion2"]) ? $valido : false;
  }

  if (isset($input["ciudad"])) {
    //Maximo 5 palabra con la primera en mayuscula y puede tener espacios
    $valido = preg_match("/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]?){1,5}$/", $input["ciudad"]) ? $valido : false;
  }

  if (isset($input["codigo_postal"])) {
    //puede empezar por +34 ó -, seguid de 9 numeros que pueden estar separados por -
    $valido = preg_match("/^d{5}(?:[-s]d{4})?$/", $input["codigo_postal"]) ? $valido : false;
  }

  if (isset($input["pais"])) {
    //puede empezar por +34 ó -, seguid de 9 numeros que pueden estar separados por -
    $valido = preg_match("/(\+34|0034|34)?[ -]*([0-9][ -]*){9}/", $input["pais"]) ? $valido : false;
  }

  return $valido;
}

/*
  listar todos los posts o solo uno
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET'){
    if (isset($_GET['id'])){
      //Mostrar un post
      $sql = $dbConn->prepare("SELECT * FROM direccion where user_id=:user_id");
      $sql->bindValue(':user_id', $_GET['user_id']);
      $sql->execute();
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetch(PDO::FETCH_ASSOC));
      exit();
	  }
    else {
      //Mostrar lista de post
      $sql = $dbConn->prepare("SELECT * FROM usuario LIMIT 10");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode($sql->fetchAll());
      exit();
	}
}
// Crear un nuevo post
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $input = $_POST;
    $sql = "INSERT INTO usuario
          (id, username, password, nombre, apellidos, telefono)
          VALUES
          (:id, :username, :password, :nombre, :apellidos, :telefono)";
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
if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
	$id = $_GET['id'];
  $statement = $dbConn->prepare("DELETE FROM usuario where id=:id");
  $statement->bindValue(':id', $id);
  $statement->execute();
	header("HTTP/1.1 200 OK");
	exit();
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT')
{
    $input = $_GET;
    $postId = $input['id'];
    $fields = getParams($input);
    $sql = "
          UPDATE usuario
          SET $fields
          WHERE id='$postId'
           ";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    header("HTTP/1.1 200 OK");
    exit();
}

//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");
?>
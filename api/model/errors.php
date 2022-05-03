<?php 
    function error_400($error = ""){
        header("HTTP/1.1 400 Bad Request: " . $error);
    }

    function ok_200(){
        header("HTTP/1.1 200 OK");
    }

    function error_500($error = ""){
        header("HTTP/1.1 500 Internal error" . $error);
    }


?>
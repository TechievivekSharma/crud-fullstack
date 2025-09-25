<?php
$server="localhost:3307";
$username="root";
$password="";
$db="crud_demo";

// $conn = mysqli_connect($server,$username,$password,$db);

// if(!$conn){
//     die("db connection failed".mysqli_connect_error());
// }

$conn = new mysqli($server, $username, $password, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => $conn->connect_error]));
}else{
    echo" all good";
}







?>
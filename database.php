<?php
$servername = 'faure';
$username = 'etaketa';
$password = '835332947';
$db = 'etaketa';

$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
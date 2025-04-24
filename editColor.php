<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');

require 'database.php';

$json = json_decode(file_get_contents('php://input'));

$currentColor = $json->currentColor ?? null;
$newColor = $json->newColor ?? null;
$newHex = $json->newHex ?? null;

if ($currentColor && ($newColor || $newHex)) {
    $updates = [];
    if ($newColor) {
        $updates[] = "name = '$newColor'";
    }
    if ($newHex) {
        $updates[] = "hex_values = '$newHex'";
    }
    $updateString = implode(", ", $updates);
    
    $statement = "UPDATE colors SET $updateString WHERE name = '$currentColor'";
    $result = $conn->query($statement);

    if ($result && $conn->affected_rows > 0) {
        http_response_code(200); 
    } else {
        http_response_code(404); 
    }
} else {
    http_response_code(400);
}
?>

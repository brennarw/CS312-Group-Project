<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit();
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'database.php';

$json = json_decode(file_get_contents('php://input'));

$currentColor = $json->currentColor ?? null;
$newColor = $json->newColor ?? null;
$newHex = $json->newHex ?? null;

if ($currentColor && ($newColor || $newHex)) {
    $updates = [];
    $params = [];
    $types = "";

    if ($newColor) {
        $updates[] = "name = ?";
        $params[] = $newColor;
        $types .= "s";
    }
    if ($newHex) {
        $updates[] = "hex_values = ?";
        $params[] = $newHex;
        $types .= "s";
    }

    $params[] = $currentColor;
    $types .= "s";

    $sql = "UPDATE colors SET " . implode(", ", $updates) . " WHERE name = ?";

    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        http_response_code(500);
        echo json_encode(["error" => "Prepare failed: " . $conn->error]);
        exit();
    }

    $stmt->bind_param($types, ...$params);
    $success = $stmt->execute();

    if ($success && $stmt->affected_rows > 0) {
        http_response_code(200);
        echo json_encode(["success" => "Color updated"]);
    } else {
        http_response_code(409);
        echo json_encode(["error" => "Update failed or no changes made"]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["error" => "Missing data"]);
}
?>





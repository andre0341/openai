<?php
require 'db_config.php';
// Connessione al database

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    die("Connessione fallita: " . $conn->connect_error);
}

// Riceve i dati JSON
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo "Formato dati non valido";
    exit;
}

$stmt = $conn->prepare("INSERT INTO offerte (paese, regione, struttura, stelle, localita, durata, data_partenza, trasporto, prezzo, timestamp_acquisizione) VALUES (?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%e %M'), ?, ?, NOW())");

foreach ($data as $offerta) {
    $stmt->bind_param(
        "sssissssd",
        $offerta['paese'],
        $offerta['regione'],
        $offerta['struttura'],
        $offerta['stelle'],
        $offerta['localita'],
        $offerta['durata'],
        $offerta['data_partenza'],
        $offerta['trasporto'],
        $offerta['prezzo']
    );
    $stmt->execute();
}

$stmt->close();
$conn->close();
echo "Dati inseriti correttamente.";
?>

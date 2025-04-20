<?php
require_once 'config.php';

try {
    // Test database connection
    $conn = getDBConnection();
    echo "Connexion à la base de données réussie!<br>";
    
    // Test if table exists
    $stmt = $conn->query("SHOW TABLES LIKE 'messages'");
    if($stmt->rowCount() > 0) {
        echo "La table 'messages' existe!<br>";
    } else {
        echo "La table 'messages' n'existe pas!<br>";
    }
    
    // Test table structure
    $stmt = $conn->query("DESCRIBE messages");
    echo "Structure de la table 'messages':<br>";
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "- " . $row['Field'] . " (" . $row['Type'] . ")<br>";
    }
    
} catch(PDOException $e) {
    echo "Erreur: " . $e->getMessage();
}
?> 
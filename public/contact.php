<?php
require_once 'config.php';

// Désactiver l'affichage des erreurs dans la sortie
ini_set('display_errors', 0);
error_reporting(0);

// Log file
$logFile = __DIR__ . '/contact_log.txt';

// Log function
function writeLog($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
}

// Function to get detailed error information
function getErrorDetails() {
    $details = [];
    $details['php_version'] = PHP_VERSION;
    $details['server_software'] = $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown';
    $details['request_method'] = $_SERVER['REQUEST_METHOD'] ?? 'Unknown';
    $details['content_type'] = $_SERVER['CONTENT_TYPE'] ?? 'Unknown';
    $details['content_length'] = $_SERVER['CONTENT_LENGTH'] ?? 'Unknown';
    $details['remote_addr'] = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
    $details['request_uri'] = $_SERVER['REQUEST_URI'] ?? 'Unknown';
    $details['script_filename'] = $_SERVER['SCRIPT_FILENAME'] ?? 'Unknown';
    $details['document_root'] = $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown';
    return $details;
}

// Fonction pour envoyer une réponse JSON propre
function sendJsonResponse($success, $message, $data = null) {
    header('Content-Type: application/json');
    $response = ['success' => $success, 'message' => $message];
    if ($data !== null) {
        $response['data'] = $data;
    }
    echo json_encode($response);
    exit;
}

try {
    writeLog("Script started");
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');

    // Initialize database and create table if they don't exist
    try {
        initializeDatabase();
        writeLog("Database initialized");
    } catch(Exception $e) {
        writeLog("Database initialization error: " . $e->getMessage());
        sendJsonResponse(false, 'Database initialization failed', [
            'error' => $e->getMessage(),
            'details' => getErrorDetails()
        ]);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        writeLog("POST request received");
        
        // Get the raw POST data
        $rawInput = file_get_contents('php://input');
        writeLog("Raw input: " . $rawInput);
        
        if (empty($rawInput)) {
            writeLog("Empty raw input");
            sendJsonResponse(false, 'No data received', ['details' => getErrorDetails()]);
        }
        
        $data = json_decode($rawInput, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            writeLog("JSON decode error: " . json_last_error_msg());
            sendJsonResponse(false, 'Invalid JSON data: ' . json_last_error_msg(), [
                'raw_input' => $rawInput,
                'details' => getErrorDetails()
            ]);
        }

        // Extract form data
        $name = $data['name'] ?? '';
        $email = $data['email'] ?? '';
        $subject = $data['subject'] ?? '';
        $message = $data['message'] ?? '';

        writeLog("Form data extracted: name=$name, email=$email, subject=$subject");

        // Validate inputs
        if (empty($name) || empty($email) || empty($subject) || empty($message)) {
            writeLog("Validation failed: empty fields");
            sendJsonResponse(false, 'All fields are required', [
                'data' => $data,
                'details' => getErrorDetails()
            ]);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            writeLog("Validation failed: invalid email format");
            sendJsonResponse(false, 'Invalid email format', [
                'email' => $email,
                'details' => getErrorDetails()
            ]);
        }

        try {
            // Get database connection
            $conn = getDBConnection();
            writeLog("Database connection established");

            // Prepare SQL statement
            $stmt = $conn->prepare("INSERT INTO messages (name, email, subject, message) VALUES (:name, :email, :subject, :message)");
            
            // Bind parameters
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':subject', $subject);
            $stmt->bindParam(':message', $message);

            // Execute the statement
            $stmt->execute();
            writeLog("Message inserted into database");

            // Send email notification (commented out to avoid warnings)
            /*
            $to = "your-email@example.com"; // Replace with your email address
            $email_subject = "New Contact Form Submission from $name";
            $headers = "From: $email\r\n";
            $headers .= "Reply-To: $email\r\n";
            $headers .= "X-Mailer: PHP/" . phpversion();

            $email_body = "Name: $name\n";
            $email_body .= "Email: $email\n";
            $email_body .= "Subject: $subject\n\n";
            $email_body .= "Message:\n$message";

            // Send email
            mail($to, $email_subject, $email_body, $headers);
            */

            sendJsonResponse(true, 'Message sent successfully');
        } catch(PDOException $e) {
            writeLog("Database error: " . $e->getMessage());
            sendJsonResponse(false, 'Database error: ' . $e->getMessage(), [
                'details' => getErrorDetails()
            ]);
        }
    } else {
        writeLog("Invalid request method: " . $_SERVER['REQUEST_METHOD']);
        sendJsonResponse(false, 'Invalid request method: ' . $_SERVER['REQUEST_METHOD'], [
            'details' => getErrorDetails()
        ]);
    }
} catch (Exception $e) {
    writeLog("Unexpected error: " . $e->getMessage());
    sendJsonResponse(false, 'Unexpected error: ' . $e->getMessage(), [
        'details' => getErrorDetails()
    ]);
}
?> 
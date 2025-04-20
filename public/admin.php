<?php
session_start();

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

// Connexion à la base de données
$host = 'localhost';
$dbname = 'portfolio';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Récupérer les paramètres de tri et de filtrage
    $sort = isset($_GET['sort']) ? $_GET['sort'] : 'created_at';
    $order = isset($_GET['order']) ? $_GET['order'] : 'DESC';
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $perPage = 10;
    $offset = ($page - 1) * $perPage;

    // Construire la requête SQL avec filtres
    $sql = "SELECT * FROM messages WHERE 1=1";
    $params = [];

    // Filtre par date
    if (isset($_GET['start_date']) && isset($_GET['end_date'])) {
        $sql .= " AND created_at BETWEEN ? AND ?";
        $params[] = $_GET['start_date'];
        $params[] = $_GET['end_date'];
    }

    // Filtre par tags
    if (isset($_GET['tags']) && !empty($_GET['tags'])) {
        $tags = explode(',', $_GET['tags']);
        $placeholders = str_repeat('?,', count($tags) - 1) . '?';
        $sql .= " AND id IN (SELECT message_id FROM message_tags WHERE tag_id IN ($placeholders))";
        $params = array_merge($params, $tags);
    }

    // Ajouter le tri
    $sql .= " ORDER BY $sort $order";

    // Ajouter la pagination
    $sql .= " LIMIT " . (int)$perPage . " OFFSET " . (int)$offset;

    // Exécuter la requête
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Récupérer le nombre total de messages pour la pagination
    $countSql = "SELECT COUNT(*) FROM messages WHERE 1=1";
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($params);
    $totalMessages = $countStmt->fetchColumn();
    $totalPages = ceil($totalMessages / $perPage);

    // Récupérer les statistiques
    $stats = [
        'today' => $pdo->query("SELECT COUNT(*) FROM messages WHERE DATE(created_at) = CURDATE()")->fetchColumn(),
        'response_rate' => 0, // À implémenter plus tard
        'avg_response_time' => 0 // À implémenter plus tard
    ];

    // Récupérer les tags disponibles
    $tags = $pdo->query("SELECT * FROM tags ORDER BY name")->fetchAll(PDO::FETCH_ASSOC);

    // Récupérer l'historique des actions
    $history = $pdo->query("SELECT * FROM action_history ORDER BY created_at DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC);

} catch(PDOException $e) {
    die("Erreur de connexion: " . $e->getMessage());
}

// Traitement des actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'archive':
                $stmt = $pdo->prepare("UPDATE messages SET is_archived = 1 WHERE id = ?");
                $stmt->execute([$_POST['message_id']]);
                // Enregistrer dans l'historique
                $pdo->prepare("INSERT INTO action_history (action, message_id, user_id) VALUES (?, ?, ?)")
                    ->execute(['archive', $_POST['message_id'], $_SESSION['user_id']]);
                break;
            
            case 'delete':
                $stmt = $pdo->prepare("UPDATE messages SET is_deleted = 1 WHERE id = ?");
                $stmt->execute([$_POST['message_id']]);
                // Enregistrer dans l'historique
                $pdo->prepare("INSERT INTO action_history (action, message_id, user_id) VALUES (?, ?, ?)")
                    ->execute(['delete', $_POST['message_id'], $_SESSION['user_id']]);
                break;
            
            case 'add_tag':
                $stmt = $pdo->prepare("INSERT INTO message_tags (message_id, tag_id) VALUES (?, ?)");
                $stmt->execute([$_POST['message_id'], $_POST['tag_id']]);
                break;
            
            case 'export':
                header('Content-Type: text/csv');
                header('Content-Disposition: attachment; filename="messages.csv"');
                $output = fopen('php://output', 'w');
                fputcsv($output, ['Date', 'Nom', 'Email', 'Sujet', 'Message']);
                foreach ($messages as $message) {
                    fputcsv($output, [
                        $message['created_at'],
                        $message['name'],
                        $message['email'],
                        $message['subject'],
                        $message['message']
                    ]);
                }
                fclose($output);
                exit;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administration - Portfolio</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        :root {
            --primary: 217 91% 60%;
            --primary-foreground: 210 40% 98%;
        }
        .bg-primary {
            background-color: hsl(var(--primary));
        }
        .text-primary {
            color: hsl(var(--primary));
        }
        .border-primary {
            border-color: hsl(var(--primary));
        }
        .hover\:bg-primary:hover {
            background-color: hsl(var(--primary));
        }
        .focus\:ring-primary:focus {
            --tw-ring-color: hsl(var(--primary));
        }
        .message-row:hover {
            background-color: hsl(var(--primary) / 0.05);
            transform: translateX(4px);
        }
        .card-hover {
            transition: all 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .badge {
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
        }
        .badge-primary {
            background-color: hsl(var(--primary) / 0.1);
            color: hsl(var(--primary));
        }
        .badge-success {
            background-color: hsl(142 76% 36% / 0.1);
            color: hsl(142 76% 36%);
        }
        .badge-warning {
            background-color: hsl(45 93% 47% / 0.1);
            color: hsl(45 93% 47%);
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-in;
        }
        .animate-slide-up {
            animation: slideUp 0.5s ease-out;
        }
        .animate-slide-down {
            animation: slideDown 0.5s ease-out;
        }
        .animate-bounce-in {
            animation: bounceIn 0.5s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); opacity: 0.8; }
            70% { transform: scale(0.9); opacity: 0.9; }
            100% { transform: scale(1); opacity: 1; }
        }
        .stats-card {
            background: linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--primary) / 0.05) 100%);
        }
        .message-card {
            transition: all 0.3s ease;
        }
        .message-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .nav-link {
            position: relative;
        }
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: hsl(var(--primary));
            transition: width 0.3s ease;
        }
        .nav-link:hover::after {
            width: 100%;
        }
        .table-row {
            transition: all 0.3s ease;
        }
        .table-row:hover {
            background-color: hsl(var(--primary) / 0.05);
        }
        .action-button {
            transition: all 0.3s ease;
        }
        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .search-input {
            transition: all 0.3s ease;
        }
        .search-input:focus {
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .filter-button {
            transition: all 0.3s ease;
        }
        .filter-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .message-actions {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .message-row:hover .message-actions {
            opacity: 1;
        }
        .dropdown-menu {
            transform-origin: top right;
            transform: scale(0);
            opacity: 0;
            transition: all 0.2s ease;
        }
        .dropdown-menu.show {
            transform: scale(1);
            opacity: 1;
        }
        .stats-chart {
            height: 200px;
            position: relative;
        }
        .chart-bar {
            position: absolute;
            bottom: 0;
            width: 30px;
            background: linear-gradient(to top, hsl(var(--primary)), hsl(var(--primary) / 0.7));
            border-radius: 4px 4px 0 0;
            transition: height 0.3s ease;
        }
        .bulk-actions {
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        .bulk-actions.show {
            transform: translateY(0);
            opacity: 1;
        }
        .message-preview {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        .message-preview.show {
            max-height: 200px;
        }
        .sort-header {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .sort-header:hover {
            background-color: hsl(var(--primary) / 0.05);
        }
        .sort-header.active {
            background-color: hsl(var(--primary) / 0.1);
        }
        .filter-tag {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.5rem;
            background-color: hsl(var(--primary) / 0.1);
            border-radius: 9999px;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
        }
        .filter-tag button {
            margin-left: 0.25rem;
            color: hsl(var(--primary));
        }
        .notification-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: hsl(var(--primary));
            color: white;
            border-radius: 9999px;
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
        }
        .pagination-item {
            padding: 0.5rem 1rem;
            margin: 0 0.25rem;
            border-radius: 0.375rem;
            transition: all 0.3s ease;
        }
        .pagination-item:hover {
            background-color: hsl(var(--primary) / 0.1);
        }
        .pagination-item.active {
            background-color: hsl(var(--primary));
            color: white;
        }
        .export-button {
            position: relative;
            overflow: hidden;
        }
        .export-button::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
            transform: translateX(-100%);
            animation: shine 2s infinite;
        }
        @keyframes shine {
            100% { transform: translateX(100%); }
        }
        .stats-card {
            position: relative;
            overflow: hidden;
        }
        .stats-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, hsl(var(--primary) / 0.1), transparent);
        }
        .search-advanced {
            position: absolute;
            top: 100%;
            right: 0;
            width: 300px;
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            transform: translateY(10px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .search-advanced.show {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        .tag {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.5rem;
            background-color: hsl(var(--primary) / 0.1);
            border-radius: 9999px;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            transition: all 0.3s ease;
        }
        .tag:hover {
            background-color: hsl(var(--primary) / 0.2);
        }
        .history-item {
            position: relative;
            padding-left: 1rem;
        }
        .history-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background-color: hsl(var(--primary) / 0.2);
        }
        .auto-save {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            background-color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .auto-save.show {
            opacity: 1;
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <nav class="bg-white shadow-lg animate-slide-down">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <div class="flex items-center space-x-2">
                        <div class="relative">
                            <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span class="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-bounce-in"></span>
                        </div>
                        <span class="text-xl font-bold text-primary">Administration</span>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <button class="p-2 text-gray-600 hover:text-primary transition-colors duration-300 action-button">
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span class="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-bounce-in">3</span>
                        </button>
                    </div>
                    <a href="logout.php" class="flex items-center text-gray-600 hover:text-primary transition-colors duration-300 nav-link">
                        <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Déconnexion
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
            <div class="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                <div class="flex items-center justify-between mb-6">
                    <h1 class="text-2xl font-bold text-primary">Bienvenue dans l'espace d'administration</h1>
                    <div class="flex items-center space-x-2">
                        <span class="badge badge-primary"><?php echo count($messages); ?> messages</span>
                        <span class="badge badge-success">En ligne</span>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <!-- Section Statistiques -->
                    <div class="bg-gray-50 rounded-lg p-6 border border-gray-100 card-hover">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center">
                                <svg class="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <h2 class="text-lg font-semibold text-gray-900">Statistiques</h2>
                            </div>
                            <span class="badge badge-warning">Mise à jour</span>
                        </div>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                                <div class="flex items-center">
                                    <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span class="text-gray-600">Messages reçus</span>
                                </div>
                                <span class="font-medium text-primary"><?php echo count($messages); ?></span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                                <div class="flex items-center">
                                    <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span class="text-gray-600">Messages aujourd'hui</span>
                                </div>
                                <span class="font-medium text-primary">
                                    <?php 
                                    $today = date('Y-m-d');
                                    $todayMessages = array_filter($messages, function($msg) use ($today) {
                                        return date('Y-m-d', strtotime($msg['created_at'])) === $today;
                                    });
                                    echo count($todayMessages);
                                    ?>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Section Actions rapides -->
                    <div class="bg-gray-50 rounded-lg p-6 border border-gray-100 card-hover">
                        <div class="flex items-center mb-4">
                            <svg class="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <h2 class="text-lg font-semibold text-gray-900">Actions rapides</h2>
                        </div>
                        <div class="space-y-3">
                            <button class="w-full flex items-center justify-center bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors duration-300 shadow-sm hover:shadow-md">
                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Modifier le contenu
                            </button>
                            <button class="w-full flex items-center justify-center bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300 shadow-sm hover:shadow-md">
                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Gérer les projets
                            </button>
                        </div>
                    </div>

                    <!-- Section Dernières activités -->
                    <div class="bg-gray-50 rounded-lg p-6 border border-gray-100 card-hover">
                        <div class="flex items-center mb-4">
                            <svg class="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 class="text-lg font-semibold text-gray-900">Dernières activités</h2>
                        </div>
                        <div class="space-y-4">
                            <?php if (count($messages) > 0): ?>
                                <div class="flex items-center p-3 bg-white rounded-lg shadow-sm">
                                    <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p class="text-gray-600">Dernier message reçu</p>
                                        <p class="text-sm text-gray-500"><?php echo date('d/m/Y H:i', strtotime($messages[0]['created_at'])); ?></p>
                                    </div>
                                </div>
                            <?php else: ?>
                                <div class="flex items-center p-3 bg-white rounded-lg shadow-sm">
                                    <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p class="text-gray-600">Aucune activité récente</p>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>

                <!-- Historique des actions -->
                <div class="bg-white rounded-lg p-6 mb-6">
                    <h3 class="text-lg font-semibold mb-4">Historique des actions</h3>
                    <div class="space-y-4">
                        <?php foreach ($history as $item): ?>
                            <div class="history-item">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm text-gray-600"><?php echo htmlspecialchars($item['action']); ?></p>
                                        <p class="text-xs text-gray-500"><?php echo date('d/m/Y H:i', strtotime($item['created_at'])); ?></p>
                                    </div>
                                    <span class="badge badge-primary">Message #<?php echo $item['message_id']; ?></span>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Section Messages -->
                <div class="mt-8">
                    <div class="flex flex-col space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <svg class="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <h2 class="text-xl font-bold text-primary">Messages reçus</h2>
                            </div>
                            <div class="flex items-center space-x-4">
                                <!-- Bouton d'export -->
                                <button class="export-button flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Exporter
                                </button>

                                <!-- Recherche avancée -->
                                <div class="relative">
                                    <button class="search-advanced-toggle flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                                        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Recherche avancée
                                    </button>
                                    <div class="search-advanced">
                                        <div class="space-y-4">
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                                                <input type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                                                <input type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">Mots-clés</label>
                                                <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Séparés par des virgules">
                                            </div>
                                            <button class="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90">
                                                Rechercher
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Notifications -->
                                <div class="relative">
                                    <button class="notification-button p-2 text-gray-600 hover:text-primary">
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        <span class="notification-badge">3</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Tags disponibles -->
                        <div class="flex flex-wrap">
                            <?php foreach ($tags as $tag): ?>
                                <button class="tag" data-tag-id="<?php echo $tag['id']; ?>">
                                    <?php echo htmlspecialchars($tag['name']); ?>
                                    <span class="ml-2 text-primary">×</span>
                                </button>
                            <?php endforeach; ?>
                        </div>

                        <!-- Table des messages -->
                        <div class="overflow-x-auto rounded-lg border border-gray-200">
                            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div class="flex items-center">
                                                <input type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
                                            </div>
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sort-header">
                                            <div class="flex items-center">
                                                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Date
                                            </div>
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sort-header">
                                            <div class="flex items-center">
                                                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                Nom
                                            </div>
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sort-header">
                                            <div class="flex items-center">
                                                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                Email
                                            </div>
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sort-header">
                                            <div class="flex items-center">
                                                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                </svg>
                                                Sujet
                                            </div>
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div class="flex items-center">
                                                <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                </svg>
                                                Message
                                            </div>
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tags
                                        </th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <?php foreach ($messages as $message): ?>
                                    <tr class="message-row transition-all duration-200">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <input type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
                                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <?php echo date('d/m/Y H:i', strtotime($message['created_at'])); ?>
                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <?php echo htmlspecialchars($message['name']); ?>
                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <?php echo htmlspecialchars($message['email']); ?>
                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <?php echo htmlspecialchars($message['subject']); ?>
                        </td>
                                        <td class="px-6 py-4 text-sm text-gray-900">
                                            <div class="message-preview">
                            <?php echo nl2br(htmlspecialchars($message['message'])); ?>
                                            </div>
                                            <button class="text-primary text-sm hover:text-primary/80 mt-2">
                                                Voir plus
                                            </button>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex flex-wrap">
                                                <?php 
                                                $messageTags = $pdo->query("SELECT t.* FROM tags t JOIN message_tags mt ON t.id = mt.tag_id WHERE mt.message_id = " . $message['id'])->fetchAll(PDO::FETCH_ASSOC);
                                                foreach ($messageTags as $tag): 
                                                ?>
                                                    <span class="tag"><?php echo htmlspecialchars($tag['name']); ?></span>
                                                <?php endforeach; ?>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div class="message-actions flex space-x-2">
                                                <button class="text-primary hover:text-primary/80" title="Marquer comme lu">
                                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button class="text-primary hover:text-primary/80" title="Archiver">
                                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                    </svg>
                                                </button>
                                                <button class="text-red-500 hover:text-red-600" title="Supprimer">
                                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

                        <!-- Pagination -->
                        <div class="pagination">
                            <?php if ($page > 1): ?>
                                <a href="?page=<?php echo $page-1; ?>&sort=<?php echo $sort; ?>&order=<?php echo $order; ?>" class="pagination-item">
                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </a>
                            <?php endif; ?>

                            <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                                <a href="?page=<?php echo $i; ?>&sort=<?php echo $sort; ?>&order=<?php echo $order; ?>" 
                                   class="pagination-item <?php echo $i === $page ? 'active' : ''; ?>">
                                    <?php echo $i; ?>
                                </a>
                            <?php endfor; ?>

                            <?php if ($page < $totalPages): ?>
                                <a href="?page=<?php echo $page+1; ?>&sort=<?php echo $sort; ?>&order=<?php echo $order; ?>" class="pagination-item">
                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Auto-save indicator -->
    <div class="auto-save">
        <span class="text-sm text-gray-600">Sauvegarde automatique...</span>
    </div>

    <script>
        // Auto-save functionality
        let autoSaveTimeout;
        function showAutoSave() {
            const indicator = document.querySelector('.auto-save');
            indicator.classList.add('show');
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                indicator.classList.remove('show');
            }, 2000);
        }

        // Tag management
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const messageId = tag.closest('tr').dataset.messageId;
                const tagId = tag.dataset.tagId;
                fetch('admin.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `action=add_tag&message_id=${messageId}&tag_id=${tagId}`
                }).then(() => showAutoSave());
            });
        });

        // Sort functionality
        document.querySelectorAll('.sort-header').forEach(header => {
            header.addEventListener('click', () => {
                const sort = header.dataset.sort;
                const currentOrder = new URLSearchParams(window.location.search).get('order');
                const newOrder = currentOrder === 'ASC' ? 'DESC' : 'ASC';
                window.location.href = `?sort=${sort}&order=${newOrder}`;
            });
        });
    </script>
</body>
</html> 
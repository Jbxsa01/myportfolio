<?php
// Script pour extraire le contenu du CV PDF et le sauvegarder en JSON
// Nécessite l'installation de la bibliothèque pdfparser via Composer

// Vérifier si le fichier PDF existe
$pdfFile = __DIR__ . '/CV-bjane-Asmaa.pdf';
if (!file_exists($pdfFile)) {
    die("Le fichier PDF n'existe pas: $pdfFile");
}

// Fonction pour extraire le texte du PDF
function extractTextFromPDF($pdfFile) {
    // Utiliser la commande pdftotext si disponible (plus fiable)
    if (function_exists('shell_exec') && shell_exec('which pdftotext')) {
        $output = shell_exec("pdftotext \"$pdfFile\" -");
        if ($output) {
            return $output;
        }
    }
    
    // Sinon, utiliser une approche basique
    // Cette approche est très basique et ne fonctionnera pas bien pour tous les PDFs
    $content = file_get_contents($pdfFile);
    
    // Extraire le texte entre les balises de texte
    preg_match_all('/\(\((.*?)\)\)/', $content, $matches);
    
    if (!empty($matches[1])) {
        return implode("\n", $matches[1]);
    }
    
    return "Impossible d'extraire le texte du PDF.";
}

// Fonction pour analyser le contenu et extraire les sections
function analyzeContent($content) {
    $sections = [
        'experience' => '',
        'skills' => '',
        'education' => '',
        'contact' => '',
        'projects' => ''
    ];
    
    // Diviser le contenu en lignes
    $lines = explode("\n", $content);
    
    $currentSection = '';
    $currentContent = '';
    
    // Mots-clés pour identifier les sections
    $sectionKeywords = [
        'experience' => ['expérience', 'travail', 'emploi', 'poste', 'entreprise', 'carrière', 'professionnel'],
        'skills' => ['compétence', 'skill', 'technologie', 'langage', 'framework', 'outil', 'maîtrise', 'connaissance'],
        'education' => ['formation', 'école', 'diplôme', 'étude', 'université', 'bac', 'master', 'licence'],
        'contact' => ['contact', 'email', 'téléphone', 'linkedin', 'github', 'adresse', 'localisation'],
        'projects' => ['projet', 'réalisation', 'travail', 'application', 'site web', 'développement']
    ];
    
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line)) continue;
        
        // Vérifier si la ligne est un titre de section
        $isSectionTitle = false;
        foreach ($sectionKeywords as $section => $keywords) {
            foreach ($keywords as $keyword) {
                if (stripos($line, $keyword) !== false) {
                    // Si nous avons déjà du contenu pour une section précédente, le sauvegarder
                    if ($currentSection && $currentContent) {
                        $sections[$currentSection] = trim($currentContent);
                        $currentContent = '';
                    }
                    
                    $currentSection = $section;
                    $isSectionTitle = true;
                    break 2;
                }
            }
        }
        
        // Si ce n'est pas un titre, ajouter à la section courante
        if (!$isSectionTitle && $currentSection) {
            $currentContent .= $line . "\n";
        }
    }
    
    // Sauvegarder la dernière section
    if ($currentSection && $currentContent) {
        $sections[$currentSection] = trim($currentContent);
    }
    
    return $sections;
}

// Extraire le texte du PDF
$content = extractTextFromPDF($pdfFile);

// Analyser le contenu pour extraire les sections
$sections = analyzeContent($content);

// Créer le résultat
$result = [
    'content' => $content,
    'sections' => $sections
];

// Sauvegarder en JSON
$jsonFile = __DIR__ . '/cv-content.json';
file_put_contents($jsonFile, json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "Contenu du CV extrait et sauvegardé dans $jsonFile\n";
echo "Sections identifiées: " . implode(", ", array_keys(array_filter($sections))) . "\n";
?> 
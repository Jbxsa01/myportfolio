<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Portfolio</title>
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
        .text-justify {
            text-align: justify;
        }
        .cv-download {
            transition: all 0.3s ease;
        }
        .cv-download:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <span class="text-xl font-bold text-primary">Mon Portfolio</span>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="#about" class="text-gray-700 hover:text-primary">À propos</a>
                    <a href="#projects" class="text-gray-700 hover:text-primary">Projets</a>
                    <a href="#contact" class="text-gray-700 hover:text-primary">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="bg-white">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                    <span class="block">Bienvenue sur mon</span>
                    <span class="block text-primary">Portfolio</span>
                </h1>
                <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl text-justify">
                    Je suis un développeur passionné spécialisé dans la création d'applications web modernes et performantes. 
                    Mon expertise couvre un large éventail de technologies et de frameworks.
                </p>
                <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                    <div class="rounded-md shadow">
                        <a href="#contact" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10">
                            Me contacter
                        </a>
                    </div>
                    <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                        <a href="cv.pdf" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 cv-download">
                            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Télécharger mon CV
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- About Section -->
    <div id="about" class="bg-gray-50 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-900">À propos de moi</h2>
                <p class="mt-4 text-lg text-gray-500 text-justify max-w-3xl mx-auto">
                    Passionné par le développement web depuis plusieurs années, j'ai acquis une solide expérience dans la création d'applications modernes et performantes. 
                    Mon approche se concentre sur la qualité du code, l'expérience utilisateur et les bonnes pratiques de développement.
                </p>
            </div>
        </div>
    </div>

    <!-- Projects Section -->
    <div id="projects" class="bg-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-900">Mes Projets</h2>
                <p class="mt-4 text-lg text-gray-500 text-justify max-w-3xl mx-auto">
                    Découvrez une sélection de mes projets les plus récents, mettant en avant mes compétences en développement web et ma capacité à créer des solutions innovantes.
                </p>
            </div>
        </div>
    </div>

    <!-- Contact Section -->
    <div id="contact" class="bg-gray-50 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-900">Contactez-moi</h2>
                <p class="mt-4 text-lg text-gray-500 text-justify max-w-3xl mx-auto">
                    Vous avez un projet en tête ou souhaitez en savoir plus sur mes services ? N'hésitez pas à me contacter. 
                    Je serai ravi d'échanger avec vous et de répondre à toutes vos questions.
                </p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <p class="text-base text-gray-500 text-justify">
                    © 2024 Mon Portfolio. Tous droits réservés. Ce site a été créé avec passion et dévouement.
                </p>
            </div>
        </div>
    </footer>
</body>
</html> 
Proposition de structure (objectif : lisibilité et maintenabilité)

Root
- `package.json`, `vite.config.ts`, `tsconfig.json`, `README.md`, `LICENSE`

public/
- Contient les assets servis statiquement (images, PDFs, PHP pour backend simple).
- Sous-dossiers recommandés :
  - `public/assets/images/`
  - `public/assets/cv/`
  - `public/certifications/`

src/
- `src/components/` : composants React (sous-dossiers : `ui/`, `projects/`, `layout/`)
- `src/services/` : services (email, analytics, api wrappers)
- `src/hooks/` : hooks réutilisables
- `src/lib/` : utilitaires

Comment appliquer la réorganisation (manuel conseillé)
1. Créez les dossiers cibles.
2. Déplacez les fichiers binaires avec `git mv` (préserve l'historique).
3. Mettez à jour les imports dans `src/`.
4. Lancez `npm run build` puis `npm run lint`.

Exemples de commandes

```bash
# Créer dossiers
mkdir -p public/assets/images public/assets/cv src/components/projects

# Déplacer fichiers médias (exemple)
git mv "BJANE_ASMAA_Monogram_Option_4-removebg-preview.png" public/assets/images/
git mv "Bjane Asmaa.pdf" public/assets/cv/

# Rechercher imports à mettre à jour
# (exemple unix)
grep -R "BJANE_ASMAA_Monogram_Option_4-removebg-preview" -n src || true

# Après mise à jour des imports
npm run lint:fix
```

Remarque
- Certaines routes PHP/JSON dans `public/` peuvent nécessiter des chemins relatifs spécifiques. Testez localement après chaque changement majeur.

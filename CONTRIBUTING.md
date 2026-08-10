Merci d'améliorer ce dépôt — voici les règles et le flux de contribution.

Processus de base
- Créez une branche depuis `main` : `git switch -c feat/ma-feature`
- Faites des commits atomiques et lisibles (présent, impératif) : `feat: ajouter formulaire de contact`
- Ouvrez une Pull Request expliquant la motivation et les changements.

Structure et réorganisation
- Ce dépôt contient du front (Vite + React + TypeScript) et des ressources PHP dans `public/`.
- Pour déplacer des assets volumineux (PDF, PNG, JPG) :

```bash
# Exemple : regrouper les CV et lettres de motivation
mkdir -p public/assets/cv
git mv "CV bjane Asmaa software engineer.pdf" public/assets/cv/
git mv "bjane asmaa cover letter.pdf" public/assets/cv/
```

- Après un `git mv`, cherchez et mettez à jour les imports dans `src/` (remplacez les anciennes routes par `/assets/cv/<nom>`).

Qualité de code
- Lancez `npm run lint` avant de demander une relecture.
- Formatez avec `npm run format`.

Sécurité & secrets
- Ne commitez jamais de clés privées ni de `.env`.

Style d’écriture
- Texte et messages de commit : langage naturel, voix active, ton professionnel et humain.
- Évitez les mentions « généré par » ou signatures automatiques qui indiqueraient une génération automatique.

Merci — tenez-moi au courant si vous voulez que j’applique la réorganisation proposée automatiquement.

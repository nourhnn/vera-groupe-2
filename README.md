# vera-groupe-2
---

Structure expliquée :
├── vera-api/ → Backend Node.js (toute la logique serveur)
│   ├── server.js → Lance le serveur Express + routes
│   ├── index.js → Point d’entrée, configuration des routes
│   └── package.json → Dépendances backend
│
└── vera-frontend/ → Application Angular (interface utilisateur)
  ├── public/ → Fichiers statiques
  ├── src/
  │   ├── app/
  │   │   ├── pages/ → Toutes les pages principales de l'application
  │   │   │   ├── admin-login/ → Page de connexion admin
  │   │   │   │   └── admin-login.ts (formulaire + appel API login)
  │   │   │   ├── chat/ → Page principale où l’utilisateur pose une question
  │   │   │   │   └── chat.ts (envoi de la question + réponse + animation de chargement)
  │   │   │   ├── dashboard/ → Interface admin (historique + filtres)
  │   │   │       └── dashboard.ts (affiche toutes les vérifications)
  │   │   ├── services/
  │   │   │   └── vera-api.service.ts → Service qui communique avec le backend
  │   │   ├── app.routes.ts → Définition des routes (login, chat, dashboard)
  │   │   ├── app.config.ts → Configuration Angular
  │   │   └── app.ts → Composant racine
  │   ├── main.ts → Bootstrap Angular
  │   └── styles.css → Styles globaux + Tailwind
  ├── angular.json → Configuration Angular
  ├── tailwind.config.js → Configuration Tailwind
  ├── package.json → Dépendances frontend
  └── info.txt → Documentation du projet

Admin :
id : admin
password : vera123

Lancer le frontend (Angular) :
cd frontend
npm install
ng serve

Lancer le backend :
cd backend
npm install
npm run dev

URLs importantes du projet :

Frontend :
Page principale (poser une question) : [http://localhost:4200/chat](http://localhost:4200/chat)
Connexion admin : [http://localhost:4200/login](http://localhost:4200/login)
Dashboard admin : [http://localhost:4200/dashboard](http://localhost:4200/dashboard)

Backend API :
Vérifier le bon fonctionnement des questions (POST) : [http://localhost:3000/api/questions](http://localhost:3000/api/questions)

---


Comment utiliser GitHub sans casser le projet

(Procédure simple pour les invités et collaborateurs)

1️⃣ Cloner le projet (première utilisation)
git clone URL_DU_REPO
cd dossier-du-projet

2️⃣ Ne jamais travailler sur main

La branche main = version stable du projet.
Personne ne doit modifier directement main.

3️⃣ Créer une nouvelle branche pour chaque modification

Toujours créer une branche avant de coder :

git checkout -b nom-de-branche


Exemples :

fix-login

ajout-dashboard

style-chat

4️⃣ Faire ses changements puis enregistrer

Après avoir modifié des fichiers :

git add .
git commit -m "Message clair qui explique la modification"


Exemple :
git commit -m "Ajout du système de loading dans le chat"

5️⃣ Envoyer sa branche sur GitHub
git push origin nom-de-branche

6️⃣ Créer une Pull Request (PR)

Aller sur GitHub

Cliquer sur Compare & pull request

Vérifier ce qui a été modifié

Envoyer la PR

👉 Le propriétaire du projet vérifiera avant de merger dans main.

7️⃣ Mettre à jour sa branche si le projet avance

Avant de continuer un travail, synchroniser avec main :

Depuis ta branche :

git pull origin main

8️⃣ Ce qu’il ne faut jamais faire

❌ Ne jamais taper :

git push origin main

git merge main (si tu ne comprends pas ce que tu fais)

supprimer des fichiers importants

modifier le backend ou le frontend sans une branche séparée

9️⃣ Vérifier où tu te trouves
git branch
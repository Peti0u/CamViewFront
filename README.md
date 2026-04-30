# CamView

---

## 🚀 Présentation du Projet

CamView est une solution de vidéosurveillance moderne permettant de centraliser et de gérer plusieurs flux de caméras en temps réel. Le projet est divisé en une architecture Cloud (Backend/BDD) et une interface locale fluide (Frontend).

## 🏗️ Architecture & Hébergement

### Backend

Le serveur API est développé en **Node.js/Express**. Il est hébergé sur un VPS distant et géré par le gestionnaire de processus **PM2** pour garantir une disponibilité 24h/24.

- **URL API :** `https://api-camview.esiah.dev/`

### Base de données

Les données (utilisateurs, familles, caméras, archives) sont stockées dans une base de données **MySQL** hébergée à distance. Cela permet de synchroniser vos caméras et vos captures peu importe où vous vous connectez.

### Caméras locales

Le projet utilise un **Proxy Angular** pour communiquer avec les flux locaux (ex: caméras sur le réseau 172.17.x.x). Cela permet de garder les flux vidéo privés au sein de votre réseau local tout en profitant d'une interface de gestion Cloud.

---

## 🛠️ Installation et Lancement

Pour tester l'application en mode développement, il vous suffit de récupérer la partie Frontend.

1. **Cloner ou télécharger** le dossier du projet.
2. Ouvrir un terminal dans le dossier du frontend :

   ```bash
   cd frontend
   ```

3. **Installer les dépendances** :

   ```bash
   npm install
   ```

4. **Lancer l'application** :

   ```bash
   npm start
   ```

   _L'application sera disponible sur `http://localhost:4200`._

---

## 🔑 Comptes de Démo

Pour faciliter votre évaluation, des comptes de démonstration pré-configurés sont fournis :

| Rôle               | Email          | Mot de passe |
| ------------------ | -------------- | ------------ |
| **Administrateur** | admin@admin.fr | testtest     |
| **Opérateur**      | test@test.fr   | testtest     |

\_Note : Les flux vidéo ne seront visibles que si vous êtes connecté au même réseau local que les caméras configurées.

---

## Mise en place des cameras

- Brancher la Rasberry Pi et se connecter au réseau de Jean XXIII
- Se connecter à l'adresse suivante dans le navigateur

```lien
http://172.17.8.223:8765/
```

- Se rendre dans les paramètres en haut à gauche dans l'interface
- "Ajouter une camera"
- Dérouler le menu 'Caméra' et scroller jusqu'à trouver "Camera" puis cliquer sur ok
  (le faire pour les 2 caméras)
- Si vous êtes connecté dans une famille qui possède les 2 caméras vous les verrez dans l'interface Caméras, sinon ajoutez les ou utiliser les comptes fournis

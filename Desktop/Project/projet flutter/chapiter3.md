# Chapitre 3 : Réalisation

Ce chapitre est consacré à la phase "Build" du projet. Il décrit l'environnement technique mis en place, les choix de design qui ont guidé la création des interfaces, et présente les écrans principaux de l'application finale tels qu'ils seront utilisés par les employés et les managers.

## 3.1 Environnements de Travail

Pour garantir un cycle de développement fluide et professionnel, nous avons utilisé un ensemble d'outils matériels et logiciels standard de l'industrie.

### 3.1.1 Environnement Matériel
Le développement et les tests ont été réalisés sur une machine performante :
*   **Système d'exploitation** : Windows 11 Professionnel (64 bits).
*   **Processeur** : Intel Core i7 (ou équivalent AMD Ryzen).
*   **Mémoire (RAM)** : 16 Go pour supporter l'émulation mobile et les serveurs locaux.
*   **Dispositifs de test** : 
    *   Émulateur Android (Pixel 6 API 33).
    *   Smartphone physique (Samsung Galaxy pour tests réels GPS).

### 3.1.2 Environnement Logiciel

L'écosystème logiciel repose sur des outils open-source robustes :

*   **VS Code (Visual Studio Code)** : Notre IDE principal.
    *   *Extensions utilisées* : Flutter, Dart, Prettier, Thunder Client, GitLens.
    *   *Pourquoi* : Léger, extensible et excellent support pour JS et Dart.

*   **Flutter SDK (v3.x)** & **Dart SDK** :
    *   Le cœur de notre développement mobile. Permet la compilation native pour Android et iOS à partir d'une seule base de code.

*   **Node.js (v18 LTS)** :
    *   Runtime JavaScript pour le backend. Permet d'exécuter le serveur Express.js et de gérer les paquets via NPM.

*   **MongoDB Atlas & Compass** :
    *   *Atlas* : Version Cloud de la base de données pour l'hébergement de production.
    *   *Compass* : Interface graphique (GUI) pour visualiser et manipuler les données en local.

*   **Postman** :
    *   Utilisé pour tester exhaustivement chaque endpoint de l'API (Auth, Messages, Objectifs) avant de les intégrer dans l'application mobile.

*   **Git & GitHub** :
    *   Gestion de version pour suivre les modifications, créer des branches (feature/login, feature/chat) et sauvegarder le code dans le cloud.

## 3.2 Conception des interfaces et design graphique

L'interface utilisateur (UI) et l'expérience utilisateur (UX) ont été conçues selon le principe **"Mobile First"**, privilégiant la simplicité et l'accessibilité pour des employés en mobilité.

### 3.2.1 Charte Graphique
Nous avons opté pour une identité visuelle professionnelle et sobre, inspirée du "Material Design 3" de Google.

*   **Palette de couleurs** :
    *   **Couleur Primaire** : Rouge *Dräxlmaier* (simulé: `#D32F2F`) - Pour les boutons d'action (CTA) et les en-têtes.
    *   **Couleur Secondaire** : Gris Anthracite (`#37474F`) - Pour le texte et les éléments de navigation.
    *   **Arrière-plan** : Blanc cassé (`#F5F5F5`) pour réduire la fatigue visuelle, avec un support complet du **Mode Sombre** (Dark Mode) pour les environnements peu éclairés.

*   **Typographie** :
    *   Utilisation de la police **"Roboto"** ou **"Inter"** pour sa lisibilité optimale sur petits écrans.

### 3.2.2 Outil de Maquettage : Figma
Avant d'écrire la moindre ligne de code, les écrans ont été prototympés sur Figma. Cela a permis de :
1.  Valider les parcours utilisateurs (User Flows).
2.  Assurer la cohérence visuelle entre les pages.
3.  Simuler les interactions (clics, transitions).

## 3.3 Principales interfaces de l’application

Cette section présente les vues finales de l'application, démontrant la concrétisation des fonctionnalités spécifiées.

### 3.3.1 Écran d'Authentification (Login)
C'est la porte d'entrée de l'application. Elle se veut sécurisée et simple.
*   **Champs** : Email (ou Matricule) et Mot de passe.
*   **Fonctionnalités** : Validation en temps réel des champs, bouton "Se souvenir de moi", lien "Mot de passe oublié".
*   **Design** : Logo de l'entreprise centré, champs de saisie aérés.

### 3.3.2 Tableau de Bord (Home Screen)
Le hub central pour l'employé.
*   **Barre de navigation** : Accès rapide aux 4 sections (Accueil, Chat, Objectifs, Profil).
*   **Cards (Cartes)** :
    *   *Résumé des Objectifs* : Cercle de progression (ex: "75% atteint").
    *   *Derniers Messages* : Aperçu des conversations non lues.
    *   *Annonces* : Bannière déroulante pour les actualités RH urgentes.

### 3.3.3 Interface de Messagerie (Chat)
Le cœur de la communication.
*   **Liste des conversations** : Affiche les chats privés et les groupes d'équipe. Indication visuelle des messages non lus (badge rouge).
*   **Salle de discussion** :
    *   Bulles de messages distinctes (Moi = Droite, Autres = Gauche).
    *   Horodatage et statut de lecture (vu/distribué).
    *   Zone de saisie avec bouton d'envoi et icône pour pièces jointes (photos).

### 3.3.4 Gestion des Objectifs
L'espace de suivi de performance.
*   **Vue Liste** : Liste des objectifs classés par statut (En cours, Terminé, En attente de validation).
*   **Vue Détail** : Permet à l'employé de mettre à jour le pourcentage d'avancement (slider 0-100%) et d'ajouter des commentaires pour le manager.
*   **Indicateurs visuels** : Codes couleurs (Vert = Fini, Orange = En retard, Bleu = En cours).

### 3.3.5 Interface Manager et Administration Web
Pour les gestionnaires, des vues spécifiques sont disponibles :
*   **Validation** : Une liste des objectifs soumis par l'équipe, avec boutons "Approuver" ou "Rejeter".
*   **Map (Carte)** : Vue Google Maps affichant la dernière position connue des employés (pour la logistique/sécurité).
*   **Admin Panel (Web)** : Interface de gestion (CRUD) pour ajouter des employés, créer des départements et générer des rapports CSV.

## 3.4 Conclusion

La réalisation de cette application a permis de transformer les besoins théoriques en une solution mobile fonctionnelle et performante.
L'utilisation de **Flutter** a grandement facilité la création d'interfaces riches et réactives, tandis que le duo **Node.js/MongoDB** a assuré la flexibilité nécessaire au backend.
Les interfaces finales respectent les standards d'ergonomie modernes, garantissant une prise en main rapide par les employés de Dräxlmaier, quel que soit leur niveau de compétence technique.

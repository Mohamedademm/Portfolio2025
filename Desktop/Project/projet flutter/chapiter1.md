# Chapitre 1 : Cadre Général du Projet

## 1.1 Cadre du Projet

Ce chapitre introductif présente le contexte général dans lequel s'inscrit notre projet de fin d'études. Il décrit les activités de l'organisme d'accueil, la problématique abordée, l'étude de l'existant, ainsi que la méthodologie adoptée pour la réalisation de ce projet.

### 1.1.1 Présentation de la société

Le **Groupe Dräxlmaier** est un équipementier automobile international de premier plan, dont le siège social est situé à Vilsbiburg, en Allemagne. Fondée en 1958, l'entreprise est spécialisée dans la fabrication de systèmes de câblage complexes, de composants intérieurs haut de gamme et de systèmes électroniques pour l'industrie automobile.

En Tunisie, Dräxlmaier est un employeur majeur avec plusieurs sites de production (Sousse, Siliana, Jemmal, El Jem), jouant un rôle clé dans la stratégie de production globale du groupe. L'entreprise se distingue par son engagement envers la qualité, l'innovation et la durabilité.

### 1.1.2 Activités de Dräxlmaier

Les activités principales du groupe s'articulent autour de plusieurs axes stratégiques :

*   **Systèmes électriques et électroniques** : Conception et production de faisceaux de câbles et de systèmes de gestion de l'énergie pour véhicules conventionnels et électriques.
*   **Intérieurs de véhicules** : Fabrication de tableaux de bord, consoles centrales et habillages de portes pour des marques premium (BMW, Audi, Mercedes-Benz, Porsche).
*   **Systèmes de batteries** : Développement de solutions de stockage d'énergie pour la mobilité électrique.
*   **Composants électroniques** : Capteurs, interrupteurs et éclairage d'ambiance.

L'environnement de travail chez Dräxlmaier est caractérisé par une exigence élevée en termes de coordination et de communication entre les différents départements (Production, Qualité, Logistique, RH) pour garantir le "Just-in-Sequence".

### 1.1.3 Technologies et outils de design

Pour la réalisation de ce projet, nous avons évolué dans un environnement technique moderne :

*   **Environnement de développement (IDE)** : Visual Studio Code.
*   **Outils de conception (Design)** : Figma pour le prototypage des interfaces (UI/UX).
*   **Langages et Frameworks** :
    *   **Frontend** : Flutter (Dart) pour le développement mobile cross-platform.
    *   **Backend** : Node.js avec Express.js.
    *   **Base de données** : MongoDB (NoSQL) pour la flexibilité des données.
*   **Collaboration et Versioning** : Git et GitHub pour la gestion du code source.
*   **Outils de gestion** : Jira / Trello pour le suivi des tâches (Scrum).

### 1.1.4 Organigramme de l’organisme

L'organisation de Dräxlmaier est structurée de manière hiérarchique et matricielle pour assurer l'efficacité opérationnelle. Bien que l'organigramme complet soit complexe, notre projet interagit principalement avec les entités suivantes :

*   **Direction Générale** : Définition de la stratégie globale.
*   **Département IT** : Supervision technique et validation des solutions logicielles.
*   **Ressources Humaines (RH)** : Gestion des employés, des formations et de la communication interne.
*   **Managers d'équipes** : Responsables de la supervision directe des employés sur le terrain.
*   **Employés** : Opérateurs et personnel administratif.

## 1.2 Problématique

Dans un environnement industriel dynamique comme celui de Dräxlmaier, la communication interne et la gestion des équipes sont des défis quotidiens. Avant la mise en place de notre solution, plusieurs dysfonctionnements ont été identifiés :

1.  **Fragmentation de la communication** : L'utilisation simultanée d'emails, d'appels téléphoniques, de SMS et d'affichages papier entraîne une perte d'information et des délais de réponse importants.
2.  **Manque de suivi des objectifs** : Les managers peinent à définir, assigner et suivre les objectifs individuels de leurs équipes en temps réel, rendant l'évaluation de la performance difficile.
3.  **Problèmes de localisation et logistique** : Il est complexe de localiser rapidement les employés sur les vastes sites de production ou lors des déplacements, et la gestion des transports (arrêts de bus) manque de transparence.
4.  **Absence de centralisation** : Il n'existe pas de plateforme unique regroupant communication, RH et objectifs professionnels accessible via mobile.

La question centrale de notre projet est donc :
> *"Comment concevoir et développer une solution mobile unifiée capable d'optimiser la communication interne, le suivi des objectifs et la gestion logistique des employés au sein de l'entreprise ?"*

## 1.3 Etude des solutions existantes

Avant d'entamer le développement, nous avons analysé les solutions disponibles sur le marché pour vérifier si elles pouvaient répondre aux besoins spécifiques de Dräxlmaier.

### 1. Microsoft Teams
Plateforme collaborative complète intégrée à Office 365. Très puissante pour la visioconférence et le partage de documents, elle reste cependant coûteuse et complexe pour des employés de terrain qui ont besoin d'une interface simple sur mobile. Elle manque par ailleurs de fonctionnalités spécifiques comme la gestion des transports ou la géolocalisation fine des équipes.

### 2. Slack
Outil de messagerie instantanée populaire pour les équipes agiles. Bien que très ergonomique, Slack se concentre sur le chat et nécessite de nombreuses intégrations (plugins) payantes pour gérer des objectifs ou des tâches RH, ce qui disperse les données.

### 3. WhatsApp Business
Souvent utilisé de manière informelle pour sa gratuité et sa simplicité. Cependant, il pose de graves problèmes de sécurité, de confidentialité des données (mélange vie pro/vie perso), et ne permet aucune administration centralisée des utilisateurs par l'entreprise.

## 1.4 Tableau comparatif : Plateformes de communication et gestion

Le tableau ci-dessous compare les solutions étudiées par rapport aux critères déterminants pour notre projet.
*(Note : Le titre a été adapté pour correspondre au contexte "Communication" du projet, remplaçant la notion "d'enseignement en ligne" moins pertinente ici).*

| Critères | Microsoft Teams | Slack | WhatsApp | **Notre Solution (App Mobile)** |
| :--- | :---: | :---: | :---: | :---: |
| **Communication Temps Réel** | Excellente | Excellente | Excellente | **Excellente** |
| **Gestion des Objectifs RH** | Faible (Complexe) | Via Plugins | Inexistante | **Intégrée et Native** |
| **Géolocalisation / Transport** | Non | Non | Partielle (Live Location) | **Spécifique (Bus/Site)** |
| **Administration Centralisée** | Oui | Oui | Non | **Oui (Rôles & Permissions)** |
| **Coût d'intégration** | Élevé (Licences) | Élevé (Pro) | Faible | **Faible (Interne)** |
| **Simplicité d'usage (Mobile)** | Moyenne | Bonne | Excellente | **Optimisée UX** |
| **Contrôle des Données** | Cloud MS | Cloud Slack | Meta (Public) | **On-Premise / Cloud Sécurisé** |

## 1.5 Synthèse et recommandation

L'étude comparative montre qu'aucune solution sur le marché ne couvre l'intégralité des besoins spécifiques de Dräxlmaier (Communication + Objectifs + Géolocalisation) de manière unifiée et économique.
*   **Teams** et **Slack** sont trop orientés "bureau" et coûteux.
*   **WhatsApp** n'est pas une solution professionnelle sécurisée.

**Recommandation :** Le développement d'une **application mobile sur mesure** est la solution optimale. Elle permettra d'intégrer exactement les workflows de l'entreprise, de garantir la souveraineté des données et d'offrir une expérience utilisateur simplifiée pour les employés, le tout sans coûts de licence récurrents prohibitifs.

## 1.6 Solution proposée

Nous proposons le développement de l'application **"Employee Communication App"**, une solution cross-platform (Android/iOS) accompagnée d'un backend robuste.

Les modules principaux de la solution sont :
1.  **Module Authentification & Profil** : Gestion sécurisée des accès (Email, Matricule), profils enrichis.
2.  **Module Communication** : Chat individuel et de groupe, partage de médias, notifications push en temps réel.
3.  **Module Gestion des Objectifs** : Création d'objectifs, validation par les managers, suivi de progression, statistiques.
4.  **Module Géolocalisation & Transport** : Suivi de position pour la sécurité, gestion des points de rassemblement et arrêts de bus.
5.  **Module Administration** : Tableau de bord web pour la gestion des utilisateurs, des départements et des équipes.

## 1.7 Méthodologie de travail

Pour mener à bien ce projet, nous avons besoin d'une méthode flexible permettant des itérations rapides et une adaptation aux retours utilisateurs.

### 1.7.1 Approche choisie : Agile Scrum
Nous avons adopté la méthode **Scrum**. Cette approche itérative et incrémentale nous permet de diviser le projet en cycles courts appelés "Sprints" (généralement de 2 semaines).
*   **Avantages** : Visibilité constante sur l'avancement, détection rapide des problèmes, livraison régulière de fonctionnalités testables.

### 1.7.2 Structure de l’équipe Scrum
Dans le cadre de ce projet académique/professionnel, les rôles ont été répartis comme suit :
*   **Product Owner (PO)** : (L'organisme/Superviseur) Définit les besoins métier et priorise le Backlog.
*   **Scrum Master** : (L'étudiant) S'assure de l'application de la méthode et lève les obstacles.
*   **Development Team** : (L'étudiant) Réalise la conception, le développement, les tests et le déploiement.

## 1.8 Spécification des Besoins Fonctionnels

### 1.8.1 Objectif
L'objectif principal est de fournir un outil numérique centralisé qui fluidifie les échanges d'informations verticalement (Manager ↔ Employé) et horizontalement (Employé ↔ Employé), tout en digitalisant le processus d'évaluation des performances.

### 1.8.2 Présentation des Acteurs

L'application identifie trois acteurs principaux avec des niveaux de privilèges distincts :

1.  **L'Employé (Employee)** :
    *   S'authentifier de manière sécurisée.
    *   Communiquer via chat (texte, images).
    *   Consulter et mettre à jour ses objectifs.
    *   Recevoir des notifications.
    *   Partager sa localisation (si requis).

2.  **Le Manager** :
    *   Toutes les fonctionnalités de l'employé.
    *   Créer et assigner des objectifs aux membres de son équipe.
    *   Valider ou rejeter les objectifs réalisés.
    *   Visualiser la localisation de son équipe.
    *   Gérer les groupes de discussion d'équipe.

3.  **L'Administrateur (Admin)** :
    *   Gestion complète des utilisateurs (Ajout, Modification, Suppression).
    *   Gestion de la structure organisationnelle (Départements, Équipes).
    *   Validation des nouveaux comptes.
    *   Accès aux statistiques globales d'utilisation.

## 1.9 Exigences Non Fonctionnelles

Pour garantir la qualité et la pérennité de l'application, plusieurs contraintes techniques sont respectées :

*   **Performance** : Temps de réponse des services < 1 seconde, fluidité de l'interface mobile (60 fps).
*   **Sécurité** : Chiffrement des mots de passe (bcrypt), authentification par Token (JWT), communication HTTPS sécurisée.
*   **Disponibilité** : L'application doit être accessible 24h/7j avec une haute tolérance aux pannes.
*   **Ergonomie (Usability)** : Interface utilisateur intuitive (Material Design), support du mode sombre, navigation simplifiée.
*   **Scalabilité** : Architecture backend capable de supporter une montée en charge du nombre d'utilisateurs.
*   **Compatibilité** : Fonctionnement sur Android (vers. 5+) et iOS, ainsi que via navigateur Web.

## 1.10 Diagramme de cas d’utilisation global

Le diagramme de cas d'utilisation global illustre les interactions des acteurs avec le système.

*(Description textuelle du diagramme UML)* :
*   L'acteur **Employé** interagit avec les cas "Se connecter", "Envoyer Message", "Gérer Objectifs".
*   L'acteur **Manager** hérite des cas de l'Employé et inclut "Valider Objectifs", "Superviser Équipe".
*   L'acteur **Admin** inclut les cas "Gérer Utilisateurs", "Configurer Paramètres".
*   Tous les cas nécessitent une pré-condition "Authentification".

```mermaid
usecaseDiagram
    actor "Employé" as E
    actor "Manager" as M
    actor "Administrateur" as A

    package Système {
        usecase "S'authentifier" as UC1
        usecase "Gérer la messagerie" as UC2
        usecase "Gérer ses objectifs" as UC3
        usecase "Valider objectifs équipe" as UC4
        usecase "Suivre localisation" as UC5
        usecase "Gérer utilisateurs & Départements" as UC6
    }

    E --> UC1
    E --> UC2
    E --> UC3
    
    M --|> E
    M --> UC4
    M --> UC5
    
    A --> UC1
    A --> UC6
```

## 1.11 Conclusion

Ce premier chapitre a permis de poser les bases de notre projet. Nous avons présenté l'organisme d'accueil Dräxlmaier, défini la problématique liée à la communication interne et justifié le choix d'une application mobile sur mesure après comparaison avec l'existant. Nous avons également identifié les acteurs du système et leurs besoins, ainsi que la méthodologie Agile Scrum qui guidera notre développement. Les chapitres suivants détailleront l'analyse technique, la conception et la réalisation de la solution.



@startuml
title Diagramme de cas d’utilisation global — Employee Communication App
left to right direction

' ===== Style =====
skinparam shadowing false
skinparam backgroundColor white
skinparam packageStyle rectangle
skinparam actorStyle awesome
skinparam roundcorner 12
skinparam ArrowColor #333333
skinparam ArrowThickness 1
skinparam DefaultFontName Arial
skinparam DefaultFontSize 12

skinparam rectangle {
  BorderColor #222222
}
skinparam usecase {
  BackgroundColor #FFFFFF
  BorderColor #222222
}

actor "Employé" as EMP
actor "Manager" as MGR
actor "Administrateur" as ADM

' Héritage des rôles (Admin hérite Manager, Manager hérite Employé)
MGR -|> EMP
ADM -|> MGR

rectangle "Employee Communication App" as SYS {

  package "Authentification" {
    (S’authentifier) as UC01
  }

  package "Espace Employé" {
    (Gérer profil) as UC02
    (Envoyer message) as UC03
    (Consulter objectifs) as UC04
    (Mettre à jour\nprogression) as UC05
    (Partager localisation) as UC08
  }

  package "Espace Manager" {
    (Créer objectif) as UC06
    (Valider objectif) as UC07
    (Superviser équipe) as UC09
  }

  package "Administration" {
    (Gérer utilisateurs) as UC10
    (Gérer structure) as UC11
    (Valider inscriptions) as UC12
  }
}

' --- Associations acteurs ---
EMP --> UC02
EMP --> UC03
EMP --> UC04
EMP --> UC05
EMP --> UC08

MGR --> UC06
MGR --> UC07
MGR --> UC09

ADM --> UC10
ADM --> UC11
ADM --> UC12

' --- Include : Authentification obligatoire ---
UC02 ..> UC01 : <<include>>
UC03 ..> UC01 : <<include>>
UC04 ..> UC01 : <<include>>
UC05 ..> UC01 : <<include>>
UC06 ..> UC01 : <<include>>
UC07 ..> UC01 : <<include>>
UC08 ..> UC01 : <<include>>
UC09 ..> UC01 : <<include>>
UC10 ..> UC01 : <<include>>
UC11 ..> UC01 : <<include>>
UC12 ..> UC01 : <<include>>



@enduml

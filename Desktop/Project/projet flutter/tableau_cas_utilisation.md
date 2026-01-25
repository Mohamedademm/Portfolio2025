# Tableau Descriptif des Cas d'Utilisation Global

Ce tableau détaille l'ensemble des fonctionnalités identifiées dans le diagramme de cas d'utilisation global. Il peut être intégré directement dans votre rapport (Chapitre Analayse/Conception) pour accompagner ou remplacer le diagramme visuel.

| ID | Cas d'Utilisation | Acteur(s) Principal(aux) | Description | Pré-conditions |
|:---:|:---|:---|:---|:---|
| **UC-01** | **S'authentifier** | Employé, Manager, Admin | Permet à l'utilisateur d'accéder à son espace personnel via Email/Matricule et mot de passe. | Compte activé par l'admin. |
| **UC-02** | **Gérer Profil** | Employé, Manager, Admin | Consultation et modification des informations personnelles (photo, mot de passe). | Être authentifié. |
| **UC-03** | **Envoyer Message** | Employé, Manager | Envoi de messages texte ou images à un collègue ou dans un groupe. | Être authentifié. |
| **UC-04** | **Consulter Objectifs** | Employé | Visualisation de la liste des objectifs assignés et de leur état d'avancement. | Avoir des objectifs assignés. |
| **UC-05** | **Mettre à jour Progression** | Employé | Modification du pourcentage de réalisation d'un objectif (0 à 100%). | L'objectif doit être "En cours". |
| **UC-06** | **Créer Objectif** | Manager | Définition et attribution d'un nouvel objectif SMART à un membre de l'équipe. | Être Manager. |
| **UC-07** | **Valider Objectif** | Manager | Approbation ou rejet d'un objectif marqué comme "Terminé" par un employé. | Objectif à 100%. |
| **UC-08** | **Partager Localisation** | Employé | Activation du partage GPS pour la logistique ou la sécurité sur site. | GPS activé sur mobile. |
| **UC-09** | **Superviser Équipe** | Manager | Visualisation de la localisation et des indicateurs de performance de l'équipe. | Être Manager. |
| **UC-10** | **Gérer Utilisateurs** | Administrateur | Opérations CRUD (Création, Lecture, Mise à jour, Suppression) sur les comptes. | Être Admin. |
| **UC-11** | **Gérer Structure** | Administrateur | Création et modification des Départements et des Équipes de l'entreprise. | Être Admin. |
| **UC-12** | **Valider Inscriptions** | Administrateur | Vérification et activation des nouveaux comptes créés par enregistrement. | Demande en attente. |

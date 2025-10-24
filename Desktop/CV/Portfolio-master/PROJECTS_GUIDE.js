/* 
 * ========================================
 * GUIDE POUR AJOUTER VOS PROJETS
 * ========================================
 * 
 * Ce fichier contient des exemples commentés pour vous aider à ajouter vos projets.
 * 
 * ÉTAPES RAPIDES:
 * 1. Placez vos images de projet dans: src/Assets/Projects/
 * 2. Importez-les en haut de ce fichier (voir exemples ci-dessous)
 * 3. Créez un <ProjectCard> pour chaque projet
 * 4. Remplissez: title, description, ghLink, et optionnellement demoLink
 * 
 * CONSEILS:
 * - Gardez les descriptions entre 100-150 mots
 * - Assurez-vous que tous les liens GitHub fonctionnent
 * - Utilisez des images de bonne qualité (1200x800px minimum)
 * - Testez les liens de démo avant de publier
 */

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// ========================================
// IMPORTEZ VOS IMAGES ICI
// ========================================
// Placez vos images dans: src/Assets/Projects/
// Puis importez-les comme ceci:

import projet1 from "../../Assets/Projects/chatify.png"; // Remplacez par votre image
import projet2 from "../../Assets/Projects/blog.png";    // Remplacez par votre image
import projet3 from "../../Assets/Projects/codeEditor.png"; // Remplacez par votre image
import projet4 from "../../Assets/Projects/leaf.png";    // Remplacez par votre image

// Exemple de noms de fichiers suggérés pour vos projets:
// - ecommerce.png
// - weather-app.png
// - task-manager.png
// - student-portal.png
// - etc.


function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          
          {/* ========================================
              PROJET 1 - EXEMPLE
              ========================================
              Copiez ce bloc pour chaque nouveau projet
          */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={projet1}
              isBlog={false}
              
              // ⬇️ Titre de votre projet (court et clair)
              title="[Remplacez par le nom de votre projet]"
              
              // ⬇️ Description (100-150 mots recommandés)
              // Décrivez ce que fait votre projet, les technologies utilisées,
              // et pourquoi c'est intéressant
              description="Votre description ici. Expliquez ce que fait le projet, quels problèmes il résout, et les technologies utilisées. Par exemple: Application web développée avec React et Spring Boot permettant la gestion de... Intègre l'authentification JWT, une API RESTful, et une interface responsive avec Material-UI."
              
              // ⬇️ Lien vers votre repository GitHub
              // IMPORTANT: Remplacez par VOTRE lien GitHub
              ghLink="https://github.com/Mohamedademm/[votre-repo]"
              
              // ⬇️ Lien vers la démo en ligne (OPTIONNEL)
              // Si vous avez déployé le projet sur Vercel, Netlify, Heroku, etc.
              // Sinon, supprimez cette ligne
              demoLink="https://votre-demo.vercel.app/"
            />
          </Col>

          {/* ========================================
              PROJET 2 - EXEMPLE APPLICATION MOBILE
              ======================================== */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={projet2}
              isBlog={false}
              title="Application Mobile Flutter"
              description="Application mobile cross-platform développée avec Flutter et Firebase. Fonctionnalités: authentification Google, gestion de données en temps réel, notifications push, et interface utilisateur moderne avec animations. Publiée sur Google Play Store avec plus de 500 téléchargements."
              ghLink="https://github.com/Mohamedademm/flutter-app"
              // Pas de demoLink pour les apps mobiles
              // Vous pouvez ajouter un lien vers le Play Store:
              // demoLink="https://play.google.com/store/apps/details?id=com.votreapp"
            />
          </Col>

          {/* ========================================
              PROJET 3 - EXEMPLE BACKEND/API
              ======================================== */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={projet3}
              isBlog={false}
              title="API REST Spring Boot"
              description="API RESTful robuste développée avec Spring Boot et PostgreSQL. Implémente l'architecture en couches, Spring Security avec JWT, validation des données, gestion d'erreurs personnalisée, et documentation Swagger. Tests unitaires avec JUnit et Mockito. Déployée sur Heroku."
              ghLink="https://github.com/Mohamedademm/spring-boot-api"
              demoLink="https://votre-api.herokuapp.com/swagger-ui/"
            />
          </Col>

          {/* ========================================
              PROJET 4 - EXEMPLE FULL STACK
              ======================================== */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={projet4}
              isBlog={false}
              title="Plateforme E-Learning"
              description="Plateforme complète d'apprentissage en ligne avec Angular (frontend) et Node.js + Express (backend). Fonctionnalités: cours vidéo, quiz interactifs, suivi de progression, système de badges, et tableau de bord analytics. Intégration de MongoDB pour la base de données et AWS S3 pour le stockage des vidéos."
              ghLink="https://github.com/Mohamedademm/elearning-platform"
              demoLink="https://elearning-demo.netlify.app/"
            />
          </Col>

          {/* ========================================
              AJOUTEZ PLUS DE PROJETS ICI
              ========================================
              
              Copiez simplement un des blocs <Col>...</Col> ci-dessus
              et modifiez les informations.
              
              Recommandation: 4-6 projets au total
              
          */}

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;


/* ========================================
 * EXEMPLES DE DESCRIPTIONS PAR TYPE DE PROJET
 * ========================================
 * 
 * PROJET WEB FULL STACK:
 * "Application web complète développée avec [Tech Frontend] et [Tech Backend].
 * Permet aux utilisateurs de [fonctionnalité principale]. Implémente 
 * l'authentification sécurisée, une API RESTful, et une interface responsive.
 * Technologies: React, Node.js, MongoDB, JWT, Bootstrap."
 * 
 * APPLICATION MOBILE:
 * "Application mobile cross-platform développée avec Flutter. 
 * Offre [fonctionnalité principale] avec une interface intuitive.
 * Intègre Firebase pour l'authentification et la base de données en temps réel.
 * Publiée sur Play Store avec [nombre] téléchargements."
 * 
 * PROJET BACKEND/API:
 * "API RESTful robuste construite avec Spring Boot et PostgreSQL.
 * Fournit des endpoints sécurisés pour [fonctionnalités].
 * Implémente JWT, validation des données, et documentation Swagger.
 * Tests unitaires avec JUnit et couverture de code >80%."
 * 
 * PROJET DATA SCIENCE/AI:
 * "Projet de Machine Learning utilisant Python et scikit-learn.
 * Analyse [type de données] et prédit [résultat].
 * Atteint une précision de [X]% avec [algorithme].
 * Visualisation des données avec Matplotlib et Seaborn."
 * 
 * PROJET FRONTEND:
 * "Interface web moderne développée avec React et TypeScript.
 * Offre une expérience utilisateur fluide avec [fonctionnalités].
 * Styled-components pour le CSS, Redux pour la gestion d'état.
 * Score Lighthouse: 95+ sur toutes les métriques."
 * 
 */

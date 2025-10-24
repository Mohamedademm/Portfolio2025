// ============================================
// EXEMPLE DE CODE POUR Projects.js
// ============================================
// Copiez ce template et remplacez avec vos informations

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// ===== IMPORTEZ VOS IMAGES ICI =====
// Placez vos images dans src/Assets/Projects/
import projet1 from "../../Assets/Projects/projet1.png";
import projet2 from "../../Assets/Projects/projet2.png";
import projet3 from "../../Assets/Projects/projet3.png";
import projet4 from "../../Assets/Projects/projet4.png";
import projet5 from "../../Assets/Projects/projet5.png";
import projet6 from "../../Assets/Projects/projet6.png";

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
          
          {/* ========== PROJET 1 ========== */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={projet1}
              isBlog={false}
              title="[Nom de votre Projet 1]"
              description="[Description de 100-150 mots. Expliquez ce que fait le projet, les technologies utilisées, et pourquoi c'est intéressant. Soyez précis et professionnel.]"
              ghLink="https://github.com/[votre-username]/[repo-name]"
              demoLink="https://[votre-demo].com/" // Optionnel
            />
          </Col>

          {/* ========== PROJET 2 ========== */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={projet2}
              isBlog={false}
              title="[Nom de votre Projet 2]"
              description="[Description...]"
              ghLink="https://github.com/[votre-username]/[repo-name]"
              demoLink="https://[votre-demo].com/"
            />
          </Col>

          {/* ========== PROJET 3 ========== */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={projet3}
              isBlog={false}
              title="[Nom de votre Projet 3]"
              description="[Description...]"
              ghLink="https://github.com/[votre-username]/[repo-name]"
              demoLink="https://[votre-demo].com/"
            />
          </Col>

          {/* ========== PROJET 4 ========== */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={projet4}
              isBlog={false}
              title="[Nom de votre Projet 4]"
              description="[Description...]"
              ghLink="https://github.com/[votre-username]/[repo-name]"
              // Pas de demoLink si pas de démo disponible
            />
          </Col>

          {/* ========== PROJET 5 (Optionnel) ========== */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={projet5}
              isBlog={false}
              title="[Nom de votre Projet 5]"
              description="[Description...]"
              ghLink="https://github.com/[votre-username]/[repo-name]"
            />
          </Col>

          {/* ========== PROJET 6 (Optionnel) ========== */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={projet6}
              isBlog={false}
              title="[Nom de votre Projet 6]"
              description="[Description...]"
              ghLink="https://github.com/[votre-username]/[repo-name]"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;


// ============================================
// EXEMPLES CONCRETS (À ADAPTER)
// ============================================

/*

EXEMPLE 1 - Application Web Full Stack:

<ProjectCard
  imgPath={ecommerceApp}
  isBlog={false}
  title="E-Commerce Platform"
  description="Full-stack e-commerce application built with Spring Boot and Angular. Features include user authentication, product catalog, shopping cart, order management, and payment integration with Stripe. Implemented RESTful APIs, JWT authentication, and responsive design with Angular Material."
  ghLink="https://github.com/Mohamedademm/ecommerce-platform"
  demoLink="https://ecommerce-demo.vercel.app/"
/>

EXEMPLE 2 - Application Mobile:

<ProjectCard
  imgPath={mobileApp}
  isBlog={false}
  title="Weather Forecast App"
  description="Cross-platform mobile application developed with Flutter. Provides real-time weather information using OpenWeather API. Features include location-based forecasts, 7-day predictions, beautiful UI with animations, and offline data caching. Published on Google Play Store."
  ghLink="https://github.com/Mohamedademm/weather-flutter"
  demoLink="https://play.google.com/store/apps/details?id=com.yourapp"
/>

EXEMPLE 3 - Projet AI/Data Science:

<ProjectCard
  imgPath={aiProject}
  isBlog={false}
  title="Student Performance Predictor"
  description="Machine Learning project using Python and scikit-learn to predict student academic performance. Analyzed dataset of 10,000+ students, implemented multiple ML algorithms (Random Forest, SVM, Neural Networks), achieved 92% accuracy. Includes data visualization with Matplotlib and Seaborn."
  ghLink="https://github.com/Mohamedademm/student-performance-ml"
/>

EXEMPLE 4 - Projet Backend/API:

<ProjectCard
  imgPath={apiProject}
  isBlog={false}
  title="University Management API"
  description="RESTful API built with Node.js and Express for university management system. Features include student enrollment, course management, grade calculation, and report generation. Implemented JWT authentication, role-based access control, and MongoDB database with optimized queries."
  ghLink="https://github.com/Mohamedademm/university-api"
  demoLink="https://university-api.herokuapp.com/docs"
/>

EXEMPLE 5 - Projet Frontend:

<ProjectCard
  imgPath={frontendProject}
  isBlog={false}
  title="Task Management Dashboard"
  description="Modern task management application built with React and TypeScript. Features drag-and-drop interface, real-time updates, dark mode, calendar view, and team collaboration. Styled with TailwindCSS and integrated with Firebase for backend services."
  ghLink="https://github.com/Mohamedademm/task-manager-react"
  demoLink="https://task-manager-demo.netlify.app/"
/>

EXEMPLE 6 - Projet Competitive Programming:

<ProjectCard
  imgPath={algoProject}
  isBlog={false}
  title="Algorithm Visualizer"
  description="Interactive web application to visualize sorting and pathfinding algorithms. Built with vanilla JavaScript and HTML5 Canvas. Features include step-by-step visualization, speed control, algorithm comparison, and educational explanations. Great tool for learning data structures and algorithms."
  ghLink="https://github.com/Mohamedademm/algo-visualizer"
  demoLink="https://algo-visualizer-demo.vercel.app/"
/>

*/

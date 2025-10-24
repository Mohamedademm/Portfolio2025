import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import ServiceCard from "./ServiceCard";
import Particle from "../Particle";
import { 
  FaCode, 
  FaMobile, 
  FaDatabase, 
  FaServer, 
  FaBrain,
  FaPalette
} from "react-icons/fa";

function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <FaCode size={60} />,
      title: t('services.fullstack.title'),
      description: t('services.fullstack.description'),
      technologies: "React, Angular, Node.js, Spring Boot"
    },
    {
      icon: <FaMobile size={60} />,
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      technologies: "Flutter, React Native"
    },
    {
      icon: <FaDatabase size={60} />,
      title: t('services.database.title'),
      description: t('services.database.description'),
      technologies: "MongoDB, PostgreSQL, MySQL"
    },
    {
      icon: <FaServer size={60} />,
      title: t('services.backend.title'),
      description: t('services.backend.description'),
      technologies: "Spring Boot, Express.js, REST APIs"
    },
    {
      icon: <FaBrain size={60} />,
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      technologies: "Python, TensorFlow, Data Science"
    },
    {
      icon: <FaPalette size={60} />,
      title: t('services.uiux.title'),
      description: t('services.uiux.description'),
      technologies: "Figma, Bootstrap, Material-UI"
    }
  ];

  return (
    <Container fluid className="service-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          {t('services.title')} <strong className="purple">{t('services.offer')} </strong>
        </h1>
        <p style={{ color: "white" }}>
          {t('services.subtitle')}
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {services.map((service, index) => (
            <Col md={4} className="service-card" key={index}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                technologies={service.technologies}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Services;

import React from "react";
import Card from "react-bootstrap/Card";
import "./Services.css";

function ServiceCard({ icon, title, description, technologies }) {
  return (
    <Card className="service-card-view">
      <Card.Body>
        <div className="service-icon purple">{icon}</div>
        <Card.Title className="service-title">{title}</Card.Title>
        <Card.Text className="service-description">
          {description}
        </Card.Text>
        <div className="service-tech">
          <strong className="purple">{technologies}</strong>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ServiceCard;

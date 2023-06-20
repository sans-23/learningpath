import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function Feature() {
  return (
    <section className="feature">
      <div className="feature-content" style={{ height: '500px', overflow: 'auto' }}>
        <Container>
          <Row>
            <Col lg={4}>
              <Card bg="dark" text="light">
                <Card.Body>
                  <Card.Title>Learn at Your Own Pace</Card.Title>
                  <Card.Text>Access a wide range of courses and create a personalized learning path that fits your needs.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card bg="dark" text="light">
                <Card.Body>
                  <Card.Title>Track Your Progress</Card.Title>
                  <Card.Text>Mark courses and learning milestones as complete, to-do, or in need of revision.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card bg="dark" text="light">
                <Card.Body>
                  <Card.Title>Share and Collaborate</Card.Title>
                  <Card.Text>Create learning paths and share them with others to foster collaboration and knowledge sharing.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default Feature;

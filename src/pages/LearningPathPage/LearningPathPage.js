import React, { useState } from 'react';
import { Button, Badge, Card } from 'react-bootstrap';
import AddLearningPathModal from '../../components/AddLearningPathModal';
import { Link } from 'react-router-dom';
import learningPathsData from '../../content/learningPathsData.json';

const LearningPathPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [learningPaths, setLearningPaths] = useState(learningPathsData.learningPaths);

  const handleAddLearningPath = (learningPath) => {
    setLearningPaths((prevLearningPaths) => [...prevLearningPaths, learningPath]);
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1 className="display-4 mb-4 text-light">Learning Path Page</h1>
      <div className="learning-path-list">
        <div className="card-grid-container">
          <div className="card-grid">
            {learningPaths.map((learningPath, index) => (
              <Card key={index} className="mb-4">
                <Link
                  to={{
                    pathname: `/learningpaths/${learningPath.title}`,
                    state: { learningPath },
                  }}
                  className="text-decoration-none"
                >
                  <Card.Img variant="top" src={`https://mdbcdn.b-cdn.net/img/new/standard/city/0${index + 41}.webp`} />
                  <Card.Body>
                    <Card.Title>{learningPath.title}</Card.Title>
                    <Card.Text>{learningPath.description}</Card.Text>
                  </Card.Body>
                </Link>
                <Card.Footer>
                  <div className="tags-container">
                    {learningPath.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} pill variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        <i className="bi bi-plus"></i> Add Learning Path
      </Button>
      <AddLearningPathModal show={showModal} onClose={handleModalClose} onAddLearningPath={handleAddLearningPath} />
    </div>
  );
};

export default LearningPathPage;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';

const SingleLearningPathPage = () => {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  const [materials, setMaterials] = useState([]);
  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialType, setNewMaterialType] = useState('');

  useEffect(() => {
    if (location.state && location.state.learningPath) {
      const { learningPath } = location.state;
      setCourses(learningPath.courses);
      setSelectedCourse(learningPath.courses[0]);
    }
  }, [location]);

  useEffect(() => {
    if (selectedCourse) {
      setMaterials(selectedCourse.materials);
    }
  }, [selectedCourse]);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleAddCourse = () => {
    const newCourse = {
      title: newCourseTitle,
      description: newCourseDescription,
      materials: [],
    };
    setCourses([...courses, newCourse]);
    setNewCourseTitle('');
    setNewCourseDescription('');
  };

  const handleAddMaterial = () => {
    const newMaterial = {
      title: newMaterialTitle,
      type: newMaterialType,
    };
    const updatedCourse = { ...selectedCourse, materials: [...selectedCourse.materials, newMaterial] };
    const updatedCourses = courses.map((course) => (course === selectedCourse ? updatedCourse : course));
    setCourses(updatedCourses);
    setMaterials([...materials, newMaterial]);
    setNewMaterialTitle('');
    setNewMaterialType('');
  };

  return (
    <div className="learning-path-page">
      <div className="left-panel bg-dark text-white">
        <h2>Course List</h2>
        {courses.map((course, index) => (
          <Card
            key={index}
            className={`mb-3 ${course === selectedCourse ? 'selected' : ''}`}
            onClick={() => handleCourseClick(course)}
          >
            <Card.Body>
              <Card.Title>{course.title}</Card.Title>
              <Card.Text>{course.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
        <Form.Group>
          <Form.Label>Add Course</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={newCourseTitle}
            onChange={(e) => setNewCourseTitle(e.target.value)}
          />
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            value={newCourseDescription}
            onChange={(e) => setNewCourseDescription(e.target.value)}
          />
          <Button variant="primary" onClick={handleAddCourse}>
            Add Course
          </Button>
        </Form.Group>
      </div>
      <div className="right-panel bg-dark text-white">
        <h2>Material</h2>
        {selectedCourse ? (
          <div>
            <h3>{selectedCourse.title}</h3>
            {materials.map((material, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title>{material.title}</Card.Title>
                  <Card.Text>{material.type}</Card.Text>
                </Card.Body>
              </Card>
            ))}
            <Form.Group>
              <Form.Label>Add Material</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={newMaterialTitle}
                onChange={(e) => setNewMaterialTitle(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="Type"
                value={newMaterialType}
                onChange={(e) => setNewMaterialType(e.target.value)}
              />
              <Button variant="primary" onClick={handleAddMaterial}>
                Add Material
              </Button>
            </Form.Group>
          </div>
        ) : (
          <p>No course selected</p>
        )}
      </div>
    </div>
  );
};

export default SingleLearningPathPage;

import React, { useState } from 'react';
import { Modal, Form, Button, Badge } from 'react-bootstrap';

const AddLearningPathModal = ({ show, onClose, onAddLearningPath }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleAddLearningPath = () => {
    const tagsArray = tags.split(',').map((tag) => tag.trim());
    const learningPath = {
      title: title,
      description: description,
      tags: tagsArray
    };
    onAddLearningPath(learningPath);
    setTitle('');
    setDescription('');
    setTags('');
    // Remove the navigation code from here
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Learning Path</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
          </Form.Group>
          <Form.Group controlId="formTags">
            <Form.Label>Tags</Form.Label>
            <div className="tags-container">
              {tags.split(',').map((tag, index) => (
                <Badge key={index} pill variant="primary">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
            <Form.Control type="text" placeholder="Enter tags" value={tags} onChange={handleTagsChange} />
            <Form.Text className="text-muted">
              Add tags separated by commas (e.g., tag1, tag2, tag3)
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddLearningPath}>
          Add Learning Path
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLearningPathModal;

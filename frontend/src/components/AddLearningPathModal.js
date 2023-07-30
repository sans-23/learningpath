import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddLearningPathModal = ({ target, show, onClose, onAdd }) => {
  console.log(target)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleAdd = () => {
    if (title.trim() === '' || description.trim() === '') return;
    const element = {
      id: Math.random().toString(),
      title: title,
      subtitle: description,
    };
    onAdd(element);
    setTitle('');
    setDescription('');
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{color:"black"}}>Add {target}</Modal.Title>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLearningPathModal;

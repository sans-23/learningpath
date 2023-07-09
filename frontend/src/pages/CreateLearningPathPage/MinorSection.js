import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Heading from './Heading';
import Tile from './Tile';
import './CreateLearningPathPage.css';

const MinorSection = ({ title, tiles, setTiles, selectPath }) => {
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [orderChanged, setOrderChanged] = useState(false);

  const toggleOrder = () => setOrderChanged(!orderChanged);

  const connectLinkedListNode = async (id1, id2, type) => {
    const response = await fetch(
      `http://localhost:8080/api/${type}/connect/${id1}/${id2}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  // we should create a handler (api endpoint) on server where we would pass array to connect all nodes in one request within the database
  const createLindedList = async (arr, type) => {
    for (let i = 0; i < arr.length - 1; i++) {
      await connectLinkedListNode(arr[i]._id, arr[i + 1]._id, type);
    }
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items, tiles);
    if(JSON.stringify(items) !== JSON.stringify(tiles)){
      // items===tiles compares references, not values
      setOrderChanged(true);
    }
    setTiles(items);
  };

  const handleDeleteTile = (id) => {
    const updatedList = tiles.filter((tile) => tile.id !== id);
    setTiles(updatedList);
    setOrderChanged(true);
  };

  const handleAddClick = () => {
    setShowForm(!showForm);
    setFormTitle('');
    setFormSubtitle('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formTitle.trim() === '' || formSubtitle.trim() === '') return;

    const newTile = {
      id: Math.random().toString(),
      title: formTitle.trim(),
      subtitle: formSubtitle.trim(),
    };

    setTiles((prevTiles) => [...prevTiles, newTile]);
    setShowForm(false);
    setFormTitle('');
    setFormSubtitle('');
  };

  return (
    <div className='minor'>
      <Heading title={title} onAddClick={handleAddClick} orderChanged={orderChanged} toggleLock={toggleOrder}/>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={title}>
          {(provided) => (
            <div className='tiles' {...provided.droppableProps} ref={provided.innerRef}>
              {tiles.map((tile, index) => (
                <Draggable key={tile.id} draggableId={tile.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Tile id={tile.id} title={tile.title} subtitle={tile.subtitle} onDelete={handleDeleteTile} selectPath={selectPath}/>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {showForm && (
        <form className='add-form' onSubmit={handleFormSubmit}>
          <input
            type='text'
            placeholder='Title'
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
            <br />
          <input
            type='text'
            placeholder='Subtitle'
            value={formSubtitle}
            onChange={(e) => setFormSubtitle(e.target.value)}
          />
          <div>
            <button type='submit'>Add</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MinorSection;

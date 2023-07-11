import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Heading from './Heading';
import Tile from './Tile';
import './CreateLearningPathPage.css';
import AddLearningPathModal from '../../components/AddLearningPathModal';

const MinorSection = ({ title, tiles, setTiles, selectPath }) => {
  const [showForm, setShowForm] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);
  
  const handleAddClick = () => setShowForm(!showForm);
  const handleFormClose = () => setShowForm(false);
  const toggleOrder = () => setOrderChanged(!orderChanged);

  const handleAdd = (ele) => {
    setTiles((prev)=>[...prev, ele]);
    setShowForm(false);
  };

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
      <AddLearningPathModal target={title} show={showForm} onClose={handleFormClose} onAdd={handleAdd} />
    </div>
  );
};

export default MinorSection;

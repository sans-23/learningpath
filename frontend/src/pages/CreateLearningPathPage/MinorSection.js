import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Heading from './Heading';
import Tile from './Tile';
import './CreateLearningPathPage.css';
import AddLearningPathModal from '../../components/AddLearningPathModal';
import { setLearningPathTiles, setMaterialTiles, setCourseTiles, setMaterials, setSelectedLearningPath, setSelectedCourse } from '../../redux/slices/learningPathSlice';
import AuthContext from '../../services/AuthContext';

const MinorSection = ({ title }) => {
  const [showForm, setShowForm] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);
  const { accessToken } = useContext(AuthContext);
  const materialTiles = useSelector((state) => state.learningPath.materialTiles);

  const dispatch = useDispatch();
  const tiles = useSelector((state) => {
    if (title === 'LearningPath') return state.learningPath.learningPathTiles;
    else if (title === 'Course') return state.learningPath.courseTiles;
    else if (title === 'Material') return Array.from(state.learningPath.materials);
    return [];
  });

  const handleAddClick = () => setShowForm(!showForm);
  const handleFormClose = () => setShowForm(false);
  const toggleOrder = () => setOrderChanged(!orderChanged);

  const handleAdd = (ele) => {
    dispatch(setCourseTiles((prev) => [...prev, ele]));
    setShowForm(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items, tiles);
    if (JSON.stringify(items) !== JSON.stringify(tiles)) {
      // items===tiles compares references, not values
      setOrderChanged(true);
    }
    if (title === 'LearningPath') {
      dispatch(setLearningPathTiles(items));
    } else if (title === 'Course') {
      dispatch(setCourseTiles(items));
    } else if (title === 'Material') {
      dispatch(setMaterials(items));
    }
  };

  const handleDeleteTile = (id) => {
    const updatedList = tiles.filter((tile) => tile.id !== id);
    if (title === 'LearningPath') {
      dispatch(setLearningPathTiles(updatedList));
    } else if (title === 'Course') {
      dispatch(setCourseTiles(updatedList));
    } else if (title === 'Material') {
      dispatch(setMaterials(updatedList));
    }
    setOrderChanged(true);
  };

  const handleTileClick = (id) => {
    if (title === 'LearningPath') {
      dispatch(setSelectedLearningPath(id));
      handleLearningPathClick(id);
    } else if (title === 'Course') {
      dispatch(setSelectedCourse(id));
      handleMaterialClick(id);
    }
  };

  const handleLearningPathClick = (id) => {
    console.log(`Learning path with id ${id} clicked`);
    fetch(`http://localhost:5000/api/v1/learning-paths/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const courseData = data.courses.map((course) => ({
          id: course._id,
          title: course.title,
          subtitle: course.description,
        }));
        dispatch(setCourseTiles(courseData));

        const materialData = new Map();
        data.courses.forEach((course) => {
          const materials = course.courseItems.map((item) => ({
            id: item._id,
            title: item.title,
            subtitle: item.itemType,
          }));
          materialData.set(course._id, materials);
        });
        dispatch(setMaterialTiles(materialData));
        dispatch(setMaterials([]));
        console.log(materialData);
      })
      .catch((error) => {
        console.error(`Error fetching learning path with id ${id}:`, error);
      });
  };

  const handleMaterialClick = (id) => {
    console.log(`Material with id ${id} clicked`);
    const materialData = materialTiles.get(id);
    if (materialData) {
      dispatch(setMaterials(materialData));
    }
  };  

  return (
    <div className='minor'>
      <Heading title={title} onAddClick={handleAddClick} orderChanged={orderChanged} toggleLock={toggleOrder} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={title}>
          {(provided) => (
            <div className='tiles' {...provided.droppableProps} ref={provided.innerRef}>
              {tiles.map((tile, index) => (
                <Draggable key={tile.id} draggableId={tile.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Tile id={tile.id} title={tile.title} subtitle={tile.subtitle} onDelete={handleDeleteTile} selectPath={() => handleTileClick(tile.id)} />
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
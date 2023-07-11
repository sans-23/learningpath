import React, { useState, useEffect } from 'react';
import MinorSection from './MinorSection';
import './CreateLearningPathPage.css';
import { Spinner } from 'react-bootstrap';

const CreateLearningPathPage = () => {
  const [learningPathTiles, setLearningPathTiles] = useState(null);
  const [courseTiles, setCourseTiles] = useState([]);
  const [materialTiles, setMaterialTiles] = useState(new Map());
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    // Fetch learning path data
    fetch('http://localhost:5000/api/v1/learning-paths')
      .then((response) => response.json())
      .then((data) => {
        // Update learning path tiles
        const learningPathData = data.map((item) => ({
          id: item._id,
          title: item.title,
          subtitle: item.description,
        }));
        setLearningPathTiles(learningPathData);
      })
      .catch((error) => {
        console.error('Error fetching learning paths:', error);
      });
  }, []);

  const handleLearningPathClick = (id) => {
    console.log(`Learning path with id ${id} clicked`);
    // Fetch specific learning path data
    fetch(`http://localhost:5000/api/v1/learning-paths/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update course tiles
        const courseData = data.courses.map((course) => ({
          id: course._id,
          title: course.title,
          subtitle: course.description,
        }));
        setCourseTiles(courseData);

        // Update material tiles
        const materialData = new Map();
        data.courses.forEach((course) => {
          const materials = course.courseItems.map((item) => ({
            id: item._id,
            title: item.title,
            subtitle: item.itemType,
          }));
          materialData.set(course._id, materials);
        });
        setMaterialTiles(materialData);
        setMaterials([]);
        console.log(materialData);
      })
      .catch((error) => {
        console.error(`Error fetching learning path with id ${id}:`, error);
      });
  };

  const handleMaterialClick = (id) => {
    console.log(`Material with id ${id} clicked`);
    setMaterials(materialTiles.get(id));
  };

  if(!learningPathTiles){
    return <div className='spinner'><Spinner animation="grow" variant="light" /></div>
  }

  return (
    <div className='major'>
      <MinorSection title='LearningPath' tiles={learningPathTiles} setTiles={setLearningPathTiles} selectPath={handleLearningPathClick} />
      <MinorSection title='Course' tiles={courseTiles} setTiles={setCourseTiles} selectPath={handleMaterialClick} />
      <MinorSection title='Material' tiles={Array.from(materials)} setTiles={setMaterials}  selectPath={()=>{}}/>
    </div>
  );
};

export default CreateLearningPathPage;

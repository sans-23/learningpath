import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { setLearningPathTiles } from '../../redux/slices/learningPathSlice';
import AuthContext from '../../services/AuthContext';
import MinorSection from './MinorSection';
import './CreateLearningPathPage.css';

const CreateLearningPathPage = () => {
  const { accessToken } = useContext(AuthContext);
  const dispatch = useDispatch();
  const learningPathTiles = useSelector((state) => state.learningPath.learningPathTiles);

  useEffect(() => {
    // Fetch users learning path data
    fetch('http://localhost:5000/api/v1/my/learning-paths', {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token in the request headers
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update learning path tiles
        const learningPathData = data.map((item) => ({
          id: item._id,
          title: item.title,
          subtitle: item.description,
        }));
        dispatch(setLearningPathTiles(learningPathData));
      })
      .catch((error) => {
        console.error('Error fetching learning paths:', error);
      });
  }, [accessToken, dispatch]);

  if (!learningPathTiles) {
    return <div className='spinner'><Spinner animation="grow" variant="light" /></div>;
  }

  return (
    <div className='major'>
      <MinorSection title='LearningPath' />
      <MinorSection title='Course' />
      <MinorSection title='Material' />
    </div>
  );
};

export default CreateLearningPathPage;

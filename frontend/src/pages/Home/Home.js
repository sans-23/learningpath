import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero';
import './Home.css';
import About from '../../components/About';

const Home = () => {
  const [learningPaths, setLearningPaths] = useState(null);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      const response = await fetch('http://localhost:5000/api/v1/learning-paths');
      const data = await response.json();
      setLearningPaths(data);
    };
    fetchLearningPaths();
  }, []);

  if(!learningPaths){
    return <div className='spinner'><Spinner animation="grow" variant="light" /></div>
  }

  return (
      <div className='home'>
        <Hero />
        <div className="container learning-path-list">
        <p>Featured</p>
          <div className="card-grid-container">
            <div className="card-grid">
              {learningPaths &&
                learningPaths.map((learningPath, index) => (
                  <Card key={index} bg="dark" text="white" className="mb-4">
                    <Link
                      to={{
                        pathname: `/learn/${learningPath._id}`,
                        state: { learningPath },
                      }}
                      className="text-decoration-none"
                    >
                      <Card.Img variant="top" src={`https://mdbcdn.b-cdn.net/img/new/standard/city/0${index + 41}.webp`} />
                      <Card.Body>
                        <Card.Title style={{ color: 'white' }}>{learningPath.title}</Card.Title>
                        <Card.Text style={{ color: 'white' }}>{learningPath.description}</Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                ))}
            </div>
          </div>
        </div>
        <About />
      </div>
    );
};

export default Home;
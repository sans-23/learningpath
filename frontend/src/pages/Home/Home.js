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
      console.log(data);
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
                  <Card key={index} bg="dark" text="white" className="mb-4" style={{ width: '300px', height: '300px' }}>
                    <Link
                      to={{
                        pathname: `/learn/${learningPath._id}`,
                        state: { learningPath },
                      }}
                      className="text-decoration-none"
                    >
                      <Card.Img variant="top" src={learningPath.coverImg} />
                      <Card.Body>
                        <Card.Title style={{ color: 'white' }}>{learningPath.title}</Card.Title>
                        <Card.Text style={{ color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{learningPath.description}</Card.Text>
                      </Card.Body>
                    </Link>
                    <div class="progress" role="progressbar" aria-valuenow={index + 41} aria-valuemin="0" aria-valuemax="100" style={{height: "1px"}}>
                      <div class="progress-bar" style={{width: `${(index*41+ 836)%77}%`}}></div>
                    </div>
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
import React from 'react';
import Hero from '../../components/Hero';
import Feature from '../../components/Features';
import './Home.css';

const Home = () => {
    return (
        <div className="App">
          <Hero />
          <Feature />
        </div>
      );
};

export default Home;
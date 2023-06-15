import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Header from './components/Header';
import LearningPathPage from './pages/LearningPathPage/LearningPathPage';
import SingleLearningPathPage from './pages/SingleLearningPathPage/SingleLearningPathPage';
import ConsumptionPage from './pages/ConsumptionPage/ConsumptionPage';

function App() {
  return (
      <BrowserRouter>
      <Header/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/learn" element={<ConsumptionPage />} />
        <Route path="/learningpaths" element={<LearningPathPage/>} />
        <Route path="/learningpaths/:name" element={<SingleLearningPathPage/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

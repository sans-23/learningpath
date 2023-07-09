import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Header from './components/Header';
import LearningPathPage from './pages/LearningPathPage/LearningPathPage';
import SingleLearningPathPage from './pages/SingleLearningPathPage/SingleLearningPathPage';
import ConsumptionPage from './pages/ConsumptionPage/ConsumptionPage';
import SignInButton from './components/SignInButton';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './services/AuthContext';
import CreateLearningPathPage from './pages/CreateLearningPathPage/CreateLearningPathPage';

function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="53216454829-hvqli6c62q35rf63u5bt05b6t6snpald.apps.googleusercontent.com">
        <BrowserRouter>
        <Header/>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/p" element={<CreateLearningPathPage />} />
          <Route path="/auth" element={<SignInButton/>} />
          <Route path="/about" element={<About />} />
          <Route path="/learn" element={<ConsumptionPage />} />
          <Route path="/learningpaths" element={<LearningPathPage/>} />
          <Route path="/learningpaths/:name" element={<SingleLearningPathPage/>} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;

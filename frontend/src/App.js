import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Header from './components/Header';
import ConsumptionPage from './pages/ConsumptionPage/ConsumptionPage';
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
          <Route path="/learn/:id" element={<ConsumptionPage />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;

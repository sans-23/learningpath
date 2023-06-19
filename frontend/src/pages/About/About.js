// About.js

import React from 'react';

const About = () => {
  return (
    <div className="container mt-4 text-light" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
      <h1 className="display-4 mb-4">About Page</h1>
      <p className="lead">
        Welcome to our Learning Path platform! We are dedicated to providing a comprehensive learning experience for our users.
      </p>
      <p>
        Our platform allows you to create custom learning paths, enroll in courses, and track your progress as you master new skills.
      </p>
      <p>
        Whether you are a student looking to enhance your knowledge or a tutor interested in sharing your expertise, our platform offers a range of features to support your learning journey.
      </p>
      <p>
        Join our community today and embark on an exciting learning adventure!
      </p>

      <h2 className="mt-5 mb-3">Our Mission</h2>
      <p>
        At Learning Path, our mission is to empower individuals with the knowledge and skills they need to succeed. We believe that education should be accessible to everyone, regardless of their background or circumstances. Through our platform, we aim to create a supportive learning community where learners can discover new subjects, engage with expert tutors, and achieve their learning goals.
      </p>

      <h2 className="mt-5 mb-3">Contact Us</h2>
      <p>
        If you have any questions, feedback, or partnership inquiries, we'd love to hear from you. Feel free to reach out to our team at <a href="mailto:info@learningpath.com" className="text-light">info@learningpath.com</a> or through our social media channels:
      </p>
      <div className="d-flex">
        <a href="https://www.facebook.com/learningpath" target="_blank" rel="noopener noreferrer" className="me-3">
          <i className="bi bi-facebook text-light"></i>
        </a>
        <a href="https://www.twitter.com/learningpath" target="_blank" rel="noopener noreferrer" className="me-3">
          <i className="bi bi-twitter text-light"></i>
        </a>
        <a href="https://www.instagram.com/learningpath" target="_blank" rel="noopener noreferrer" className="me-3">
          <i className="bi bi-instagram text-light"></i>
        </a>
        <a href="https://www.linkedin.com/company/learningpath" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-linkedin text-light"></i>
        </a>
      </div>
    </div>
  );
};

export default About;

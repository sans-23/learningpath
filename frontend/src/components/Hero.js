import React from 'react';
import SignInButton from './SignInButton';

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto d-flex flex-column align-items-center">
            <h1 className="display-4">Welcome to Your Learning Path</h1>
            <p className="lead">Create and share custom learning paths to enhance your knowledge and track your progress.</p>
            <div className="mt-4">
              <SignInButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

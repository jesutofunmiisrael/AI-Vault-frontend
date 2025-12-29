
import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const handleRedirect = () => {
    const token = localStorage.getItem("token");
    return token ? "/dashboard" : "/signup";
  };

  return (
    <div className="container">
      <div className="sectionone">
        <h1>
          Create Amazing Content <br /> with <span className="ai">AI </span>{" "}
          <span className="magic">Magic</span>
        </h1>

        <p className="sectionone-child">
          Generate speech, images, and videos in seconds. Transform your ideas
          into <br /> reality with our powerful AI tools.
        </p>

        <Link to={handleRedirect()}>
          <button className="get">Get Started</button>
        </Link>
      </div>

      <div className="Generate">
        <div className="text">
          <h2>Text to Speech</h2>
          <p>
            Convert your text into natural-sounding speech with AI-powered voice
            synthesis
          </p>
        </div>

        <div className="videos">
          <h2>Generate Videos</h2>
          <p>
            Transform ideas into captivating videos with cutting-edge AI
            technology
          </p>
        </div>

        <div className="image">
          <h2>Generate Images</h2>
          <p>
            Create stunning visuals from text descriptions using advanced AI
            models
          </p>
        </div>
      </div>

      <div className="Ready">
        <h2>Ready to Create Something Amazing?</h2>
        <p>Join thousands of creators using AI to bring their ideas to life</p>

        <Link to={handleRedirect()}>
          <button className="start">Start Creating Now</button>
        </Link>
      </div>

      <footer className="footer">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="">Features</a>
          <a href="">Pricing</a>
          <a href="">Contact</a>
        </div>

        <div className="socials">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin-in"></i>
          <i className="fab fa-instagram"></i>
        </div>

        <p>&copy; 2025 AI Vault 🔥 . All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

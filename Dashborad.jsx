import { useState } from "react";



import "./Dashboardhome.css";

import TextToSpeech from "./Texttospeach";
import GenerateImage from "./Generateimage";
import Generatevideo from "./Generatevideo";


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tts");

  return (
    <>

      <div className="tools-wrapper">
   
        <div className="tools-tabs">
          <button
            className={activeTab === "tts" ? "tab active" : "tab"}
            onClick={() => setActiveTab("tts")}
          >
            🎤 Text to Speech
          </button>

          <button
            className={activeTab === "image" ? "tab active" : "tab"}
            onClick={() => setActiveTab("image")}
          >
            🖼 Generate Image
          </button>

          <button
            className={activeTab === "video" ? "tab active" : "tab"}
            onClick={() => setActiveTab("video")}
          >
            🎥 Generate Video
          </button>
        </div>

  
        {activeTab === "tts" && <TextToSpeech />}
        {activeTab === "image" && <GenerateImage />}
        {activeTab === "video" && <Generatevideo />}

        
      </div>

      
     <footer className="dash-footer">
      <div className="dash-footer-container">
        <div className="dash-footer-left">
          <h3>AI Vault 🔥</h3>
          <p>Empowering creators with AI tools for voice, image & video.</p>
        </div>

        <div className="dash-footer-links">
          <a href>Dashboard</a>
          <a href>Text-to-Speech</a>
          <a href="/">Home</a>
          <a href>Contact</a>
        </div>

        <div className="dash-footer-right">
          <p>© {new Date().getFullYear()} AI Vault. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Dashboard;

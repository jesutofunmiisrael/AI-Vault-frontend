

import { useState } from "react";
import { toast } from "sonner";
import "./generatevideo.css"

const GenerateVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }

    setLoading(true);
    setShowModal(true);   // SHOW modal
    setVideoUrl(null);
    const toastId = toast.loading("🎬 Generating your video...");

    try {
      const res = await fetch(
        `https://ai-vault-backend-diiu.onrender.com/api/Airouter/generatevideo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Video generation failed");
      }

      const data = await res.json();
      if (!data.success || !data.videoUrl) {
        throw new Error(data.message || "Video generation failed");
      }

      setVideoUrl(data.videoUrl);
      toast.success("✅ Video ready!", { id: toastId });

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
      setShowModal(false); // HIDE modal
    }
  };

  return (
    <div className="tool-card">

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Hang tight!</h2>
              <p>AI vault  is working hard 💪</p>
            </div>

            <div className="spinner"></div>

            <p className="modal-motivation">
              “Great things take time. Keep calm and wait for the magic ✨”
            </p>
          </div>
        </div>
      )}

      <h2>Generate Video</h2>

      <textarea
        placeholder="Describe the video you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          marginTop: "10px",
          resize: "vertical",
        }}
      />

      <button
        className="green-btn"
        onClick={handleGenerate}
        disabled={loading}
        style={{ marginTop: "12px" }}
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          autoPlay
          loop
          muted
          playsInline
          onError={() => {
            toast.error("Failed to load video");
            setVideoUrl(null);
          }}
          style={{ marginTop: "20px", width: "100%", borderRadius: "12px" }}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default GenerateVideo;


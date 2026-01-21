import { useState } from "react";
import { toast } from "sonner";

const GenerateVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }

    setLoading(true);
    setVideoUrl(null);
    const toastId = toast.loading("🎬 Generating your video...");

    try {
      const res = await fetch(`https://ai-vault-backend-diiu.onrender.comhttp://localhost:3007/api/Airouter/generatevideo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Make sure your backend expects this format
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ prompt }),
      });

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
    }
  };

  return (
    <div className="tool-card">
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




import { useState } from "react";
import { toast } from "sonner";
import "./generateimage.css"


const GenerateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setShowModal(true);   
    setError("");
    setImage(null);

    try {
      const res = await fetch(
        `https://ai-vault-backend-diiu.onrender.com/api/Airouter/generateimage`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setImage(`data:image/png;base64,${data.data.outputBase64}`);

      if (res.status === 201) {
        toast.success("IMAGE GENERATED SUCCESSFULLY!  ✅1️⃣");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      setShowModal(false); 
    }
  };

  return (
    <div className="tool-card">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Hang tight!</h2>
              <p>AI vault is working hard 💪</p>
            </div>

            <div className="spinner"></div>

            <p className="modal-motivation">
              “Great things take time. Keep calm and wait for the magic ✨”
            </p>
          </div>
        </div>
      )}

      <h3>Generate Image</h3>

      <textarea
        placeholder="Describe the image you want to create..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="generate-btn"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {image && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={image}
            alt="Generated"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </div>
      )}
    </div>
  );
};

export default GenerateImage;

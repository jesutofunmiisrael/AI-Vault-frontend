import { useState } from "react";
  import { toast } from "sonner";


const GenerateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setImage(null);

    try {
      const res = await fetch(`https://ai-vault-backend-diiu.onrender.com/api/Airouter/generateimage`, {
        method: "POST",
        headers: {
             authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),

      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }


      setImage(`data:image/png;base64,${data.data.outputBase64}`);

        if(res.status === 201){
        toast.success("IMAGE GENERATED SUCCESSFULLY!  ✅1️⃣");}
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-card">
      <h3>Generate Image</h3>

      <textarea
        placeholder="Describe the image you want to create..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button className="generate-btn" onClick={handleGenerate}>
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

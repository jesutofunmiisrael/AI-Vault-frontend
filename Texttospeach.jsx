


import { useState } from "react";
import { toast } from "sonner";
import "./Text.css"

const API_BASE = "https://ai-vault-backend-diiu.onrender.com";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 default voice (Female)
  const [voice, setVoice] = useState("shimmer");

  const handleGenerateSpeech = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setLoading(true);
    setAudioUrl("");

    try {
      const res = await fetch(`${API_BASE}/api/Airouter/generateSpeech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ text, voice }),  // 👈 send voice
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.file) {
        throw new Error(data.error || data.message || "Failed to generate speech");
      }

      const url = `${API_BASE}${data.file}`;
      setAudioUrl(url);

      toast.success("Speech generated successfully 🎧");
    } catch (err) {
      toast.error(err.message || "Error generating speech");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-card">
      <h2>Text to Speech</h2>

      {/* 👇 Voice Selector */}
      <label style={{ display: "block", marginBottom: 8 }}>Choose Voice</label>
      <select
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
        style={{ marginBottom: 16 }}
      >
        <option value="shimmer">Female — Shimmer</option>
        <option value="verse">Male — Verse</option>
        <option value="alloy">Neutral — Alloy</option>
        <option value="fable">Soft — Fable</option>
        <option value="onyx">Deep Male — Onyx</option>
      </select>

      <textarea
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
      />

      <button className="green-btn" onClick={handleGenerateSpeech} disabled={loading}>
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="spinner" />
            Generating...
          </span>
        ) : (
          "Generate Speech"
        )}
      </button>

      {audioUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>Generated Speech:</h3>

          <audio key={audioUrl} controls preload="auto">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support audio.
          </audio>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;


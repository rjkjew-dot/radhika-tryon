"use client";

import React, { useState } from "react";

const JEWELRY_TYPES = [
  "Necklace",
  "Ring (Ladies)",
  "Ring (Gents)",
  "Earrings",
  "Bangles/Bracelet",
  "Pendant Set",
];

const THEMES = [
  { id: "Plain Studio", name: "1. Plain Studio Catalog", desc: "Clean white catalog shot", bg: "linear-gradient(135deg, #f5f5f7, #e5e5ea)" },
  { id: "Linen Napkin", name: "2. Linen Napkin", desc: "Soft textured natural luxury cloth", bg: "linear-gradient(135deg, #e8dfd8, #d4c5b9)" },
  { id: "Rustic Dark Wood", name: "3. Rustic Dark Wood", desc: "Polished dark walnut wood timber", bg: "linear-gradient(135deg, #3d271d, #1f140e)" },
  { id: "Modern Slate Stone", name: "4. Modern Slate Stone", desc: "Matte black luxury stone slab", bg: "linear-gradient(135deg, #232526, #111215)" },
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState("Necklace");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) setUnlocked(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageFile(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAll = () => {
    if (!imageFile) {
      alert("મહેરબાની કરીને પહેલાં ઘરેણાંનો ફોટો અપલોડ કરો!");
      return;
    }

    setLoading(true);
    setShowResults(false);

    setTimeout(() => {
      setShowResults(true);
      setLoading(false);
    }, 1500);
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0b0d", color: "#f7e7ce", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ background: "#16161a", padding: "40px", borderRadius: "16px", border: "1px solid #d4af37", textAlign: "center", maxWidth: "400px", width: "90%", boxShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
          <h1 style={{ color: "#e8c872", letterSpacing: "2px", margin: "0 0 10px 0", fontSize: "24px" }}>RADHIKA JEWELLERS</h1>
          <p style={{ color: "#888", fontSize: "12px", marginBottom: "25px", letterSpacing: "1px" }}>AI STUDIO ACCESS</p>
          <form onSubmit={handleUnlock}>
            <input
              type="password"
              placeholder="Enter Staff Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#222", border: "1px solid #444", color: "#fff", textAlign: "center", marginBottom: "15px", boxSizing: "border-box" }}
            />
            <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "linear-gradient(135deg, #d4af37, #aa820a)", border: "none", color: "#000", fontWeight: "bold", cursor: "pointer" }}>
              Unlock Studio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0b0b0d", color: "#e5e5e5", fontFamily: "sans-serif", padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222", paddingBottom: "15px", maxWidth: "1300px", margin: "0 auto 30px auto" }}>
        <div>
          <h1 style={{ color: "#e8c872", margin: 0, fontSize: "22px", letterSpacing: "1.5px" }}>RADHIKA JEWELLERS</h1>
          <span style={{ fontSize: "11px", color: "#888", letterSpacing: "1px" }}>AI 4-THEME CATALOG & 360° STUDIO</span>
        </div>
        <button onClick={() => setUnlocked(false)} style={{ background: "#222", border: "1px solid #444", color: "#aaa", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
          Lock
        </button>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "330px 1fr", gap: "25px", maxWidth: "1300px", margin: "0 auto" }}>
        
        {/* Left Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "#141417", padding: "20px", borderRadius: "12px", border: "1px solid #26262b" }}>
            <h3 style={{ color: "#e8c872", fontSize: "14px", margin: "0 0 12px 0" }}>1. UPLOAD JEWELLERY</h3>
            <label style={{ border: "2px dashed #444", borderRadius: "8px", padding: "25px", display: "block", textAlign: "center", cursor: "pointer", background: "#0e0e11" }}>
              {imageFile ? (
                <span style={{ color: "#4ade80", fontSize: "13px" }}>✓ ફોટો અપલોડ થઈ ગયો</span>
              ) : (
                <span style={{ color: "#aaa", fontSize: "13px" }}>ઘરેણાંનો ફોટો અહીં અપલોડ કરો</span>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
            </label>
          </div>

          <div style={{ background: "#141417", padding: "20px", borderRadius: "12px", border: "1px solid #26262b" }}>
            <h3 style={{ color: "#e8c872", fontSize: "14px", margin: "0 0 12px 0" }}>2. CATEGORY</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {JEWELRY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  style={{
                    padding: "9px",
                    borderRadius: "6px",
                    border: selectedType === type ? "1px solid #d4af37" : "1px solid #2a2a30",
                    background: selectedType === type ? "#2a2415" : "#1b1b20",
                    color: selectedType === type ? "#e8c872" : "#aaa",
                    cursor: "pointer",
                    fontSize: "12px",
                    textAlign: "left",
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateAll}
            disabled={loading}
            style={{
              padding: "16px",
              borderRadius: "10px",
              background: loading ? "#555" : "linear-gradient(135deg, #d4af37, #aa820a)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "ચારેય થીમ બની રહી છે..." : "Generate All 4 Themes + 360°"}
          </button>
        </div>

        {/* Right Side Results */}
        <div style={{ background: "#141417", borderRadius: "12px", border: "1px solid #26262b", padding: "20px" }}>
          <h3 style={{ color: "#e8c872", fontSize: "15px", margin: "0 0 20px 0" }}>ALL 4 LUXURY THEMES & 360° VIDEO</h3>
          
          {loading ? (
            <div style={{ minHeight: "450px", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8c872", fontSize: "15px" }}>
              ચારેય લક્ઝરી થીમ્સ અને 360° વિડીયો બની રહ્યા છે...
            </div>
          ) : showResults && imageFile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* 4 Themes Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                {THEMES.map((theme) => (
                  <div key={theme.id} style={{ background: "#0e0e11", borderRadius: "8px", border: "1px solid #333", overflow: "hidden", padding: "12px" }}>
                    <div style={{ color: "#e8c872", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
                      {theme.name}
                    </div>
                    <div style={{ color: "#777", fontSize: "10px", marginBottom: "8px" }}>
                      {theme.desc}
                    </div>
                    <div style={{ background: theme.bg, borderRadius: "6px", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
                      <img
                        src={imageFile}
                        alt={theme.name}
                        style={{ maxHeight: "180px", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.4))" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* 360 Video */}
              <div style={{ background: "#0e0e11", borderRadius: "8px", border: "1px solid #d4af37", padding: "15px" }}>
                <div style={{ color: "#e8c872", fontSize: "13px", fontWeight: "bold", marginBottom: "10px" }}>
                  5. 360° Motorized Turntable Video Spin
                </div>
                <video
                  src="https://assets.mixkit.co/videos/preview/mixkit-rotating-display-of-a-golden-ring-41269-large.mp4"
                  controls
                  autoPlay
                  loop
                  muted
                  style={{ width: "100%", maxHeight: "280px", borderRadius: "6px", background: "#000" }}
                />
              </div>

            </div>
          ) : (
            <div style={{ minHeight: "450px", border: "1px dashed #333", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#666" }}>
              <p style={{ margin: 0, fontSize: "14px" }}>ચારેય થીમના ફોટા અને 360° વિડીયો અહીં એકસાથે જોવા મળશે.</p>
              <p style={{ fontSize: "12px", color: "#444", marginTop: "8px" }}>ડાબી બાજુથી ફોટો અપલોડ કરીને બટન દબાવો.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

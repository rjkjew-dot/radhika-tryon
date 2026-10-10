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
  {
    id: "plain-studio",
    name: "1. Plain Studio Catalog",
    desc: "Clean seamless studio backdrop, crisp gold reflections",
    bg: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "linen-napkin",
    name: "2. Linen Napkin Shoot",
    desc: "Folded natural cream linen fabric with soft organic shadow",
    bg: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rustic-wood",
    name: "3. Rustic Dark Wood",
    desc: "Dark walnut wood surface with warm directional rim lighting",
    bg: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "slate-stone",
    name: "4. Modern Slate Stone",
    desc: "Matte black architectural stone slab with luxury contrast",
    bg: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80"
  },
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState("Necklace");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

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

  const handleGenerate = () => {
    if (!imageFile) {
      alert("પહેલાં ઘરેણાંનો ફોટો અપલોડ કરો!");
      return;
    }
    setLoading(true);
    setIsReady(false);

    setTimeout(() => {
      setLoading(false);
      setIsReady(true);
    }, 1800);
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
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222", paddingBottom: "15px", maxWidth: "1350px", margin: "0 auto 30px auto" }}>
        <div>
          <h1 style={{ color: "#e8c872", margin: 0, fontSize: "22px", letterSpacing: "1.5px" }}>RADHIKA JEWELLERS</h1>
          <span style={{ fontSize: "11px", color: "#888", letterSpacing: "1px" }}>AI LUXURY CATALOG SHOOT & 360° MOTION STUDIO</span>
        </div>
        <button onClick={() => setUnlocked(false)} style={{ background: "#222", border: "1px solid #444", color: "#aaa", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
          Lock
        </button>
      </header>

      {/* Grid Workspace */}
      <div style={{ display: "grid", gridTemplateColumns: "330px 1fr", gap: "25px", maxWidth: "1350px", margin: "0 auto" }}>
        
        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ background: "#141417", padding: "20px", borderRadius: "12px", border: "1px solid #26262b" }}>
            <h3 style={{ color: "#e8c872", fontSize: "14px", margin: "0 0 12px 0" }}>1. UPLOAD JEWELLERY</h3>
            <label style={{ border: "2px dashed #444", borderRadius: "8px", padding: "25px", display: "block", textAlign: "center", cursor: "pointer", background: "#0e0e11" }}>
              {imageFile ? (
                <div>
                  <img src={imageFile} alt="Uploaded" style={{ maxHeight: "120px", maxWidth: "100%", borderRadius: "6px", marginBottom: "8px" }} />
                  <span style={{ color: "#4ade80", fontSize: "12px", display: "block" }}>✓ ફોટો અપલોડ થયેલ છે (બદલવા ક્લિક કરો)</span>
                </div>
              ) : (
                <span style={{ color: "#aaa", fontSize: "13px" }}>ઘરેણાંનો ક્લિયર ફોટો અપલોડ કરો</span>
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
            onClick={handleGenerate}
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
            {loading ? "AI શૂટ અને 360° વિડીયો બની રહ્યો છે..." : "Generate 4 Shoot Themes + 360°"}
          </button>
        </div>

        {/* Results Showcase */}
        <div style={{ background: "#141417", borderRadius: "12px", border: "1px solid #26262b", padding: "20px" }}>
          <h3 style={{ color: "#e8c872", fontSize: "15px", margin: "0 0 20px 0" }}>
            AI PRODUCT SHOOTS & 360° MOTORIZED PRESENTATION
          </h3>

          {loading ? (
            <div style={{ minHeight: "480px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#e8c872", fontSize: "15px", gap: "10px" }}>
              <div style={{ border: "3px solid #333", borderTop: "3px solid #d4af37", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite" }} />
              <span>ચાર રિયાલિસ્ટિક બેકગ્રાઉન્ડ શૂટ્સ અને ૩૬૦° વીડિયો જનરેટ થઈ રહ્યા છે...</span>
            </div>
          ) : isReady && imageFile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* 4 Themes Photorealistic Shoots */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "16px" }}>
                {THEMES.map((theme) => (
                  <div key={theme.id} style={{ background: "#0e0e11", borderRadius: "8px", border: "1px solid #333", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "10px 12px 6px 12px" }}>
                      <div style={{ color: "#e8c872", fontSize: "12px", fontWeight: "bold" }}>{theme.name}</div>
                      <div style={{ color: "#777", fontSize: "10px", marginTop: "2px" }}>{theme.desc}</div>
                    </div>
                    {/* Realistic Composite Stage */}
                    <div
                      style={{
                        position: "relative",
                        height: "240px",
                        backgroundImage: `url(${theme.bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                      }}
                    >
                      {/* Shadow & Jewelry overlay */}
                      <img
                        src={imageFile}
                        alt={theme.name}
                        style={{
                          maxHeight: "170px",
                          maxWidth: "85%",
                          objectFit: "contain",
                          filter: "drop-shadow(0px 18px 22px rgba(0, 0, 0, 0.75)) drop-shadow(0px 4px 6px rgba(0,0,0,0.5))",
                          transform: "scale(1.02)",
                          transition: "transform 0.3s ease"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* 360 Video Spin Section */}
              <div style={{ background: "#0e0e11", borderRadius: "8px", border: "1px solid #d4af37", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <span style={{ color: "#e8c872", fontSize: "14px", fontWeight: "bold" }}>
                      5. 360° Motorized Turntable Rotation Video
                    </span>
                    <p style={{ color: "#888", fontSize: "11px", margin: "3px 0 0 0" }}>
                      લક્ઝરી શોકેસ માટે ઘરેણાંનું ૩૬૦° સ્મૂધ રોટેશન
                    </p>
                  </div>
                  <span style={{ background: "#2a2415", border: "1px solid #d4af37", color: "#e8c872", fontSize: "11px", padding: "3px 8px", borderRadius: "4px" }}>
                    360° SPIN ACTIVE
                  </span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "center", background: "#000", borderRadius: "8px", overflow: "hidden" }}>
                  <video
                    src="https://cdn.pixabay.com/video/2020/05/25/40149-425263665_large.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", maxHeight: "340px", objectFit: "cover" }}
                  />
                </div>
              </div>

            </div>
          ) : (
            <div style={{ minHeight: "480px", border: "1px dashed #333", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#666" }}>
              <p style={{ margin: 0, fontSize: "14px" }}>ચારેય લક્ઝરી શૂટ અને ૩૬૦° રોટેટિંગ વિડીયો અહીં જોવા મળશે.</p>
              <p style={{ fontSize: "12px", color: "#444", marginTop: "8px" }}>ડાબી બાજુથી ઘરેણાંનો ફોટો અપલોડ કરીને બટન દબાવો.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

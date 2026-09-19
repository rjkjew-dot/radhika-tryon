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
  { id: "Plain Studio Catalog", name: "Plain Studio Catalog", desc: "Clean white background, sharp commercial catalog shot" },
  { id: "Linen Napkin", name: "Linen Napkin", desc: "Soft textured natural cream linen cloth, gentle shadows" },
  { id: "Rustic Dark Wood", name: "Rustic Dark Wood", desc: "Polished dark walnut timber, warm directional studio light" },
  { id: "Modern Slate Stone", name: "Modern Slate Stone", desc: "Matte black architectural stone pedestal, crisp luxury highlights" },
  { id: "360 Video Spin (Motion)", name: "360° Video Spin", desc: "Smooth motorized rotating presentation on turntable" },
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState("Necklace");
  const [selectedTheme, setSelectedTheme] = useState("Plain Studio Catalog");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222", paddingBottom: "15px", maxWidth: "1200px", margin: "0 auto 30px auto" }}>
        <div>
          <h1 style={{ color: "#e8c872", margin: 0, fontSize: "22px", letterSpacing: "1.5px" }}>RADHIKA JEWELLERS</h1>
          <span style={{ fontSize: "11px", color: "#888", letterSpacing: "1px" }}>AI TRY-ON & CATALOG STUDIO</span>
        </div>
        <button onClick={() => setUnlocked(false)} style={{ background: "#222", border: "1px solid #444", color: "#aaa", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
          Lock
        </button>
      </header>

      {/* Main Studio Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Left Side Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Step 1: Upload */}
          <div style={{ background: "#141417", padding: "20px", borderRadius: "12px", border: "1px solid #26262b" }}>
            <h3 style={{ color: "#e8c872", fontSize: "14px", margin: "0 0 12px 0", letterSpacing: "0.5px" }}>1. JEWELLERY PHOTO</h3>
            <label style={{ border: "2px dashed #444", borderRadius: "8px", padding: "30px", display: "block", textAlign: "center", cursor: "pointer", background: "#0e0e11" }}>
              {imageFile ? (
                <span style={{ color: "#4ade80", fontSize: "13px" }}>✓ ફોટો સિલેક્ટ થઈ ગયો છે</span>
              ) : (
                <span style={{ color: "#aaa", fontSize: "13px" }}>ઘરેણાંનો ફોટો અહીં અપલોડ કરો (PNG/JPG)</span>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
            </label>
          </div>

          {/* Step 2: Jewelry Type */}
          <div style={{ background: "#141417", padding: "20px", borderRadius: "12px", border: "1px solid #26262b" }}>
            <h3 style={{ color: "#e8c872", fontSize: "14px", margin: "0 0 12px 0", letterSpacing: "0.5px" }}>2. JEWELLERY TYPE</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {JEWELRY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: selectedType === type ? "1px solid #d4af37" : "1px solid #2a2a30",
                    background: selectedType === type ? "#2a2415" : "#1b1b20",
                    color: selectedType === type ? "#e8c872" : "#aaa",
                    cursor: "pointer",
                    fontSize: "12px",
                    textAlign: "left"
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Themes & 360 Video */}
          <div style={{ background: "#141417", padding: "20px", borderRadius: "12px", border: "1px solid #26262b" }}>
            <h3 style={{ color: "#e8c872", fontSize: "14px", margin: "0 0 12px 0", letterSpacing: "0.5px" }}>3. CHOOSE STYLE / 360° VIDEO</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {THEMES.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: selectedTheme === theme.id ? "1px solid #d4af37" : "1px solid #2a2a30",
                    background: selectedTheme === theme.id ? "#2a2415" : "#1b1b20",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ color: selectedTheme === theme.id ? "#e8c872" : "#eee", fontWeight: "bold", fontSize: "13px" }}>
                    {theme.name}
                  </div>
                  <div style={{ color: "#777", fontSize: "11px", marginTop: "4px" }}>
                    {theme.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => alert("જનરેટ થઈ રહ્યું છે...")}
            style={{
              padding: "16px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #d4af37, #aa820a)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: "pointer",
              letterSpacing: "0.5px"
            }}
          >
            {selectedTheme === "360 Video Spin (Motion)" ? "Generate 360° Video" : "Generate Photo"}
          </button>
        </div>

        {/* Right Side: Output Result Box */}
        <div style={{ background: "#141417", borderRadius: "12px", border: "1px solid #26262b", padding: "20px", display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "#e8c872", fontSize: "14px", margin: "0 0 15px 0" }}>RESULT</h3>
          <div style={{ flex: 1, minHeight: "450px", background: "#0c0c0e", borderRadius: "8px", border: "1px dashed #333", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#666", padding: "20px", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: "14px" }}>જનરેટ થયેલ ફોટો અથવા ૩૬૦° વીડિયો અહીં જોવા મળશે.</p>
            <p style={{ fontSize: "12px", color: "#444", marginTop: "8px" }}>ડાબી બાજુથી ફોટો અને થીમ પસંદ કરીને બટન દબાવો.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

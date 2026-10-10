"use client";

import React, { useState } from "react";

const JEWELRY_TYPES = [
  "Bridal Set / Har",
  "Necklace Set",
  "Choker / Hasli",
  "Earrings / Jhumka",
  "Bangles / Kangan",
  "Rings (Couple / Bridal)",
];

const THEMES = [
  {
    id: "monica-catalog",
    name: "1. Monica Style Pure Catalog",
    tag: "High E-Commerce Standard",
    desc: "Seamless off-white backdrop, soft diffused contact shadow, crisp gold edges",
    bg: "#f8f8fa",
    shadow: "0 18px 25px -5px rgba(0,0,0,0.22), 0 8px 10px -6px rgba(0,0,0,0.15)",
  },
  {
    id: "silk-bridal",
    name: "2. Bridal Silk Cushion Shoot",
    tag: "Bridal Showcase",
    desc: "Soft folded luxury warm ivory silk texture for bridal sets",
    bg: "#f3ede3",
    shadow: "0 22px 30px -8px rgba(85,55,25,0.35), 0 8px 12px -4px rgba(85,55,25,0.25)",
  },
  {
    id: "walnut-heritage",
    name: "3. Antique Heritage Wood Base",
    tag: "Royal Kundan / Gold",
    desc: "Polished dark espresso timber pedestal with warm directional spotlight",
    bg: "#1c140e",
    shadow: "0 25px 35px -5px rgba(0,0,0,0.9), 0 10px 15px -5px rgba(0,0,0,0.8)",
  },
  {
    id: "matte-slate",
    name: "4. Modern Matte Black Slate",
    tag: "Diamond & Polki",
    desc: "Architectural dark stone backdrop with brilliant metallic specular pop",
    bg: "#121316",
    shadow: "0 25px 40px -5px rgba(0,0,0,0.95), 0 8px 12px -4px rgba(0,0,0,0.85)",
  },
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState("Bridal Set / Har");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

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
      alert("Pehla tamara bridal set no photo upload karo!");
      return;
    }
    setLoading(true);
    setReady(false);

    setTimeout(() => {
      setLoading(false);
      setReady(true);
    }, 1200);
  };

  // Direct Mobile Gallery Download Function
  const downloadToGallery = (themeName: string) => {
    if (!imageFile) return;
    const link = document.createElement("a");
    link.href = imageFile;
    link.download = `Radhika-Jewellers-${themeName.replace(/\s+/g, "-")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#09090b", color: "#f7e7ce", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ background: "#141418", padding: "40px", borderRadius: "16px", border: "1px solid #d4af37", textAlign: "center", maxWidth: "400px", width: "90%", boxShadow: "0 20px 45px rgba(0,0,0,0.85)" }}>
          <h1 style={{ color: "#e8c872", letterSpacing: "2px", margin: "0 0 6px 0", fontSize: "22px" }}>RADHIKA JEWELLERS</h1>
          <p style={{ color: "#777", fontSize: "11px", marginBottom: "25px", letterSpacing: "1.5px" }}>BRIDAL CATALOG STUDIO</p>
          <form onSubmit={handleUnlock}>
            <input
              type="password"
              placeholder="Staff Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#1f1f26", border: "1px solid #333", color: "#fff", textAlign: "center", marginBottom: "15px", boxSizing: "border-box" }}
            />
            <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "linear-gradient(135deg, #d4af37, #997400)", border: "none", color: "#000", fontWeight: "bold", cursor: "pointer" }}>
              Access Studio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#09090b", color: "#e5e5e5", fontFamily: "system-ui, sans-serif", padding: "20px 25px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e1e24", paddingBottom: "15px", maxWidth: "1450px", margin: "0 auto 25px auto" }}>
        <div>
          <h1 style={{ color: "#e8c872", margin: 0, fontSize: "22px", letterSpacing: "1.5px" }}>RADHIKA JEWELLERS</h1>
          <span style={{ fontSize: "11px", color: "#777", letterSpacing: "1px" }}>BRIDAL E-COMMERCE CATALOG & MOBILE GALLERY DOWNLOAD</span>
        </div>
        <button onClick={() => setUnlocked(false)} style={{ background: "#17171d", border: "1px solid #333", color: "#aaa", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
          Lock
        </button>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "25px", maxWidth: "1450px", margin: "0 auto" }}>
        
        {/* Left Side Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ background: "#131317", padding: "20px", borderRadius: "12px", border: "1px solid #22222a" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 12px 0" }}>1. UPLOAD BRIDAL SET PHOTO</h3>
            <label style={{ border: "2px dashed #3a3a46", borderRadius: "8px", padding: "25px", display: "block", textAlign: "center", cursor: "pointer", background: "#0b0b0e" }}>
              {imageFile ? (
                <div>
                  <img src={imageFile} alt="Set" style={{ maxHeight: "150px", maxWidth: "100%", borderRadius: "6px", marginBottom: "8px", objectFit: "contain" }} />
                  <span style={{ color: "#4ade80", fontSize: "12px", display: "block" }}>✓ Bridal Set Uploaded</span>
                </div>
              ) : (
                <div>
                  <span style={{ color: "#ccc", fontSize: "13px", display: "block", marginBottom: "4px" }}>Bridal Set / Jewellery Photo</span>
                  <span style={{ color: "#666", fontSize: "11px" }}>Mobile camera photo works</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
            </label>
          </div>

          <div style={{ background: "#131317", padding: "20px", borderRadius: "12px", border: "1px solid #22222a" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 12px 0" }}>2. BRIDAL CATEGORY</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {JEWELRY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  style={{
                    padding: "9px 8px",
                    borderRadius: "6px",
                    border: selectedType === type ? "1px solid #d4af37" : "1px solid #282832",
                    background: selectedType === type ? "#262112" : "#18181f",
                    color: selectedType === type ? "#e8c872" : "#aaa",
                    cursor: "pointer",
                    fontSize: "11px",
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
              background: loading ? "#444" : "linear-gradient(135deg, #d4af37, #aa820a)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 15px rgba(212,175,55,0.25)"
            }}
          >
            {loading ? "Catalog Processing..." : "Generate Monica-Style 4 Themes + 360°"}
          </button>
        </div>

        {/* Right Gallery Showcase */}
        <div style={{ background: "#131317", borderRadius: "12px", border: "1px solid #22222a", padding: "22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ color: "#e8c872", fontSize: "16px", margin: 0 }}>
                E-COMMERCE CATALOG SHOWCASE (SAVE TO MOBILE GALLERY)
              </h3>
              <p style={{ color: "#777", fontSize: "11px", margin: "4px 0 0 0" }}>
                Niche aapele "Save to Gallery" button dabavine direct mobile ma photo save kari shako chho
              </p>
            </div>
            {ready && (
              <span style={{ color: "#4ade80", fontSize: "11px", background: "#142c1b", border: "1px solid #21512d", padding: "4px 10px", borderRadius: "6px" }}>
                ✓ 4 Themes Ready To Save
              </span>
            )}
          </div>

          {loading ? (
            <div style={{ minHeight: "480px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#e8c872", fontSize: "14px", gap: "12px" }}>
              <div style={{ border: "3px solid #2a2a35", borderTop: "3px solid #d4af37", borderRadius: "50%", width: "42px", height: "42px", animation: "spin 1s linear infinite" }} />
              <span>Monica Style Catalog shoots bani rahya chhe...</span>
            </div>
          ) : ready && imageFile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* 4 Theme Cards With Save to Phone Gallery Button */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                {THEMES.map((theme) => (
                  <div key={theme.id} style={{ background: "#0b0b0e", borderRadius: "10px", border: "1px solid #25252f", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    
                    <div style={{ padding: "10px 12px", borderBottom: "1px solid #1a1a22" }}>
                      <div style={{ color: "#e8c872", fontSize: "12px", fontWeight: "bold" }}>{theme.name}</div>
                      <div style={{ color: "#777", fontSize: "10px" }}>{theme.tag}</div>
                    </div>

                    <div
                      style={{
                        position: "relative",
                        height: "240px",
                        backgroundColor: theme.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "15px",
                        overflow: "hidden"
                      }}
                    >
                      <img
                        src={imageFile}
                        alt={theme.name}
                        style={{
                          maxHeight: "190px",
                          maxWidth: "90%",
                          objectFit: "contain",
                          filter: `drop-shadow(${theme.shadow}) contrast(1.05) brightness(1.02)`,
                          transform: `scale(${zoomLevel})`,
                          transition: "transform 0.2s ease",
                          zIndex: 2,
                        }}
                      />
                    </div>

                    {/* Direct Save to Mobile Button */}
                    <div style={{ padding: "10px", background: "#111116", borderTop: "1px solid #1c1c24" }}>
                      <button
                        onClick={() => downloadToGallery(theme.name)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "6px",
                          background: "#262112",
                          border: "1px solid #d4af37",
                          color: "#e8c872",
                          fontSize: "11px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px"
                        }}
                      >
                        📥 Save to Gallery (Phone)
                      </button>
                    </div>
                  </div>
                ))}

"use client";

import React, { useState } from "react";

const JEWELRY_TYPES = [
  "Necklace / Har",
  "Ring (Ladies)",
  "Ring (Gents)",
  "Earrings / Jhumka",
  "Bangles / Kangan",
  "Pendant Set",
];

const THEMES = [
  {
    id: "white-studio",
    name: "1. Pure White Mirror Studio",
    tag: "E-Commerce Catalog",
    desc: "Seamless white acrylic base with subtle glossy reflection for official app catalog",
    bgStyle: {
      background: "radial-gradient(circle at 50% 40%, #ffffff 0%, #ebebeb 70%, #dcdcdc 100%)",
      boxShadow: "inset 0 0 40px rgba(0,0,0,0.06)",
    },
    reflection: true,
  },
  {
    id: "silk-cushion",
    name: "2. Raw Silk & Velvet Drape",
    tag: "Bridal & Traditional",
    desc: "Soft folded ivory raw silk cloth with warm ambient studio lighting",
    bgStyle: {
      background: "radial-gradient(circle at 30% 30%, #f7f1e5 0%, #e2d4be 60%, #c4b094 100%)",
      boxShadow: "inset 0 0 60px rgba(0,0,0,0.15)",
    },
    reflection: false,
  },
  {
    id: "walnut-wood",
    name: "3. Royal Dark Walnut Timber",
    tag: "Heritage Showcase",
    desc: "Deep espresso wood texture base with warm golden rim spotlight",
    bgStyle: {
      background: "radial-gradient(circle at 60% 40%, #3d2214 0%, #201109 70%, #0d0704 100%)",
      boxShadow: "inset 0 0 50px rgba(0,0,0,0.5)",
    },
    reflection: false,
  },
  {
    id: "black-slate",
    name: "4. Matte Black Marble Slab",
    tag: "High Jewelry & Diamond",
    desc: "Luxury architectural black stone pedestal with sharp diamond highlights",
    bgStyle: {
      background: "radial-gradient(circle at 50% 30%, #2c2d30 0%, #151618 70%, #08090a 100%)",
      boxShadow: "inset 0 0 60px rgba(0,0,0,0.8)",
    },
    reflection: true,
  },
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState("Necklace / Har");
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

  const handleGenerateAll = () => {
    if (!imageFile) {
      alert("મહેરબાની કરીને પહેલા ઘરેણાંનો ફોટો અપલોડ કરો!");
      return;
    }
    setLoading(true);
    setIsReady(false);

    setTimeout(() => {
      setLoading(false);
      setIsReady(true);
    }, 1500);
  };

  const handleDownload = (themeName: string) => {
    alert(`${themeName} નો HD ફોટો તમારી એપ્લિકેશન માટે ડાઉનલોડ થઈ રહ્યો છે...`);
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#08080a", color: "#f7e7ce", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ background: "#121215", padding: "40px", borderRadius: "16px", border: "1px solid #d4af37", textAlign: "center", maxWidth: "400px", width: "90%", boxShadow: "0 15px 40px rgba(0,0,0,0.9)" }}>
          <h1 style={{ color: "#e8c872", letterSpacing: "2px", margin: "0 0 8px 0", fontSize: "22px" }}>RADHIKA JEWELLERS</h1>
          <p style={{ color: "#888", fontSize: "11px", marginBottom: "25px", letterSpacing: "1.5px" }}>STORE CATALOG CREATOR STUDIO</p>
          <form onSubmit={handleUnlock}>
            <input
              type="password"
              placeholder="Staff Passcode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#1c1c22", border: "1px solid #333", color: "#fff", textAlign: "center", marginBottom: "15px", boxSizing: "border-box" }}
            />
            <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "linear-gradient(135deg, #d4af37, #997400)", border: "none", color: "#000", fontWeight: "bold", cursor: "pointer", letterSpacing: "0.5px" }}>
              Open Studio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#08080a", color: "#e5e5e5", fontFamily: "system-ui, sans-serif", padding: "20px 25px" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1f1f26", paddingBottom: "15px", maxWidth: "1400px", margin: "0 auto 25px auto" }}>
        <div>
          <h1 style={{ color: "#e8c872", margin: 0, fontSize: "22px", letterSpacing: "1px" }}>RADHIKA JEWELLERS</h1>
          <span style={{ fontSize: "11px", color: "#777", letterSpacing: "1px" }}>PRODUCT CATALOG & 360° STORE STUDIO</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setUnlocked(false)} style={{ background: "#16161c", border: "1px solid #333", color: "#999", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Studio Work Area */}
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "25px", maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* Left Toolbar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ background: "#121216", padding: "20px", borderRadius: "12px", border: "1px solid #202026" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 12px 0", letterSpacing: "0.5px" }}>1. JEWELLERY PHOTO (SOURCE)</h3>
            <label style={{ border: "2px dashed #3a3a46", borderRadius: "8px", padding: "25px", display: "block", textAlign: "center", cursor: "pointer", background: "#0a0a0d" }}>
              {imageFile ? (
                <div>
                  <img src={imageFile} alt="Jewellery" style={{ maxHeight: "140px", maxWidth: "100%", borderRadius: "6px", marginBottom: "8px", objectFit: "contain" }} />
                  <span style={{ color: "#4ade80", fontSize: "12px", display: "block" }}>✓ ફોટો અપલોડ થયેલ છે</span>
                </div>
              ) : (
                <div>
                  <span style={{ color: "#bbb", fontSize: "13px", display: "block", marginBottom: "4px" }}>ઘરેણાંનો અસલી ફોટો અપલોડ કરો</span>
                  <span style={{ color: "#666", fontSize: "11px" }}>મોબાઇલ કે કેમેરાથી લીધેલો ફોટો ચાલે</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
            </label>
          </div>

          <div style={{ background: "#121216", padding: "20px", borderRadius: "12px", border: "1px solid #202026" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 12px 0", letterSpacing: "0.5px" }}>2. JEWELLERY CATEGORY</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {JEWELRY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  style={{
                    padding: "9px 10px",
                    borderRadius: "6px",
                    border: selectedType === type ? "1px solid #d4af37" : "1px solid #282832",
                    background: selectedType === type ? "#262112" : "#17171d",
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
              background: loading ? "#444" : "linear-gradient(135deg, #d4af37, #aa820a)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.5px",
              boxShadow: "0 4px 15px rgba(212,175,55,0.25)"
            }}
          >
            {loading ? "શૂટ તૈયાર થઈ રહ્યું છે..." : "Create All 4 Shoots + 360° Video"}
          </button>
        </div>

        {/* Right Product Catalog Showcase */}
        <div style={{ background: "#121216", borderRadius: "12px", border: "1px solid #202026", padding: "22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h3 style={{ color: "#e8c872", fontSize: "16px", margin: 0 }}>STORE CATALOG READY PHOTOS (4 LUXURY SHOOTS)</h3>
              <p style={{ color: "#777", fontSize: "11px", margin: "4px 0 0 0" }}>આ ફોટા સીધા એપમાં પ્રોડક્ટ લિસ્ટિંગ માટે વાપરી શકો છો</p>
            </div>
            {isReady && (
              <span style={{ color: "#4ade80", fontSize: "12px", background: "#132b1a", border: "1px solid #1f512c", padding: "4px 10px", borderRadius: "6px" }}>
                ✓ 4 HD Pics & Video Ready
              </span>
            )}
          </div>

          {loading ? (
            <div style={{ minHeight: "480px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#e8c872", fontSize: "14px", gap: "12px" }}>
              <div style={{ border: "3px solid #2a2a35", borderTop: "3px solid #d4af37", borderRadius: "50%", width: "42px", height: "42px", animation: "spin 1s linear infinite" }} />
              <span>તમારી જ્વેલરી માટે 4 અલગ અલગ લક્ઝરી શૂટ અને 360° વિડીયો બની રહ્યો છે...</span>
            </div>
          ) : isReady && imageFile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* 4 Themes Photorealistic Shoots */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                {THEMES.map((theme) => (
                  <div key={theme.id} style={{ background: "#0a0a0d", borderRadius: "10px", border: "1px solid #24242e", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    
                    <div style={{ padding: "10px 12px", borderBottom: "1px solid #1a1a22", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ color: "#e8c872", fontSize: "12px", fontWeight: "bold" }}>{theme.name}</div>
                        <div style={{ color: "#777", fontSize: "10px" }}>{theme.tag}</div>
                      </div>
                      <button
                        onClick={() => handleDownload(theme.name)}
                        style={{ background: "#1c1c24", border: "1px solid #333", color: "#ccc", borderRadius: "4px", padding: "3px 8px", fontSize: "10px", cursor: "pointer" }}
                      >
                        Save Pic
                      </button>
                    </div>

                    {/* Realistic Product Stage */}
                    <div
                      style={{
                        position: "relative",
                        height: "250px",
                        ...theme.bgStyle,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                      }}
                    >
                      {/* Realistic Jewelry Shadow & Surface Lighting */}
                      <img
                        src={imageFile}
                        alt={theme.name}
                        style={{
                          maxHeight: "175px",
                          maxWidth: "85%",
                          objectFit: "contain",
                          filter: "drop-shadow(0px 20px 22px rgba(0, 0, 0, 0.7)) drop-shadow(0px 6px 8px rgba(0, 0, 0, 0.45))",
                          zIndex: 2,
                        }}
                      />
                      
                      {/* Subtle Reflection Effect */}
                      {theme.reflection && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: "15px",
                            height: "50px",
                            width: "70%",
                            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)",
                            zIndex: 1,
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 360 Video Spin Section */}
              <div style={{ background: "#0a0a0d", borderRadius: "10px", border: "1px solid #d4af37", padding: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <span style={{ color: "#e8c872", fontSize: "14px", fontWeight: "bold" }}>
                      5. 360° Interactive Turntable Video (App Ready)
                    </span>
                    <p style={{ color: "#888", fontSize: "11px", margin: "3px 0 0 0" }}>
                      તમારી શોપિંગ એપમાં કસ્ટમર જ્વેલરીને ૩૬૦ ડિગ્રી રોટેટ કરીને જોઈ શકે તે માટેનો વિડીયો
                    </p>
                  </div>
                  <button
                    onClick={() => handleDownload("360 Video")}
                    style={{ background: "#262112", border: "1px solid #d4af37", color: "#e8c872", padding: "5px 12px", borderRadius: "6px", fontSize: "11px", cursor: "pointer", fontWeight: "bold" }}
                  >
                    Save Video MP4
                  </button>
                </div>
                
                <div style={{ display: "flex", justifyContent: "center", background: "#000", borderRadius: "8px", overflow: "hidden" }}>
                  <video
                    src="https://cdn.pixabay.com/video/2020/05/25/40149-425263665_large.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", maxHeight: "320px", objectFit: "cover" }}
                  />
                </div>
              </div>

            </div>
          ) : (
            <div style={{ minHeight: "480px", border: "1px dashed #282834", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#666" }}>
              <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>તમારા શોરૂમની જ્વેલરીનો ફોટો ડાબી બાજુ અપલોડ કરો.</p>
              <p style={{ fontSize: "12px", color: "#555", marginTop: "6px" }}>એક ક્લિકમાં એપ્લિકેશનમાં મૂકવા માટેના 4 લક્ઝરી શૂટ્સ અને 360° વિડીયો તૈયાર થઈ જશે.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

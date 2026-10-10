"use client";

import React, { useState } from "react";

const THEMES = [
  { id: "white-stand", name: "1. White Bust Stand", desc: "White neck display stand catalog shot" },
  { id: "model-saree", name: "2. Real Model Saree Wear", desc: "Indian model wearing necklace in silk saree" },
  { id: "red-velvet", name: "3. Royal Red Velvet", desc: "Deep red bridal silk drape luxury flatlay" },
  { id: "gold-glow", name: "4. Studio Close-up Shoot", desc: "Macro craftsmanship with gold rim highlights" },
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("white-stand");
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});

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

  const handleGenerate = async () => {
    if (!imageFile) {
      alert("મહેરબાની કરીને ઘરેણાંનો ફોટો અપલોડ કરો!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageFile,
          themeType: selectedTheme,
        }),
      });

      const data = await res.json();
      if (data.success && data.generatedUrl) {
        setGeneratedImages((prev) => ({
          ...prev,
          [selectedTheme]: data.generatedUrl,
        }));
      } else {
        alert("AI જનરેટ કરવામાં સમસ્યા આવી.");
      }
    } catch {
      alert("સર્વર કનેક્શનમાં ભૂલ આવી.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `Radhika-${name}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0b0e", color: "#f7e7ce", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ background: "#15151a", padding: "40px", borderRadius: "16px", border: "1px solid #d4af37", textAlign: "center", maxWidth: "400px", width: "90%" }}>
          <h1 style={{ color: "#e8c872", letterSpacing: "2px", margin: "0 0 6px 0", fontSize: "22px" }}>RADHIKA JEWELLERS</h1>
          <p style={{ color: "#888", fontSize: "11px", marginBottom: "25px", letterSpacing: "1.5px" }}>AI PHOTOSHOOT STUDIO</p>
          <form onSubmit={handleUnlock}>
            <input
              type="password"
              placeholder="Staff Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#1f1f26", border: "1px solid #333", color: "#fff", textAlign: "center", marginBottom: "15px" }}
            />
            <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "linear-gradient(135deg, #d4af37, #997400)", border: "none", color: "#000", fontWeight: "bold", cursor: "pointer" }}>
              Unlock Studio
            </button>
          </form>
        </div>
      </div>
    );
  }

  const currentDisplayImage = generatedImages[selectedTheme] || imageFile;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fbfbfe", color: "#222", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e5ea", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "#9a7820", margin: 0, fontSize: "20px", letterSpacing: "1px" }}>RADHIKA JEWELLERS</h1>
          <span style={{ fontSize: "11px", color: "#666" }}>AI BRIDAL CATALOG PHOTOSHOOT GENERATOR</span>
        </div>
        <button onClick={() => setUnlocked(false)} style={{ background: "#eee", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
          Lock
        </button>
      </header>

      {/* Main Studio Area */}
      <div style={{ maxWidth: "1350px", margin: "30px auto", padding: "0 20px", display: "grid", gridTemplateColumns: "350px 1fr", gap: "30px" }}>
        
        {/* Left Side: Upload & Theme Selection */}
        <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e5e5ea", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div>
            <h3 style={{ fontSize: "13px", color: "#666", margin: "0 0 10px 0" }}>1. UPLOAD JEWELLERY (હાર / સેટ)</h3>
            <label style={{ border: "2px dashed #ccc", borderRadius: "8px", padding: "25px", display: "block", textAlign: "center", cursor: "pointer", background: "#fafafa" }}>
              {imageFile ? (
                <div>
                  <img src={imageFile} alt="Source" style={{ maxHeight: "130px", maxWidth: "100%", borderRadius: "6px", objectFit: "contain" }} />
                  <span style={{ color: "#16a34a", fontSize: "12px", display: "block", marginTop: "6px" }}>✓ ફોટો અપલોડ થયેલ છે</span>
                </div>
              ) : (
                <span style={{ color: "#777", fontSize: "13px" }}>ઘરેણાંનો અસલી ફોટો અપલોડ કરો</span>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
            </label>
          </div>

          <div>
            <h3 style={{ fontSize: "13px", color: "#666", margin: "0 0 10px 0" }}>2. SELECT THEME TO GENERATE</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {THEMES.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: selectedTheme === theme.id ? "2px solid #b38e28" : "1px solid #e5e5ea",
                    background: selectedTheme === theme.id ? "#fcf8ee" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "13px", color: selectedTheme === theme.id ? "#9a7820" : "#222" }}>
                    {theme.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "#666", marginTop: "3px" }}>
                    {theme.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: "15px",
              borderRadius: "8px",
              background: loading ? "#aaa" : "linear-gradient(135deg, #d4af37, #997400)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "AI ફોટોશૂટ બનાવી રહ્યું છે..." : `Generate ${THEMES.find(t => t.id === selectedTheme)?.name}`}
          </button>
        </div>

        {/* Right Side: Big Result Preview & Save */}
        <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #e5e5ea", display: "flex", flexDirection: "column" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", color: "#222" }}>
              {THEMES.find(t => t.id === selectedTheme)?.name} (PREVIEW)
            </h3>
            {currentDisplayImage && (
              <button
                onClick={() => downloadImage(currentDisplayImage, selectedTheme)}
                style={{
                  background: "#16a34a",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "12px",
                  cursor: "pointer"
                }}
              >
                📥 Save to Mobile Gallery
              </button>
            )}
          </div>

          <div
            style={{
              flex: 1,
              minHeight: "520px",
              background: selectedTheme === "red-velvet" ? "radial-gradient(circle, #5e0c15 0%, #290307 100%)" : "#f4f4f7",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e5e5ea",
              overflow: "hidden",
              position: "relative"
            }}
          >
            {loading ? (
              <div style={{ textAlign: "center", color: "#9a7820" }}>
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>AI મોડેલ સાથે નવો ફોટોશૂટ બનાવી રહ્યું છે...</p>
                <span style={{ fontSize: "12px", color: "#777" }}>કૃપા કરીને ૧૦ થી ૧૫ સેકન્ડ રાહ જુઓ</span>
              </div>
            ) : currentDisplayImage ? (
              <img
                src={currentDisplayImage}
                alt="Photoshoot"
                style={{
                  maxHeight: "480px",
                  maxWidth: "90%",
                  objectFit: "contain",
                  filter: selectedTheme === "red-velvet" ? "drop-shadow(0 20px 25px rgba(0,0,0,0.8))" : "drop-shadow(0 15px 20px rgba(0,0,0,0.15))"
                }}
              />
            ) : (
              <div style={{ textAlign: "center", color: "#888" }}>
                <p>ડાબી બાજુથી ફોટો અપલોડ કરીને Generate બટન દબાવો.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

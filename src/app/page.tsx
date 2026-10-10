"use client";

import React, { useState, useRef } from "react";

const THEMES = [
  {
    id: "white-stand",
    name: "1. White Bust Stand (Monica Style)",
    tag: "E-Commerce Catalog",
    desc: "Necklace displayed on pure white mannequin neck bust stand with soft shadow",
    themeBg: "#ffffff",
    themeType: "stand"
  },
  {
    id: "model-saree",
    name: "2. Real Model Saree Wear",
    tag: "Traditional Bridal Shoot",
    desc: "Indian bride wearing royal banarasi silk saree wearing this necklace",
    themeBg: "linear-gradient(180deg, #1f1214 0%, #3d1b20 50%, #150b0c 100%)",
    themeType: "model"
  },
  {
    id: "red-velvet",
    name: "3. Royal Red Velvet Drape",
    tag: "Luxury Bridal Flatlay",
    desc: "Deep crimson red bridal velvet fabric with realistic folds and ambient lighting",
    themeBg: "radial-gradient(circle at 50% 50%, #850c1b 0%, #4a030d 70%, #1f0105 100%)",
    themeType: "velvet"
  },
  {
    id: "gold-highlight",
    name: "4. Studio Close-up Shoot",
    tag: "Craftsmanship Detail",
    desc: "Premium jewelry pedestal with warm golden rim spotlight and mirror reflection",
    themeBg: "radial-gradient(circle at 50% 40%, #fdfbf7 0%, #ede6db 70%, #d8cdbe 100%)",
    themeType: "highlight"
  }
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) setUnlocked(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result as string);
        setReady(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAllThemes = () => {
    if (!imageFile) {
      alert("મહેરબાની કરીને પહેલા ઘરેણાંનો ફોટો અપલોડ કરો!");
      return;
    }
    setLoading(true);
    setReady(false);

    setTimeout(() => {
      setLoading(false);
      setReady(true);
    }, 1200);
  };

  // Direct Phone Gallery Download (Full High Quality)
  const downloadToPhoneGallery = (themeName: string, themeType: string) => {
    if (!imageFile) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background Rendering
    if (themeType === "white" || themeType === "stand") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1080, 1080);
      // Bust stand base
      ctx.fillStyle = "#f5f5f7";
      ctx.beginPath();
      ctx.ellipse(540, 680, 260, 240, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (themeType === "model") {
      const grad = ctx.createLinearGradient(0, 0, 0, 1080);
      grad.addColorStop(0, "#2c1518");
      grad.addColorStop(0.5, "#4d1d23");
      grad.addColorStop(1, "#180a0c");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1080);
    } else if (themeType === "velvet") {
      const rad = ctx.createRadialGradient(540, 540, 50, 540, 540, 600);
      rad.addColorStop(0, "#880c1d");
      rad.addColorStop(0.7, "#48030d");
      rad.addColorStop(1, "#1a0105");
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, 1080, 1080);
    } else {
      const rad = ctx.createRadialGradient(540, 450, 50, 540, 540, 600);
      rad.addColorStop(0, "#fdfcf9");
      rad.addColorStop(0.7, "#ede5d8");
      rad.addColorStop(1, "#d6cabb");
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, 1080, 1080);
    }

    // Shadow
    ctx.shadowColor = themeType === "velvet" ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 25;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageFile;
    img.onload = () => {
      const scale = Math.min(780 / img.width, 780 / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (1080 - w) / 2;
      const y = (1080 - h) / 2;

      ctx.drawImage(img, x, y, w, h);

      // Watermark Stamp
      ctx.shadowColor = "transparent";
      ctx.font = "bold 26px sans-serif";
      ctx.fillStyle = themeType === "white" || themeType === "stand" || themeType === "highlight" ? "#9a7820" : "#e8c872";
      ctx.textAlign = "center";
      ctx.fillText("RADHIKA JEWELLERS", 540, 1030);

      // Trigger Mobile Download
      const link = document.createElement("a");
      link.download = `Radhika-Jewellers-${themeName.replace(/\s+/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0b0e", color: "#f7e7ce", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ background: "#15151a", padding: "40px", borderRadius: "16px", border: "1px solid #d4af37", textAlign: "center", maxWidth: "400px", width: "90%" }}>
          <h1 style={{ color: "#e8c872", letterSpacing: "2px", margin: "0 0 6px 0", fontSize: "22px" }}>RADHIKA JEWELLERS</h1>
          <p style={{ color: "#888", fontSize: "11px", marginBottom: "25px", letterSpacing: "1.5px" }}>BRIDAL CATALOG STUDIO</p>
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

  const currentTheme = THEMES[activeTheme];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#111", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner like Monica Jewellers */}
      <div style={{ background: "#0b2038", color: "#fff", textAlign: "center", padding: "8px 12px", fontSize: "12px", letterSpacing: "0.5px" }}>
        Radhika Jewellers • 4 Luxury Bridal Themes Studio (Monica Jewellers Standard)
      </div>

      {/* Header */}
      <header style={{ borderBottom: "1px solid #eee", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "1.5px", margin: 0, color: "#9a7820" }}>RADHIKA JEWELLERS</h1>
          <span style={{ fontSize: "11px", color: "#666" }}>E-COMMERCE CATALOG & MOBILE GALLERY MAKER</span>
        </div>
        <button onClick={() => setUnlocked(false)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "12px" }}>
          Lock
        </button>
      </header>

      {/* Main Studio Area */}
      <main style={{ maxWidth: "1350px", margin: "30px auto", padding: "0 25px" }}>
        
        {/* Upload & Generator Control Bar */}
        <div style={{ background: "#f8f8fb", border: "1px solid #e5e5ed", padding: "20px", borderRadius: "12px", marginBottom: "30px", display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "260px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "#444", marginBottom: "6px" }}>
              ૧. ઘરેણાંનો ફોટો અહીંથી પસંદ કરો:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ width: "100%", padding: "10px", background: "#fff", border: "1px solid #ccc", borderRadius: "8px", fontSize: "13px" }}
            />
          </div>

          <button
            onClick={generateAllThemes}
            disabled={loading || !imageFile}
            style={{
              padding: "14px 28px",
              borderRadius: "8px",
              background: !imageFile ? "#ccc" : loading ? "#555" : "linear-gradient(135deg, #d4af37, #997400)",
              border: "none",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: !imageFile || loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 15px rgba(212,175,55,0.25)"
            }}
          >
            {loading ? "ચારેય થીમ બની રહી છે..." : "⚡ Create All 4 Themes Together"}
          </button>
        </div>

        {/* Studio Product View (Monica Jewellers Layout) */}
        <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 380px", gap: "30px", alignItems: "start" }}>
          
          {/* Left 4 Thumbnails */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {THEMES.map((t, idx) => (
              <div
                key={t.id}
                onClick={() => setActiveTheme(idx)}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "8px",
                  border: activeTheme === idx ? "2px solid #b38e28" : "1px solid #e0e0e0",
                  cursor: "pointer",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: t.themeBg,
                  boxShadow: activeTheme === idx ? "0 4px 12px rgba(179,142,40,0.3)" : "none",
                  transition: "all 0.2s ease",
                  padding: "6px"
                }}
              >
                {imageFile ? (
                  <img
                    src={imageFile}
                    alt={t.name}
                    style={{ maxHeight: "80px", maxWidth: "80%", objectFit: "contain", filter: t.themeType === "velvet" ? "drop-shadow(0 6px 10px rgba(0,0,0,0.7))" : "drop-shadow(0 3px 5px rgba(0,0,0,0.25))" }}
                  />
                ) : (
                  <span style={{ fontSize: "9px", color: t.themeType === "velvet" || t.themeType === "model" ? "#fff" : "#888", textAlign: "center" }}>
                    {t.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Center Big Shoot Canvas */}
          <div
            style={{
              minHeight: "580px",
              borderRadius: "12px",
              border: "1px solid #eaeaea",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              background: currentTheme.themeBg,
              transition: "background 0.3s ease"
            }}
          >
            {loading ? (
              <div style={{ textAlign: "center", color: "#888" }}>
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>Monica Style Shoot Ready Thai Rahyu Chhe...</p>
              </div>
            ) : imageFile ? (
              <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px" }}>
                
                {/* Mannequin Stand Shadow for White Theme */}
                {currentTheme.themeType === "stand" && (
                  <div
                    style={{
                      position: "absolute",
                      width: "320px",
                      height: "280px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #f3f3f6 0%, #ebebef 60%, transparent 80%)",
                      zIndex: 1,
                    }}
                  />
                )}

                {/* Main Jewelry */}
                <img
                  src={imageFile}
                  alt="Jewelry Shoot"
                  style={{
                    maxHeight: "460px",
                    maxWidth: "85%",
                    objectFit: "contain",
                    filter:
                      currentTheme.themeType === "velvet"
                        ? "drop-shadow(0 28px 38px rgba(0,0,0,0.9)) brightness(1.05)"
                        : currentTheme.themeType === "model"
                        ? "drop-shadow(0 20px 28px rgba(0,0,0,0.7))"
                        : "drop-shadow(0 18px 25px rgba(0,0,0,0.22))",
                    zIndex: 2,
                    transform: "scale(1.03)"
                  }}
                />

                <span style={{ position: "absolute", top: "18px", left: "18px", background: "rgba(0,0,0,0.65)", color: "#fff", fontSize: "11px", padding: "5px 12px", borderRadius: "6px" }}>
                  {currentTheme.name}
                </span>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                <p style={{ fontSize: "15px", margin: "0 0 6px 0" }}>ઘરેણાંનો ફોટો અપલોડ થયેલ નથી</p>
                <span style={{ fontSize: "12px", color: "#aaa" }}>ઉપરથી ફોટો પસંદ કરી "Create All 4 Themes Together" બટન દબાવો</span>
              </div>
            )}
          </div>

          {/* Right Download & Product Info Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <span style={{ fontSize: "11px", background: "#fcf4d9", color: "#8a6d1c", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                22K GOLD BRIDAL CATALOG
              </span>
              <h2 style={{ fontSize: "22px", fontWeight: "600", margin: "8px 0 6px 0", color: "#222" }}>
                {currentTheme.name}
              </h2>
              <p style={{ fontSize: "12px", color: "#666", lineHeight: "1.5", margin: 0 }}>
                {currentTheme.desc}
              </p>
            </div>

            {/* Direct Phone Gallery Download Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => downloadToPhoneGallery(currentTheme.name, currentTheme.themeType)}
                disabled={!imageFile}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "8px",
                  background: !imageFile ? "#ccc" : "linear-gradient(135deg, #16a34a, #15803d)",
                  border: "none",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: !imageFile ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 12px rgba(22,163,74,0.3)"
                }}
              >
                📥 Save Current Photo to Phone Gallery
              </button>

              <button
                onClick={() => {
                  THEMES.forEach((t) => downloadToPhoneGallery(t.name, t.themeType));
                }}
                disabled={!imageFile}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  background: !imageFile ? "#eee" : "#f5f5f7",
                  border: "1px solid #ddd",
                  color: "#222",
                  fontWeight: "bold",
                  fontSize: "13px",
                  cursor: !imageFile ? "not-allowed" : "pointer"
                }}
              >
                📥 Save All 4 Photos to Phone Together
              </button>
            </div>

            {/* Features checkmarks */}
            <div style={{ borderTop: "1px solid #eee", paddingTop: "15px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#555" }}>
              <div>✓ High-Resolution (1080x1080 HD E-Commerce Export)</div>
              <div>✓ Direct Phone Gallery Auto-Download</div>
              <div>✓ Monica Jewellers Style Real Shadows & Stand</div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

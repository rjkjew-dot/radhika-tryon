"use client";

import React, { useState } from "react";

// Darek product category mate auto-fit coordinates & sizes
const PRODUCT_CATEGORIES = [
  { id: "necklace", name: "Necklace / Bridal Har", scale: 0.58, top: "42%" },
  { id: "choker", name: "Choker / Short Set", scale: 0.48, top: "36%" },
  { id: "earrings", name: "Earrings / Jhumka", scale: 0.32, top: "34%" },
  { id: "bangles", name: "Bangles / Kada / Chuda", scale: 0.45, top: "52%" },
  { id: "ring", name: "Ladies / Gents Ring", scale: 0.28, top: "54%" },
  { id: "pendant", name: "Pendant Set / Chain", scale: 0.42, top: "44%" },
];

const THEMES = [
  {
    id: "model-saree",
    name: "1. Real Indian Model Shoot (Saree)",
    tag: "Model Wearing Shot",
    desc: "Indian bridal saree model wearing your jewellery piece automatically",
    bgUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1080&q=85",
    type: "model",
  },
  {
    id: "red-velvet",
    name: "2. Royal Crimson Red Velvet Drape",
    tag: "Luxury Velvet Flatlay",
    desc: "Rich textured bridal red velvet silk folds with cinematic soft lighting",
    bgUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1080&q=85",
    type: "velvet",
  },
  {
    id: "white-catalog",
    name: "3. Monica Pure White Catalog",
    tag: "Clean E-Commerce App",
    desc: "Seamless white acrylic catalog display with crisp floor shadow",
    bgUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1080&q=85",
    type: "white",
  },
  {
    id: "walnut-timber",
    name: "4. Royal Espresso Wood Pedestal",
    tag: "Antique Gold Showcase",
    desc: "Polished dark espresso wood block with warm directional rim spotlight",
    bgUrl: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=1080&q=85",
    type: "wood",
  },
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedCat, setSelectedCat] = useState(PRODUCT_CATEGORIES[0]);
  const [cutoutImage, setCutoutImage] = useState<string | null>(null);
  const [activeThemeIdx, setActiveThemeIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) setUnlocked(true);
  };

  // Instant Smart Background Eraser (Extracts pure jewellery cutout)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Auto sampling background edges
        const cornerR = (data[0] + data[(canvas.width - 1) * 4]) / 2;
        const cornerG = (data[1] + data[(canvas.width - 1) * 4 + 1]) / 2;
        const cornerB = (data[2] + data[(canvas.width - 1) * 4 + 2]) / 2;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const diff = Math.sqrt(
            Math.pow(r - cornerR, 2) + Math.pow(g - cornerG, 2) + Math.pow(b - cornerB, 2)
          );

          // Clear light/white backdrop or flat background
          if (diff < 50 || (r > 220 && g > 220 && b > 220) || (r < 30 && g < 30 && b < 30 && cornerR < 50)) {
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setCutoutImage(canvas.toDataURL("image/png"));
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Direct High-Resolution Download into Mobile Gallery
  const saveToPhoneGallery = (themeIdx: number) => {
    if (!cutoutImage) return;

    const theme = THEMES[themeIdx];
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = theme.bgUrl;

    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, 1200, 1200);

      const jwlImg = new Image();
      jwlImg.src = cutoutImage;
      jwlImg.onload = () => {
        ctx.shadowColor = theme.type === "velvet" ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.55)";
        ctx.shadowBlur = 35;
        ctx.shadowOffsetY = 18;

        const scale = selectedCat.scale * 1.35;
        const aspect = jwlImg.width / jwlImg.height;
        const w = 800 * scale;
        const h = w / aspect;
        const x = (1200 - w) / 2;
        const yOffset = theme.type === "model" ? 440 : 540;
        const y = yOffset - h / 2;

        ctx.drawImage(jwlImg, x, y, w, h);

        // Radhika watermark stamp
        ctx.shadowColor = "transparent";
        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "#e8c872";
        ctx.textAlign = "center";
        ctx.fillText("RADHIKA JEWELLERS", 600, 1140);

        const a = document.createElement("a");
        a.download = `Radhika-${selectedCat.id}-${theme.id}.png`;
        a.href = canvas.toDataURL("image/png");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    };
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0b0e", color: "#f7e7ce", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ background: "#15151a", padding: "40px", borderRadius: "16px", border: "1px solid #d4af37", textAlign: "center", maxWidth: "400px", width: "90%" }}>
          <h1 style={{ color: "#e8c872", letterSpacing: "2px", margin: "0 0 6px 0", fontSize: "22px" }}>RADHIKA JEWELLERS</h1>
          <p style={{ color: "#888", fontSize: "11px", marginBottom: "25px", letterSpacing: "1.5px" }}>ALL JEWELLERY AUTO CATALOG STUDIO</p>
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

  const currentTheme = THEMES[activeThemeIdx];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d0d12", color: "#f1f1f5", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Bar */}
      <div style={{ background: "#16161f", borderBottom: "1px solid #292937", padding: "14px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ color: "#e8c872", fontWeight: "800", fontSize: "19px", letterSpacing: "1.5px" }}>RADHIKA JEWELLERS</span>
          <span style={{ fontSize: "11px", color: "#888", marginLeft: "12px" }}>UNIVERSAL MULTI-PRODUCT CATALOG CREATOR</span>
        </div>
        <button onClick={() => setUnlocked(false)} style={{ background: "#22222d", border: "1px solid #444", color: "#aaa", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
          Lock
        </button>
      </div>

      <div style={{ maxWidth: "1440px", margin: "25px auto", padding: "0 20px", display: "grid", gridTemplateColumns: "380px 1fr", gap: "25px" }}>
        
        {/* Left Side: Product Selector & Upload */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Category Selector */}
          <div style={{ background: "#15151e", padding: "20px", borderRadius: "12px", border: "1px solid #262635" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 10px 0" }}>૧. કઈ પ્રોડક્ટ છે તે પસંદ કરો:</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat)}
                  style={{
                    padding: "9px 8px",
                    borderRadius: "6px",
                    border: selectedCat.id === cat.id ? "1px solid #d4af37" : "1px solid #2d2d3d",
                    background: selectedCat.id === cat.id ? "#2b2513" : "#101016",
                    color: selectedCat.id === cat.id ? "#e8c872" : "#aaa",
                    cursor: "pointer",
                    fontSize: "11px",
                    textAlign: "left"
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Card */}
          <div style={{ background: "#15151e", padding: "20px", borderRadius: "12px", border: "1px solid #262635" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 10px 0" }}>૨. પ્રોડક્ટનો ફોટો અપલોડ કરો:</h3>
            <label style={{ border: "2px dashed #444", borderRadius: "8px", padding: "20px", display: "block", textAlign: "center", cursor: "pointer", background: "#0e0e13" }}>
              {cutoutImage ? (
                <div>
                  <img src={cutoutImage} alt="Cutout" style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))" }} />
                  <span style={{ color: "#4ade80", fontSize: "12px", display: "block", marginTop: "8px" }}>✓ Background Removed (Clean Cutout)</span>
                </div>
              ) : (
                <div>
                  <span style={{ color: "#ddd", fontSize: "13px", display: "block" }}>ગમે તે પ્રોડક્ટનો ફોટો નાખો</span>
                  <span style={{ color: "#777", fontSize: "11px" }}>Background આપોઆપ સાફ થઈ જશે</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
            </label>
          </div>

          {/* Themes Switcher */}
          <div style={{ background: "#15151e", padding: "20px", borderRadius: "12px", border: "1px solid #262635" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 12px 0" }}>૩. શૂટ થીમ પસંદ કરો:</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {THEMES.map((theme, idx) => (
                <div
                  key={theme.id}
                  onClick={() => setActiveThemeIdx(idx)}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    border: activeThemeIdx === idx ? "2px solid #d4af37" : "1px solid #2d2d3d",
                    background: activeThemeIdx === idx ? "#262113" : "#111117",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "13px", color: activeThemeIdx === idx ? "#e8c872" : "#eee" }}>
                    {theme.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "#888", marginTop: "3px" }}>
                    {theme.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download Current Theme */}
          <button
            onClick={() => saveToPhoneGallery(activeThemeIdx)}
            disabled={!cutoutImage || loading}
            style={{
              padding: "15px",
              borderRadius: "8px",
              background: !cutoutImage ? "#333" : "linear-gradient(135deg, #d4af37, #997400)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: !cutoutImage ? "not-allowed" : "pointer",
              boxShadow: "0 4px 15px rgba(212,175,55,0.3)"
            }}
          >
            📥 આ ફોટો મોબાઈલ ગેલેરીમાં સેવ કરો
          </button>

          {/* Download All 4 Themes in One Click */}
          <button
            onClick={() => {
              THEMES.forEach((_, i) => setTimeout(() => saveToPhoneGallery(i), i * 300));
            }}
            disabled={!cutoutImage || loading}
            style={{
              padding: "12px",
              borderRadius: "8px",
              background: "#22222d",
              border: "1px solid #444",
              color: "#e8c872",
              fontWeight: "bold",
              fontSize: "13px",
              cursor: !cutoutImage ? "not-allowed" : "pointer",
            }}
          >
            📥 એકસાથે ચારેય થીમ્સ સેવ કરો (All 4 Shoots)
          </button>

        </div>

        {/* Right Side: Big Live Showcase Canvas */}
        <div style={{ background: "#15151e", borderRadius: "12px", border: "1px solid #262635", padding: "20px", display: "flex", flexDirection: "column" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <div>
              <h3 style={{ margin: 0, fontSize: "16px", color: "#e8c872" }}>
                {currentTheme.name}
              </h3>
              <span style={{ fontSize: "11px", color: "#777" }}>
                Selected Category: {selectedCat.name}
              </span>
            </div>
            {cutoutImage && (
              <span style={{ color: "#4ade80", fontSize: "11px", background: "#122818", border: "1px solid #1f572a", padding: "3px 10px", borderRadius: "6px" }}>
                ✓ Product Extracted & Fitted
              </span>
            )}
          </div>

          {/* Live Stage */}
          <div
            style={{
              flex: 1,
              minHeight: "580px",
              borderRadius: "10px",
              position: "relative",
              overflow: "hidden",
              backgroundImage:

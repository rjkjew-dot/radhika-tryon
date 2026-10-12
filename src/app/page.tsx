"use client";

import React, { useState } from "react";

const CATEGORIES = [
  { id: "necklace", name: "Necklace / Bridal Har", scale: 0.60, top: "42%" },
  { id: "choker", name: "Choker / Short Set", scale: 0.50, top: "37%" },
  { id: "earrings", name: "Earrings / Jhumka", scale: 0.34, top: "34%" },
  { id: "bangles", name: "Bangles / Kada", scale: 0.46, top: "52%" },
  { id: "ring", name: "Ring", scale: 0.30, top: "54%" },
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]);
  const [pureCutout, setPureCutout] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) setUnlocked(true);
  };

  // Automated Pure Extraction (Removes backgrounds automatically)
  const handleSinglePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        // Auto background boundary detection
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

          if (diff < 52 || (r > 210 && g > 210 && b > 210) || (r < 32 && g < 32 && b < 32 && cornerR < 50)) {
            data[i + 3] = 0; // Cutout
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setPureCutout(canvas.toDataURL("image/png"));
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Direct 1080x1080 Export for E-Commerce App
  const saveAsset = (type: "clear" | "model" | "velvet", fileName: string) => {
    if (!pureCutout) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const jwl = new Image();
    jwl.src = pureCutout;

    if (type === "clear") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1080, 1080);
      jwl.onload = () => {
        ctx.shadowColor = "rgba(0,0,0,0.18)";
        ctx.shadowBlur = 24;
        ctx.shadowOffsetY = 15;
        const aspect = jwl.width / jwl.height;
        const w = 780;
        const h = w / aspect;
        ctx.drawImage(jwl, (1080 - w) / 2, (1080 - h) / 2, w, h);
        triggerDownload(canvas, fileName);
      };
      return;
    }

    const bgUrl =
      type === "model"
        ? "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1080&q=85"
        : "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1080&q=85";

    const bg = new Image();
    bg.crossOrigin = "anonymous";
    bg.src = bgUrl;
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, 1080, 1080);
      jwl.onload = () => {
        ctx.shadowColor = "rgba(0,0,0,0.85)";
        ctx.shadowBlur = 35;
        ctx.shadowOffsetY = 20;

        const scale = selectedCat.scale * 1.35;
        const aspect = jwl.width / jwl.height;
        const w = 720 * scale;
        const h = w / aspect;
        const x = (1080 - w) / 2;
        const yOffset = type === "model" ? 430 : 540;
        const y = yOffset - h / 2;

        ctx.drawImage(jwl, x, y, w, h);
        triggerDownload(canvas, fileName);
      };
    };
  };

  const triggerDownload = (canvas: HTMLCanvasElement, fileName: string) => {
    const a = document.createElement("a");
    a.download = `MonicaStyle-${fileName}.png`;
    a.href = canvas.toDataURL("image/png");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAll = () => {
    saveAsset("clear", "1-Clear-White-Catalog");
    setTimeout(() => saveAsset("model", "2-Model-Saree-Shoot"), 300);
    setTimeout(() => saveAsset("velvet", "3-Red-Velvet-Flatlay"), 600);
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0b0e", color: "#f7e7ce", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ background: "#15151a", padding: "40px", borderRadius: "16px", border: "1px solid #d4af37", textAlign: "center", maxWidth: "400px", width: "90%" }}>
          <h1 style={{ color: "#e8c872", letterSpacing: "2px", margin: "0 0 6px 0", fontSize: "22px" }}>RADHIKA JEWELLERS</h1>
          <p style={{ color: "#888", fontSize: "11px", marginBottom: "25px", letterSpacing: "1.5px" }}>AUTOMATED E-COMMERCE CATALOG STUDIO</p>
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

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0c0d11", color: "#f1f1f5", fontFamily: "system-ui, sans-serif", padding: "20px" }}>
      {/* Top Header */}
      <header style={{ maxWidth: "1400px", margin: "0 auto 25px auto", borderBottom: "1px solid #222", paddingBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "#e8c872", margin: 0, fontSize: "20px", letterSpacing: "1.5px" }}>RADHIKA JEWELLERS</h1>
          <span style={{ fontSize: "11px", color: "#888" }}>ONE-CLICK E-COMMERCE ASSET BUILDER (MONICA JEWELLERS STANDARD)</span>
        </div>
        <button onClick={() => setUnlocked(false)} style={{ background: "#222", border: "1px solid #444", color: "#aaa", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
          Lock
        </button>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "360px 1fr", gap: "25px" }}>
        
        {/* Left Upload Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
          <div style={{ background: "#14141c", padding: "20px", borderRadius: "12px", border: "1px solid #262635" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 10px 0" }}>૧. Daagina Ni Category Pasand Karo</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat)}
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    border: selectedCat.id === cat.id ? "1px solid #d4af37" : "1px solid #2d2d3d",
                    background: selectedCat.id === cat.id ? "#2b2513" : "#101016",
                    color: selectedCat.id === cat.id ? "#e8c872" : "#aaa",
                    fontSize: "11px",
                    cursor: "pointer",
                    textAlign: "left"
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "#14141c", padding: "20px", borderRadius: "12px", border: "1px solid #262635" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 10px 0" }}>૨. Khali Ek Photo Upload Karo</h3>
            <label style={{ border: "2px dashed #444", borderRadius: "8px", padding: "22px", display: "block", textAlign: "center", cursor: "pointer", background: "#0e0e13" }}>
              {pureCutout ? (
                <div>
                  <img src={pureCutout} alt="Cutout" style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain" }} />
                  <span style={{ color: "#4ade80", fontSize: "12px", display: "block", marginTop: "8px" }}>✓ Background Completely Removed!</span>
                </div>
              ) : (
                <div>
                  <span style={{ color: "#ccc", fontSize: "12px", display: "block" }}>Dukaan ma padelo photo muko</span>
                  <span style={{ color: "#777", fontSize: "10px" }}>Original background aapomel hatine 3 themes banse</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleSinglePicUpload} style={{ display: "none" }} />
            </label>
          </div>

          {pureCutout && (
            <button
              onClick={downloadAll}
              style={{
                padding: "16px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #d4af37, #997400)",
                border: "none",
                color: "#000",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(212,175,55,0.3)"
              }}
            >
              📥 Download All 3 For Your App (1080x1080)
            </button>
          )}

        </div>

        {/* Right 3 Product Catalog Display */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {loading ? (
            <div style={{ minHeight: "450px", background: "#14141c", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8c872" }}>
              Background clean kari Monica Jewellers style 3 images banavi rahyu chhe...
            </div>
          ) : pureCutout ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "20px" }}>
              
              {/* 1. Model Wearing Shoot */}
              <div style={{ background: "#14141c", borderRadius: "12px", border: "1px solid #262635", padding: "14px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div>
                    <span style={{ color: "#e8c872", fontSize: "13px", fontWeight: "bold" }}>૧. Model Sathe Shoot</span>
                    <p style={{ color: "#777", fontSize: "10px", margin: "2px 0 0 0" }}>Indian saree bridal model wear</p>
                  </div>
                  <button onClick={() => saveAsset("model", "Model-Saree")} style={{ background: "#222", border: "1px solid #444", color: "#e8c872", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Save HD</button>
                </div>
                <div style={{ height: "320px", backgroundImage: `url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80')`, backgroundSize: "cover", backgroundPosition: "top", borderRadius: "8px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: selectedCat.top, left: "50%", transform: `translate(-50%, -50%) scale(${selectedCat.scale})`, width: "100%", display: "flex", justifyContent: "center" }}>
                    <img src={pureCutout} alt="Model Wear" style={{ maxHeight: "350px", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0 15px 22px rgba(0,0,0,0.85))" }} />
                  </div>
                </div>
              </div>

              {/* 2. Red Velvet Shoot */}
              <div style={{ background: "#14141c", borderRadius: "12px", border: "1px solid #262635", padding: "14px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div>
                    <span style={{ color: "#e8c872", fontSize: "13px", fontWeight: "bold" }}>૨. Red Velvet Shoot</span>
                    <p style={{ color: "#777", fontSize: "10px", margin: "2px 0 0 0" }}>Royal crimson silk velvet drapery</p>
                  </div>
                  <button onClick={() => saveAsset("velvet", "Red-Velvet")} style={{ background: "#222", border: "1px solid #444", color: "#e8c872", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Save HD</button>
                </div>
                <div style={{ height: "320px", backgroundImage: `url('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80')`, backgroundSize: "cover", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "15px" }}>
                  <img src={pureCutout} alt="Red Velvet" style={{ maxHeight: "240px", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.9))" }} />
                </div>
              </div>

              {/* 3. Clear White Catalog Pic */}
              <div style={{ background: "#14141c", borderRadius: "12px", border: "1px solid #262635", padding: "14px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div>
                    <span style={{ color: "#e8c872", fontSize: "13px", fontWeight: "bold" }}>૩. Clear Product Pic</span>
                    <p style={{ color: "#777", fontSize: "10px", margin: "2px 0 0 0" }}>Pure white seamless studio catalog</p>
                  </div>
                  <button onClick={() => saveAsset("clear", "White-Catalog")} style={{ background: "#222", border: "1px solid #444", color: "#e8c872", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Save HD</button>
                </div>
                <div style={{ height: "320px", background: "#ffffff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "15px" }}>
                  <img src={pureCutout} alt="Clear Catalog" style={{ maxHeight: "240px", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.22))" }} />
                </div>
              </div>

            </div>
          ) : (
            <div style={{ minHeight: "450px", border: "1px dashed #333", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#666" }}>
              <p style={{ margin: 0, fontSize: "14px" }}>Dabi baju thi khali ek daagina no photo upload karo.</p>
              <p style={{ fontSize: "12px", color: "#444", marginTop: "6px" }}>Original background hatine Model Sathe, Red Velvet par ane Clear White Catalog Pic ek saathe banine tamari app mate ready thai jashe.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

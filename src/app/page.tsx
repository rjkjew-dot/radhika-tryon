"use client";

import React, { useState } from "react";

const CATEGORIES = [
  { id: "necklace", name: "Necklace / Har", scale: 0.58, top: "42%" },
  { id: "choker", name: "Choker / Short Set", scale: 0.48, top: "37%" },
  { id: "earrings", name: "Earrings / Jhumka", scale: 0.32, top: "34%" },
  { id: "bangles", name: "Bangles / Kada", scale: 0.45, top: "52%" },
  { id: "ring", name: "Ring", scale: 0.28, top: "54%" },
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]);
  const [cleanJewellery, setCleanJewellery] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) setUnlocked(true);
  };

  // Full Smart Background Remover (Edge Feathering & Chroma Isolation)
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

        // Sample 4 corners for background detection
        const cornerIdxs = [0, (canvas.width - 1) * 4, (canvas.width * (canvas.height - 1)) * 4, (canvas.width * canvas.height - 1) * 4];
        let bgR = 0, bgG = 0, bgB = 0;
        cornerIdxs.forEach((idx) => {
          bgR += data[idx];
          bgG += data[idx + 1];
          bgB += data[idx + 2];
        });
        bgR /= 4; bgG /= 4; bgB /= 4;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const diff = Math.sqrt(
            Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2)
          );

          // Transparent cutout condition
          const isWhiteOrGrayBg = r > 200 && g > 200 && b > 200;
          const isNearCorner = diff < 60;
          const isDarkBackdrop = r < 40 && g < 40 && b < 40 && bgR < 60;

          if (isNearCorner || isWhiteOrGrayBg || isDarkBackdrop) {
            data[i + 3] = 0; // Remove background completely
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setCleanJewellery(canvas.toDataURL("image/png"));
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // 1080x1080 E-commerce Direct Download
  const downloadThemeHD = (type: "clear" | "model" | "velvet", title: string) => {
    if (!cleanJewellery) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const jwl = new Image();
    jwl.src = cleanJewellery;

    if (type === "clear") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1080, 1080);
      jwl.onload = () => {
        ctx.shadowColor = "rgba(0,0,0,0.18)";
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 15;
        const aspect = jwl.width / jwl.height;
        const w = 760;
        const h = w / aspect;
        ctx.drawImage(jwl, (1080 - w) / 2, (1080 - h) / 2, w, h);
        triggerSave(canvas, title);
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
        const yOffset = type === "model" ? 420 : 540;
        const y = yOffset - h / 2;

        ctx.drawImage(jwl, x, y, w, h);
        triggerSave(canvas, title);
      };
    };
  };

  const triggerSave = (canvas: HTMLCanvasElement, filename: string) => {
    const a = document.createElement("a");
    a.download = `Radhika-${filename}.png`;
    a.href = canvas.toDataURL("image/png");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAllThree = () => {
    downloadThemeHD("clear", "1-Clear-Ecommerce-Shot");
    setTimeout(() => downloadThemeHD("model", "2-Model-Wearing-Shot"), 350);
    setTimeout(() => downloadThemeHD("velvet", "3-Red-Velvet-Shoot"), 700);
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0b0e", color: "#f7e7ce", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ background: "#15151a", padding: "40px", borderRadius: "16px", border: "1px solid #d4af37", textAlign: "center", maxWidth: "400px", width: "90%" }}>
          <h1 style={{ color: "#e8c872", letterSpacing: "2px", margin: "0 0 6px 0", fontSize: "22px" }}>RADHIKA JEWELLERS</h1>
          <p style={{ color: "#888", fontSize: "11px", marginBottom: "25px", letterSpacing: "1.5px" }}>ECOMMERCE CATALOG STUDIO</p>
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
      {/* Top Banner */}
      <header style={{ maxWidth: "1400px", margin: "0 auto 25px auto", borderBottom: "1px solid #222", paddingBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "#e8c872", margin: 0, fontSize: "20px", letterSpacing: "1.5px" }}>RADHIKA JEWELLERS</h1>
          <span style={{ fontSize: "11px", color: "#888" }}>3 CORE E-COMMERCE ASSETS (CLEAN BG • MODEL • RED VELVET)</span>
        </div>
        <button onClick={() => setUnlocked(false)} style={{ background: "#222", border: "1px solid #444", color: "#aaa", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
          Lock
        </button>
      </header>

      {/* Main Grid */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "350px 1fr", gap: "25px" }}>
        
        {/* Left Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
          <div style={{ background: "#14141c", padding: "20px", borderRadius: "12px", border: "1px solid #262635" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 10px 0" }}>૧. Daagina Ni Category</h3>
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
                    cursor: "pointer"
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "#14141c", padding: "20px", borderRadius: "12px", border: "1px solid #262635" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 10px 0" }}>૨. Photo Upload Karo (Background Auto Erase)</h3>
            <label style={{ border: "2px dashed #444", borderRadius: "8px", padding: "20px", display: "block", textAlign: "center", cursor: "pointer", background: "#0e0e13" }}>
              {cleanJewellery ? (
                <div>
                  <img src={cleanJewellery} alt="Clean Cutout" style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain" }} />
                  <span style={{ color: "#4ade80", fontSize: "12px", display: "block", marginTop: "8px" }}>✓ Background Completely Removed!</span>
                </div>
              ) : (
                <span style={{ color: "#bbb", fontSize: "12px" }}>Photo upload karo (paachhal nu background jatu rahese)</span>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
            </label>
          </div>

          {cleanJewellery && (
            <button
              onClick={downloadAllThree}
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
              📥 Download All 3 Assets Together (HD)
            </button>
          )}

        </div>

        {/* Right 3 Formats Display */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {loading ? (
            <div style={{ minHeight: "450px", background: "#14141c", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8c872" }}>
              Background remove thai ne tran themes create thai rahi chhe...
            </div>
          ) : cleanJewellery ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              
              {/* 1. Model Wearing Shoot */}
              <div style={{ background: "#14141c", borderRadius: "12px", border: "1px solid #262635", padding: "14px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div>
                    <span style={{ color: "#e8c872", fontSize: "13px", fontWeight: "bold" }}>૧. Model Sathe Shoot</span>
                    <p style={{ color: "#777", fontSize: "10px", margin: "2px 0 0 0" }}>Indian saree bridal model wear</p>
                  </div>
                  <button onClick={() => downloadThemeHD("model", "1-Model-Wearing-Shot")} style={{ background: "#222", border: "1px solid #444", color: "#e8c872", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Save HD</button>
                </div>
                <div style={{ height: "300px", backgroundImage: `url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80')`, backgroundSize: "cover", backgroundPosition: "top", borderRadius: "8px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: selectedCat.top, left: "50%", transform: `translate(-50%, -50%) scale(${selectedCat.scale})`, width: "100%", display: "flex", justifyContent: "center" }}>
                    <img src={cleanJewellery} alt="Model Wear" style={{ maxHeight: "340px", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0 15px 22px rgba(0,0,0,0.85))" }} />
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
                  <button onClick={() => downloadThemeHD("velvet", "2-Red-Velvet-Shoot")} style={{ background: "#222", border: "1px solid #444", color: "#e8c872", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Save HD</button>
                </div>
                <div style={{ height: "300px", backgroundImage: `url('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80')`, backgroundSize: "cover", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "15px" }}>
                  <img src={cleanJewellery} alt="Red Velvet" style={{ maxHeight: "230px", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0

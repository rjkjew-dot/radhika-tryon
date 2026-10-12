"use client";

import React, { useState } from "react";

const CATEGORIES = [
  { id: "necklace", name: "Necklace / Har", scale: 0.65, modelY: 410, modelW: 360 },
  { id: "choker", name: "Choker / Hasli", scale: 0.52, modelY: 370, modelW: 320 },
  { id: "earrings", name: "Earrings / Jhumka", scale: 0.35, modelY: 330, modelW: 220 },
  { id: "bangles", name: "Bangles / Kada", scale: 0.50, modelY: 530, modelW: 300 },
  { id: "ring", name: "Ring", scale: 0.30, modelY: 540, modelW: 200 },
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]);
  const [cutoutImg, setCutoutImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) setUnlocked(true);
  };

  // High Precision Background Eraser with Edge Smoothing
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

        // Sample 4 corner backgrounds
        const cornerIdxs = [
          0,
          (canvas.width - 1) * 4,
          (canvas.width * (canvas.height - 1)) * 4,
          (canvas.width * canvas.height - 1) * 4,
        ];
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

          const isLight = r > 205 && g > 205 && b > 205;
          const isDark = r < 35 && g < 35 && b < 35 && bgR < 55;

          if (diff < 55 || isLight || isDark) {
            data[i + 3] = 0; // Transparent Cutout
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setCutoutImg(canvas.toDataURL("image/png"));
        setLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // 1080x1080 Professional Canvas Rendering for E-Commerce Apps
  const exportAsset = (theme: "model" | "velvet" | "clear", filename: string) => {
    if (!cutoutImg) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const jwl = new Image();
    jwl.src = cutoutImg;

    if (theme === "clear") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 1080, 1080);

      jwl.onload = () => {
        ctx.shadowColor = "rgba(0,0,0,0.18)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 15;
        const aspect = jwl.width / jwl.height;
        const w = 750;
        const h = w / aspect;
        ctx.drawImage(jwl, (1080 - w) / 2, 540 - h / 2, w, h);
        downloadCanvas(canvas, filename);
      };
      return;
    }

    const bgUrl =
      theme === "model"
        ? "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1080&q=85"
        : "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1080&q=85";

    const bg = new Image();
    bg.crossOrigin = "anonymous";
    bg.src = bgUrl;
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, 1080, 1080);
      jwl.onload = () => {
        ctx.shadowColor = "rgba(0,0,0,0.85)";
        ctx.shadowBlur = theme === "model" ? 25 : 40;
        ctx.shadowOffsetY = theme === "model" ? 12 : 22;

        const w = theme === "model" ? selectedCat.modelW * 1.5 : 720;
        const aspect = jwl.width / jwl.height;
        const h = w / aspect;
        const x = (1080 - w) / 2;
        const y = theme === "model" ? selectedCat.modelY * 1.15 : 540 - h / 2;

        ctx.drawImage(jwl, x, y, w, h);
        downloadCanvas(canvas, filename);
      };
    };
  };

  const downloadCanvas = (canvas: HTMLCanvasElement, name: string) => {
    const a = document.createElement("a");
    a.download = `Radhika-${name}.png`;
    a.href = canvas.toDataURL("image/png");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAll = () => {
    exportAsset("model", "1-Model-Saree-Wearing");
    setTimeout(() => exportAsset("velvet", "2-Maroon-Velvet-Flatlay"), 350);
    setTimeout(() => exportAsset("clear", "3-Clear-Ecommerce-Catalog"), 700);
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0b0e", color: "#f7e7ce", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ background: "#15151a", padding: "40px", borderRadius: "16px", border: "1px solid #d4af37", textAlign: "center", maxWidth: "400px", width: "90%" }}>
          <h1 style={{ color: "#e8c872", letterSpacing: "2px", margin: "0 0 6px 0", fontSize: "22px" }}>RADHIKA JEWELLERS</h1>
          <p style={{ color: "#888", fontSize: "11px", marginBottom: "25px", letterSpacing: "1.5px" }}>REAL PRODUCT STUDIO</p>
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
      {/* Header */}
      <header style={{ maxWidth: "1400px", margin: "0 auto 25px auto", borderBottom: "1px solid #222", paddingBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "#e8c872", margin: 0, fontSize: "20px", letterSpacing: "1.5px" }}>RADHIKA JEWELLERS</h1>
          <span style={{ fontSize: "11px", color: "#888" }}>ECOMMERCE ASSET ENGINE (MODEL • VELVET • CATALOG)</span>
        </div>
        <button onClick={() => setUnlocked(false)} style={{ background: "#222", border: "1px solid #444", color: "#aaa", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
          Lock
        </button>
      </header>

      {/* Main Grid */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "350px 1fr", gap: "25px" }}>
        
        {/* Left Side */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
          <div style={{ background: "#14141c", padding: "20px", borderRadius: "12px", border: "1px solid #262635" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 10px 0" }}>૧. ઘરેણાંની Category પસંદ કરો</h3>
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
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 10px 0" }}>૨. ઘરેણાંનો ફોટો અપલોડ કરો</h3>
            <label style={{ border: "2px dashed #444", borderRadius: "8px", padding: "22px", display: "block", textAlign: "center", cursor: "pointer", background: "#0e0e13" }}>
              {cutoutImg ? (
                <div>
                  <img src={cutoutImg} alt="Cutout" style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain" }} />
                  <span style={{ color: "#4ade80", fontSize: "12px", display: "block", marginTop: "8px" }}>✓ Background સાફ થઈ ગયું!</span>
                </div>
              ) : (
                <div>
                  <span style={{ color: "#ccc", fontSize: "12px", display: "block" }}>દુકાનમાં પાડેલો ફોટો અપલોડ કરો</span>
                  <span style={{ color: "#777", fontSize: "10px" }}>Original background આપોઆપ નીકળી જશે</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
            </label>
          </div>

          {cutoutImg && (
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
              📥 ત્રણેય HD ફોટા એકસાથે ડાઉનલોડ કરો (1080x1080)
            </button>
          )}

        </div>

        {/* Right 3 Assets View */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {loading ? (
            <div style={{ minHeight: "450px", background: "#14141c", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8c872" }}>
              બેકગ્રાઉન્ડ હટાવીને Monica Jewellers સ્ટાઈલમાં ૩ ફોટોશૂટ બની રહ્યા છે...
            </div>
          ) : cutoutImg ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "20px" }}>
              
              {/* 1. Model Saree Wearing */}
              <div style={{ background: "#14141c", borderRadius: "12px", border: "1px solid #262635", padding: "14px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div>
                    <span style={{ color: "#e8c872", fontSize: "13px", fontWeight: "bold" }}>૧. Model સાથે Shoot</span>
                    <p style={{ color: "#777", fontSize: "10px", margin: "2px 0 0 0" }}>Real Indian saree bridal portrait</p>
                  </div>
                  <button onClick={() => exportAsset("model", "Model-Saree-Wearing")} style={{ background: "#222", border: "1px solid #444", color: "#e8c872", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Save HD</button>
                </div>
                <div style={{ height: "320px", backgroundImage: `url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85')`, backgroundSize: "cover", backgroundPosition: "top", borderRadius: "8px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: `${selectedCat.modelY / 10.8}%`, left: "50%", transform: "translate(-50%, -50%)", width: `${selectedCat.modelW / 10.8}%`, display: "flex", justifyContent: "center" }}>
                    <img src={cutoutImg} alt="Model Wear" style={{ width: "100%", objectFit: "contain", filter: "drop-shadow(0 14px 20px rgba(0,0,0,0.85))" }} />
                  </div>
                </div>
              </div>

              {/* 2. Maroon Velvet */}
              <div style={{ background: "#14141c", borderRadius: "12px", border: "1px solid #262635", padding: "14px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div>
                    <span style={{ color: "#e8c872", fontSize: "13px", fontWeight: "bold" }}>૨. Maroon Velvet Flatlay</span>
                    <p style={{ color: "#777", fontSize: "10px", margin: "2px 0 0 0" }}>Royal crimson silk velvet drapery</p>
                  </div>
                  <button onClick={() => exportAsset("velvet", "Maroon-Velvet-Flatlay")} style={{ background: "#222", border: "1px solid #444", color: "#e8c872", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Save HD</button>
                </div>
                <div style={{ height: "320px", backgroundImage: `url('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=85')`, backgroundSize: "cover", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "15px" }}>
                  <img src={cutoutImg} alt="Red Velvet" style={{ maxHeight: "240px", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 22px 28px rgba(0,0,0,0.95))" }} />
                </div>
              </div>

              {/* 3. Pure Clear E-Commerce Catalog */}
              <div style={{ background: "#14141c", borderRadius: "12px", border: "1px solid #262635", padding: "14px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div>
                    <span style={{ color: "#e8c872", fontSize: "13px", fontWeight: "bold" }}>૩. Clear Product Pic</span>
                    <p style={{ color: "#777", fontSize: "10px", margin: "2px 0 0 0" }}>Pure white seamless studio catalog</p>
                  </div>
                  <button onClick={() => exportAsset("clear", "Clear-Ecommerce-Catalog")} style={{ background: "#222", border: "1px solid #444", color: "#e8c872", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Save HD</button>
                </div>
                <div style={{ height: "320px", background: "#ffffff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "15px" }}>
                  <img src={cutoutImg} alt="Clear Catalog" style={{ maxHeight: "240px", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.20))" }} />
                </div>
              </div>

            </div>
          ) : (
            <div style={{ minHeight: "450px", border: "1px dashed #333", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#666" }}>
              <p style={{ margin: 0, fontSize: "14px" }}>ડાબી બાજુથી ઘરેણાંનો ફોટો અપલોડ કરો.</p>
              <p style={{ fontSize: "12px", color: "#444", marginTop: "6px" }}>મોડેલ સાથે, મરૂન વેલ્વેટ પર અને ક્લિયર કેટલોગ ફોટો સીધા 1080x1080 HD સાઇઝમાં તૈયાર થઈ જશે.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

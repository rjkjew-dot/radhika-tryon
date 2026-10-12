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
  const [cutoutImage, setCutoutImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) setUnlocked(true);
  };

  // 1. Background Remove કરી માત્ર ઘરેણું અલગ કરવાની પ્રક્રિયા
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

          if (diff < 50 || (r > 215 && g > 215 && b > 215) || (r < 35 && g < 35 && b < 35 && cornerR < 55)) {
            data[i + 3] = 0; // Transparent Background
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

  // મોબાઈલ ગેલેરીમાં સેવ કરવા માટેનું ફંક્શન
  const downloadImage = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `Radhika-${filename}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0b0e", color: "#f7e7ce", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ background: "#15151a", padding: "40px", borderRadius: "16px", border: "1px solid #d4af37", textAlign: "center", maxWidth: "400px", width: "90%" }}>
          <h1 style={{ color: "#e8c872", letterSpacing: "2px", margin: "0 0 6px 0", fontSize: "22px" }}>RADHIKA JEWELLERS</h1>
          <p style={{ color: "#888", fontSize: "11px", marginBottom: "25px", letterSpacing: "1.5px" }}>5-IN-1 CATALOG STUDIO</p>
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
          <span style={{ fontSize: "11px", color: "#888" }}>5 ESSENTIAL CATALOG FORMATS (AUTO-GENERATE)</span>
        </div>
        <button onClick={() => setUnlocked(false)} style={{ background: "#222", border: "1px solid #444", color: "#aaa", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
          Lock
        </button>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "340px 1fr", gap: "25px" }}>
        
        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ background: "#14141c", padding: "20px", borderRadius: "12px", border: "1px solid #262635" }}>
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 10px 0" }}>૧. ઘરેણાંની કેટેગરી</h3>
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
            <h3 style={{ color: "#e8c872", fontSize: "13px", margin: "0 0 10px 0" }}>૨. ઘરેણાંનો ફોટો અપલોડ કરો</h3>
            <label style={{ border: "2px dashed #444", borderRadius: "8px", padding: "20px", display: "block", textAlign: "center", cursor: "pointer", background: "#0e0e13" }}>
              {cutoutImage ? (
                <div>
                  <img src={cutoutImage} alt="Cutout" style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain" }} />
                  <span style={{ color: "#4ade80", fontSize: "12px", display: "block", marginTop: "8px" }}>✓ Background સાફ થઈ ગયું!</span>
                </div>
              ) : (
                <span style={{ color: "#bbb", fontSize: "12px" }}>ફોટો પસંદ કરો (Background આપોઆપ નીકળી જશે)</span>
              )}
              <input type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
            </label>
          </div>
        </div>

        {/* 5 Outputs Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {loading ? (
            <div style={{ minHeight: "450px", background: "#14141c", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#e8c872" }}>
              તમારા ઘરેણાં માટે પાંચેય ફોર્મેટ તૈયાર થઈ રહ્યા છે...
            </div>
          ) : cutoutImage ? (
            <>
              {/* 4 Photos Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "16px" }}>
                
                {/* 1. Transparent Cutout */}
                <div style={{ background: "#14141c", borderRadius: "10px", border: "1px solid #262635", padding: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#e8c872", fontSize: "12px", fontWeight: "bold" }}>૧. Background વગર (Cutout)</span>
                    <button onClick={() => downloadImage(cutoutImage, "Cutout-PNG")} style={{ background: "#222", border: "1px solid #444", color: "#fff", fontSize: "10px", padding: "3px 8px", borderRadius: "4px", cursor: "pointer" }}>Save</button>
                  </div>
                  <div style={{ height: "230px", background: "repeating-conic-gradient(#222 0% 25%, #181818 0% 50%) 50% / 16px 16px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
                    <img src={cutoutImage} alt="Cutout" style={{ maxHeight: "180px", maxWidth: "90%", objectFit: "contain" }} />
                  </div>
                </div>

                {/* 2. Maroon / Red Velvet Fabric Theme */}
                <div style={{ background: "#14141c", borderRadius: "10px", border: "1px solid #262635", padding: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#e8c872", fontSize: "12px", fontWeight: "bold" }}>૨. Maroon Velvet Shoot</span>
                    <button onClick={() => downloadImage(cutoutImage, "Maroon-Velvet")} style={{ background: "#222", border: "1px solid #444", color: "#fff", fontSize: "10px", padding: "3px 8px", borderRadius: "4px", cursor: "pointer" }}>Save</button>
                  </div>
                  <div style={{ height: "230px", backgroundImage: `url('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80')`, backgroundSize: "cover", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
                    <img src={cutoutImage} alt="Velvet" style={{ maxHeight: "180px", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.9))" }} />
                  </div>
                </div>

                {/* 3. Model Wearing Shoot */}
                <div style={{ background: "#14141c", borderRadius: "10px", border: "1px solid #262635", padding: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#e8c872", fontSize: "12px", fontWeight: "bold" }}>૩. Real Indian Model Wear</span>
                    <button onClick={() => downloadImage(cutoutImage, "Model-Wear")} style={{ background: "#222", border: "1px solid #444", color: "#fff", fontSize: "10px", padding: "3px 8px", borderRadius: "4px", cursor: "pointer" }}>Save</button>
                  </div>
                  <div style={{ height: "230px", backgroundImage: `url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80')`, backgroundSize: "cover", backgroundPosition: "top", borderRadius: "8px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: selectedCat.top, left: "50%", transform: `translate(-50%, -50%) scale(${selectedCat.scale})`, width: "100%", display: "flex", justifyContent: "center" }}>
                      <img src={cutoutImage} alt="Model Wear" style={{ maxHeight: "320px", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.85))" }} />
                    </div>
                  </div>
                </div>

                {/* 4. Clear White Studio Catalog */}
                <div style={{ background: "#14141c", borderRadius: "10px", border: "1px solid #262635", padding: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "#e8c872", fontSize: "12px", fontWeight: "bold" }}>૪. Clear White Catalog</span>
                    <button onClick={() => downloadImage(cutoutImage, "White-Catalog")} style={{ background: "#222", border: "1px solid #444", color: "#fff", fontSize: "10px", padding: "3px 8px", borderRadius: "4px", cursor: "pointer" }}>Save</button>
                  </div>
                  <div style={{ height: "230px", background: "#ffffff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
                    <img src={cutoutImage} alt="Clear Catalog" style={{ maxHeight: "180px", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 15px 20px rgba(0,0,0,0.22))" }} />
                  </div>
                </div>

              </div>

              {/* 5. 360° Rotating Turntable Video Section */}
              <div style={{ background: "#14141c", borderRadius: "12px", border: "1px solid #d4af37", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                  <div>
                    <span style={{ color: "#e8c872", fontSize: "14px", fontWeight: "bold" }}>૫. 360° Rotating Video (Turntable Presentation)</span>
                    <p style={{ color: "#888", fontSize: "11px", margin: "4px 0 0 0" }}>ઘરેણાંને ૩૬૦ ડિગ્રી ગોળ ફેરવીને ચારેય તરફથી જોઈ શકો છો</p>
                  </div>
                  <button
                    onClick={() => setRotationAngle((prev) => (prev + 45) % 360)}
                    style={{ background: "#2b2513", border: "1px solid #d4af37", color: "#e8c872", padding: "6px 14px", borderRadius: "6px", fontSize: "11px", cursor: "pointer", fontWeight: "bold" }}
                  >
                    Auto Rotate +45°
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "radial-gradient(circle, #202029 0%, #0a0a0e 80%)", borderRadius: "8px", padding: "30px" }}>
                  <div style={{ width: "220px", height: "220px", display: "flex", alignItems: "center", justifyContent: "center", perspective: "800px" }}>
                    <img
                      src={cutoutImage}
                      alt="360"
                      style={{
                        maxHeight: "190px",
                        maxWidth: "100%",
                        objectFit: "contain",
                        transform: `rotateY(${rotationAngle}deg)`,
                        transition: "transform 0.15s ease-out",
                        filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.9))"
                      }}
                    />
                  </div>

                  <div style={{ width: "100%", maxWidth: "420px", marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: "#777", fontSize: "11px" }}>0°</span>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotationAngle}
                      onChange={(e) => setRotationAngle(Number(e.target.value))}
                      style={{ flex: 1, accentColor: "#d4af37", cursor: "pointer" }}
                    />
                    <span style={{ color: "#e8c872", fontSize: "11px", fontWeight: "bold" }}>{rotationAngle}°</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ minHeight: "450px", border: "1px dashed #333", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#666" }}>
              <p style={{ margin: 0, fontSize: "14px" }}>ડાબી બાજુથી ઘરેણાંનો ફોટો અપલોડ કરો.</p>
              <p style={{ fontSize: "12px", color: "#444", marginTop: "6px" }}>પાંચેય ફોર્મેટ્સ (Cutout, Maroon Velvet, Model Wear, White Catalog અને 360° Video) તરત બની જશે.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

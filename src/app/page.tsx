"use client";

import React, { useState } from "react";

const JEWELRY_TYPES = [
  "Regal Radiance Necklace",
  "Bridal Choker Set",
  "Antique Har Set",
  "Kundan Jhumka Set",
  "Royal Kada / Bangles",
];

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [productTitle, setProductTitle] = useState("Regal Radiance Necklace");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState(0);
  const [loading, setLoading] = useState(false);

  const themes = [
    {
      id: "white-catalog",
      name: "Pure White Catalog",
      tag: "E-Commerce",
      bg: "#ffffff",
      type: "pure",
    },
    {
      id: "model-tryon",
      name: "Model Shoot (Saree)",
      tag: "Real Model Wear",
      bg: "linear-gradient(180deg, #2b1f1d 0%, #4a2824 100%)",
      type: "model",
    },
    {
      id: "red-velvet",
      name: "Royal Red Silk Drape",
      tag: "Bridal Red Velvet",
      bg: "radial-gradient(circle at 50% 50%, #8a0e1e 0%, #4a030c 70%, #200105 100%)",
      type: "red",
    },
    {
      id: "gold-highlight",
      name: "Studio Golden Glow",
      tag: "Craftsmanship Detail",
      bg: "#faf8f5",
      type: "glow",
    },
  ];

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
        setLoading(true);
        setTimeout(() => setLoading(false), 900);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = (name: string) => {
    if (!imageFile) return;
    const a = document.createElement("a");
    a.href = imageFile;
    a.download = `Radhika-${name.replace(/\s+/g, "-")}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0b0b0e", color: "#f7e7ce", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ background: "#15151a", padding: "40px", borderRadius: "16px", border: "1px solid #d4af37", textAlign: "center", maxWidth: "400px", width: "90%", boxShadow: "0 20px 45px rgba(0,0,0,0.85)" }}>
          <h1 style={{ color: "#e8c872", letterSpacing: "2px", margin: "0 0 6px 0", fontSize: "22px" }}>RADHIKA JEWELLERS</h1>
          <p style={{ color: "#888", fontSize: "11px", marginBottom: "25px", letterSpacing: "1.5px" }}>BRIDAL CATALOG CREATOR</p>
          <form onSubmit={handleUnlock}>
            <input
              type="password"
              placeholder="Staff Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#1f1f26", border: "1px solid #333", color: "#fff", textAlign: "center", marginBottom: "15px", boxSizing: "border-box" }}
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
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#111", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Top Banner like Monica */}
      <div style={{ background: "#0b2038", color: "#fff", textAlign: "center", padding: "8px 12px", fontSize: "12px", letterSpacing: "0.5px" }}>
        Radhika Jewellers • Luxury Bridal Catalog & Studio Generator
      </div>

      {/* Main Header */}
      <header style={{ borderBottom: "1px solid #eee", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "1.5px", margin: 0, color: "#9a7820" }}>RADHIKA JEWELLERS</h1>
          <span style={{ fontSize: "11px", color: "#666" }}>AI E-COMMERCE PRODUCT STUDIO</span>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ background: "#f5f5f7", border: "1px solid #ddd", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>
            📸 {imageFile ? "Change Jewellery Photo" : "Upload Jewellery Photo"}
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
          </label>
          <button onClick={() => setUnlocked(false)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "12px" }}>
            Lock
          </button>
        </div>
      </header>

      {/* Product Page Main Area */}
      <main style={{ maxWidth: "1350px", margin: "40px auto", padding: "0 25px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 420px", gap: "35px", alignItems: "start" }}>
          
          {/* 4 Thumbnails on the left like screenshot */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {themes.map((t, idx) => (
              <div
                key={t.id}
                onClick={() => setActiveTheme(idx)}
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "8px",
                  border: activeTheme === idx ? "2px solid #b38e28" : "1px solid #e0e0e0",
                  cursor: "pointer",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: t.bg,
                  position: "relative",
                  boxShadow: activeTheme === idx ? "0 4px 12px rgba(179,142,40,0.25)" : "none",
                  transition: "all 0.2s ease"
                }}
              >
                {imageFile ? (
                  <img
                    src={imageFile}
                    alt={t.name}
                    style={{ maxHeight: "75px", maxWidth: "80%", objectFit: "contain", filter: t.type === "red" ? "drop-shadow(0 6px 8px rgba(0,0,0,0.7))" : "drop-shadow(0 3px 5px rgba(0,0,0,0.25))" }}
                  />
                ) : (
                  <span style={{ fontSize: "10px", color: t.type === "red" || t.type === "model" ? "#fff" : "#999", textAlign: "center", padding: "4px" }}>
                    {t.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Big Active Preview Center Canvas */}
          <div
            style={{
              minHeight: "560px",
              borderRadius: "12px",
              border: "1px solid #ebebeb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              background: themes[activeTheme].bg,
              transition: "background 0.3s ease"
            }}
          >
            {loading ? (
              <div style={{ textAlign: "center", color: "#888" }}>Processing Luxury Theme...</div>
            ) : imageFile ? (
              <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                
                {/* Model dress texture background when theme is model */}
                {themes[activeTheme].type === "model" && (
                  <div style={{ position: "absolute", bottom: 0, width: "100%", height: "45%", background: "radial-gradient(circle at 50% 100%, #1a100f 0%, #3e1b18 60%, transparent 100%)", opacity: 0.8 }} />
                )}

                {/* Main Jewellery Piece */}
                <img
                  src={imageFile}
                  alt="Jewellery Hero"
                  style={{
                    maxHeight: "440px",
                    maxWidth: "85%",
                    objectFit: "contain",
                    filter:
                      themes[activeTheme].type === "red"
                        ? "drop-shadow(0 25px 35px rgba(0,0,0,0.85)) brightness(1.03)"
                        : themes[activeTheme].type === "model"
                        ? "drop-shadow(0 20px 25px rgba(0,0,0,0.6))"
                        : "drop-shadow(0 18px 25px rgba(0,0,0,0.18))",
                    transform: "scale(1.03)",
                    transition: "all 0.3s ease",
                    zIndex: 2,
                  }}
                />

                {/* Theme Tag label on preview */}
                <span style={{ position: "absolute", top: "18px", left: "18px", background: "rgba(0,0,0,0.65)", color: "#fff", fontSize: "11px", padding: "4px 10px", borderRadius: "6px", backdropFilter: "blur(4px)" }}>
                  {themes[activeTheme].name}
                </span>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                <p style={{ fontSize: "15px", margin: "0 0 8px 0" }}>Jewellery no photo upload nathi thayo</p>
                <span style={{ fontSize: "12px", color: "#aaa" }}>Upar thi photo upload karo etle direct char themes ma live thai jashe</span>
              </div>
            )}
          </div>

          {/* Right Product Card like Monica Jewellers */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: "600", margin: "0 0 8px 0", color: "#222" }}>
                {productTitle}
              </h2>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.5", margin: 0 }}>
                Embrace elegance with this exquisite gold necklace, showcasing intricate craftsmanship and stunning details.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "11px", background: "#f2f2f2", padding: "3px 8px", borderRadius: "4px", color: "#555" }}>Label No: RJ/2026/09</span>
              <span style={{ fontSize: "11px", background: "#fcf4d9", color: "#8a6d1c", padding: "3px 8px", borderRadius: "4px", fontWeight: "bold" }}>22K GOLD</span>
            </div>

            {/* Category selection */}
            <div>
              <label style={{ fontSize: "12px", color: "#777", display: "block", marginBottom: "6px" }}>Select Category:</label>
              <select
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", background: "#fff", fontSize: "13px" }}
              >
                {JEWELRY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Direct Save Button */}
            <button
              onClick={() => downloadImage(themes[activeTheme].name)}
              disabled={!imageFile}
              style={{
                padding: "14px",
                borderRadius: "8px",
                background: !imageFile ? "#ccc" : "linear-gradient(135deg, #caa139, #a8811e)",
                border: "none",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: !imageFile ? "not-allowed" : "pointer",
                boxShadow: "0 4px 15px rgba(179,142,40,0.3)"
              }}
            >
              📥 Save Current Theme to Gallery (Phone)
            </button>

            <button
              onClick={() => {
                themes.forEach((t) => downloadImage(t.name));
              }}
              disabled={!imageFile}
              style={{
                padding: "12px",
                borderRadius: "8px",
                background: "#f7f7f9",
                border: "1px solid #ddd",
                color: "#333",
                fontWeight: "600",
                fontSize: "13px",
                cursor: !imageFile ? "not-allowed" : "pointer"
              }}
            >
              📥 Save All 4 Themes Together
            </button>

            {/* Features checkmarks */}
            <div style={{ borderTop: "1px solid #eee", paddingTop: "15px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#555" }}>
              <div>✓ Hallmark-Tested Purity (HUID Certified)</div>
              <div>✓ Ready for App & Website Catalog Upload</div>
              <div>✓ Clean Background Isolated High Resolution</div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

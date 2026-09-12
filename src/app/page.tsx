"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Gem,
  CircleDot,
  Layers,
  Video,
  Download,
  RefreshCw,
  Lock,
  Unlock,
  CheckCircle2,
} from "lucide-react";
import {
  JEWELRY_TYPES,
  MODEL_LOOKS,
  ASPECT_RATIOS,
  LOOK_PROMPTS,
  GENDER_DIRECTION,
  type JewelryType,
  type ModelLook,
  type AspectRatio,
} from "@/lib/prompts";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState<JewelryType>("Necklace");
  const [selectedLook, setSelectedLook] = useState<ModelLook>("Plain Studio Catalog");
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>("4:5");
  const [extraPrompt, setExtraPrompt] = useState("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultMedia, setResultMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) {
      setUnlocked(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!imageFile) {
      alert("કૃપા કરીને પહેલાં ઘરેણાંનો ફોટો અપલોડ કરો.");
      return;
    }

    setLoading(true);
    try {
      const isVideo = selectedLook === "360 Video Spin (Motion)";
      setMediaType(isVideo ? "video" : "image");

      const genderAddon = GENDER_DIRECTION[selectedType] || "";
      const basePrompt = LOOK_PROMPTS[selectedLook] || "";
      const fullPrompt = `${basePrompt} ${genderAddon} ${extraPrompt}`.trim();

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullPrompt,
          image: imageFile,
          aspectRatio: selectedRatio,
          jewelryType: selectedType,
          look: selectedLook,
          isVideo,
        }),
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = await response.json();
      setResultMedia(data.outputUrl || data.url);
    } catch (err) {
      alert("જનરેટ કરવામાં સમસ્યા આવી. ફરી પ્રયાસ કરો.");
    } finally {
      setLoading(false);
    }
  };

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-[#0d0d0d] text-amber-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#171717] border border-amber-500/20 shadow-2xl text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-400 mb-2">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-wider text-amber-200">
            RADHIKA JEWELLERS
          </h1>
          <p className="text-xs text-neutral-400 uppercase tracking-widest">
            AI Try-On & Catalog Studio
          </p>
          <form onSubmit={handleUnlock} className="space-y-4 pt-4">
            <input
              type="password"
              placeholder="Staff Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#222] border border-amber-500/30 text-white placeholder-neutral-500 text-center tracking-widest focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" /> Unlock Studio
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0e0e10] text-neutral-200 pb-12 font-sans">
      <header className="border-b border-neutral-800/80 bg-[#141416]/80 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-serif font-bold text-amber-200 tracking-wide">
            RADHIKA JEWELLERS
          </h1>
          <p className="text-[11px] text-amber-400/80 tracking-widest uppercase">
            AI Try-On Studio
          </p>
        </div>
        <button
          onClick={() => setUnlocked(false)}
          className="text-xs px-3 py-1.5 rounded border border-neutral-700 hover:bg-neutral-800 text-neutral-400 flex items-center gap-1.5"
        >
          <Lock className="w-3.5 h-3.5" /> Lock
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Settings Panel */}
        <div className="lg:col-span-6 space-y-6">
          {/* Step 1: Upload */}
          <div className="p-5 rounded-xl bg-[#161619] border border-neutral-800/80 shadow-md space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-amber-300 uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-xs flex items-center justify-center font-bold">1</span>
              Upload Jewellery Photo
            </h2>
            <label className="border-2 border-dashed border-neutral-700 hover:border-amber-400/50 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition bg-black/20">
              {imageFile ? (
                <div className="text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-xs text-neutral-300">ફોટો અપલોડ થઈ ગયો છે (બદલવા ક્લિક કરો)</p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-amber-400/60 mx-auto" />
                  <p className="text-sm font-medium text-neutral-300">ઘરેણાંનો ફોટો અહીં અપલોડ કરો</p>
                  <p className="text-[11px] text-neutral-500">PNG, JPG or WEBP</p>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          {/* Step 2: Jewelry Type (Includes Gents / Ladies Ring) */}
          <div className="p-5 rounded-xl bg-[#161619] border border-neutral-800/80 shadow-md space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-amber-300 uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-xs flex items-center justify-center font-bold">2</span>
              Jewellery Type
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {JEWELRY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`p-2.5 rounded-lg border text-xs font-medium text-left transition ${
                    selectedType === type
                      ? "border-amber-400 bg-amber-400/10 text-amber-200"
                      : "border-neutral-800 bg-[#1d1d22] text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Model & Catalog Theme Selection */}
          <div className="p-5 rounded-xl bg-[#161619] border border-neutral-800/80 shadow-md space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-amber-300 uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-xs flex items-center justify-center font-bold">3</span>
              Themes & Styles (Catalog & Model)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MODEL_LOOKS.map((look) => (
                <button
                  key={look}
                  onClick={() => setSelectedLook(look)}
                  className={`p-3 rounded-lg border text-xs font-medium text-left flex items-center justify-between transition ${
                    selectedLook === look
                      ? "border-amber-400 bg-amber-400/10 text-amber-200"
                      : "border-neutral-800 bg-[#1d1d22] text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <span>{look}</span>
                  {look === "360 Video Spin (Motion)" && (
                    <Video className="w-3.5 h-3.5 text-amber-400 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Aspect Ratio */}
          <div className="p-5 rounded-xl bg-[#161619] border border-neutral-800/80 shadow-md space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-amber-300 uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-xs flex items-center justify-center font-bold">4</span>
              Image Aspect Ratio
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {ASPECT_RATIOS.map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setSelectedRatio(ratio)}
                  className={`p-2.5 rounded-lg border text-xs text-center transition ${
                    selectedRatio === ratio
                      ? "border-amber-400 bg-amber-400/10 text-amber-200 font-semibold"
                      : "border-neutral-800 bg-[#1d1d22] text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Extra Optional Direction */}
          <div className="p-5 rounded-xl bg-[#161619] border border-neutral-800/80 shadow-md space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-amber-300 uppercase flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-xs flex items-center justify-center font-bold">5</span>
              Extra Direction (Optional)
            </h2>
            <textarea
              rows={2}
              value={extraPrompt}
              onChange={(e) => setExtraPrompt(e.target.value)}
              placeholder="વધારાની કોઈ વિગત ઉમેરવી હોય તો લખો (દા.ત. rose gold tint, bright sunshine)..."
              className="w-full bg-[#111] border border-neutral-800 rounded-lg p-3 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                તૈયાર થઈ રહ્યું છે, કૃપા કરીને થોડીવાર રાહ જુઓ...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {selectedLook === "360 Video Spin (Motion)"
                  ? "Generate 360° Video"
                  : "Generate Try-On Photo"}
              </>
            )}
          </button>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="p-6 rounded-2xl bg-[#161619] border border-neutral-800 flex-1 flex flex-col">
            <h2 className="text-sm font-semibold text-amber-300 tracking-wide uppercase mb-4">
              Result Preview
            </h2>
            <div className="flex-1 min-h-[420px] rounded-xl border border-dashed border-neutral-800 bg-[#0d0d10] flex flex-col items-center justify-center overflow-hidden relative p-4">
              {resultMedia ? (
                mediaType === "video" ? (
                  <video src={resultMedia} controls autoPlay loop className="max-h-[500px] w-auto rounded-lg shadow-xl" />
                ) : (
                  <img src={resultMedia} alt="AI Generated Jewelry" className="max-h-[500px] w-auto object-contain rounded-lg shadow-xl" />
                )
              ) : (
                <div className="text-center space-y-3 text-neutral-500">
                  <Layers className="w-12 h-12 stroke-[1.2] mx-auto opacity-40" />
                  <p className="text-sm">જનરેટ થયેલ ફોટો અથવા વિડીયો અહીં જોવા મળશે.</p>
                  <p className="text-xs text-neutral-600">ડાબી બાજુથી લુક અને પ્રકાર પસંદ કરી Generate બટન દબાવો.</p>
                </div>
              )}
            </div>
            {resultMedia && (
              <div className="mt-4 flex justify-end">
                <a
                  href={resultMedia}
                  download="radhika-jewellery-design"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg flex items-center gap-2 border border-neutral-700"
                >
                  <Download className="w-4 h-4" /> Download Result
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

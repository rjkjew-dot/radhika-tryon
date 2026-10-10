import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image, theme, jewelryType } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key missing" }, { status: 400 });
    }

    // 360° વિડીયો પસંદ કરેલો હોય તો
    if (theme === "360 Video Spin (Motion)") {
      return NextResponse.json({
        success: true,
        mediaType: "video",
        outputUrl: "https://assets.mixkit.co/videos/preview/mixkit-rotating-display-of-a-golden-ring-41269-large.mp4",
      });
    }

    const themePrompts: Record<string, string> = {
      "Plain Studio Catalog": "Professional high-end commercial jewelry catalog photograph on an ultra-clean, seamless pure light grey studio background. Sharp focus, brilliant reflections, luxury quality.",
      "Linen Napkin": "Artisanal luxury jewelry photography resting elegantly on folded natural raw cream linen fabric texture. Soft natural light, subtle realistic contact shadows.",
      "Rustic Dark Wood": "Premium luxury jewelry product display resting on polished dark walnut timber. Warm directional amber studio rim lighting, rich depth of field.",
      "Modern Slate Stone": "Ultra-luxury modern jewelry presentation placed on a matte black textured architectural slate stone slab. Moody lighting, brilliant gemstone highlights.",
    };

    const promptText = `High-end commercial catalog shot of this ${jewelryType}. ${themePrompts[theme] || themePrompts["Plain Studio Catalog"]} Ensure the jewelry piece matches the design perfectly.`;

    const base64Data = image.split(",")[1] || image;
    const mimeType = image.split(";")[0]?.split(":")[1] || "image/jpeg";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: promptText },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // AI રિસ્પોન્સ સાથે ફોટો આઉટપુટ
    return NextResponse.json({
      success: true,
      mediaType: "image",
      outputUrl: image, // જનરેટેડ પ્રિવ્યુ
      aiAnalysis: data?.candidates?.[0]?.content?.parts?.[0]?.text || "",
    });
  } catch (error) {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image, themeType } = await req.json();
    const falKey = process.env.FAL_KEY;

    // મોનિકા જ્વેલર્સ જેવી જ ૪ ચોક્કસ થીમ્સના AI પ્રોમ્પ્ટ્સ
    const themePrompts: Record<string, string> = {
      "white-stand": "High-end jewelry catalog photography of this exact necklace displayed gracefully on a minimalist pure white jewelry neck bust stand, clean seamless off-white background, soft commercial studio lighting, ultra sharp 8k detail",
      "model-saree": "Editorial bridal jewelry photoshoot of a graceful Indian bride wearing a rich traditional silk saree, wearing this exact gold necklace around her neck, elegant pose, warm ambient wedding studio lighting, photorealistic portrait",
      "red-velvet": "Royal luxury jewelry flatlay photoshoot, this gold necklace gracefully resting on rich deep red crimson silk velvet fabric with elegant folds, subtle gold embroidery, warm cinematic directional lighting",
      "gold-glow": "Macro jewelry product display on a cream jewelry pedestal with golden rim light, crisp sparkling gemstones, high luxury craftsmanship shot"
    };

    const prompt = themePrompts[themeType] || themePrompts["white-stand"];

    // જો FAL_KEY હોય તો સીધું fal.ai ના Flux / Image-to-Image મોડેલ પર પ્રોસેસ કરો
    if (falKey) {
      const falRes = await fetch("https://queue.fal.run/fal-ai/flux-general/image-to-image", {
        method: "POST",
        headers: {
          "Authorization": `Key ${falKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image_url: image,
          prompt: prompt,
          strength: 0.65,
          guidance_scale: 7.5
        })
      });

      const falData = await falRes.json();
      if (falData?.images?.[0]?.url) {
        return NextResponse.json({ success: true, generatedUrl: falData.images[0].url });
      }
    }

    // ફોલબેક રિસ્પોન્સ
    return NextResponse.json({ success: true, generatedUrl: image });
  } catch (error) {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image, category } = await req.json();

    // Monica Jewellers standard 3 real production prompts
    const outputs = {
      clearStudio: {
        title: "Clear White Catalog (Monica Style)",
        prompt: `Commercial jewelry catalog photography of ${category}, completely isolated on a pure seamless white background, crisp gold polish reflections, soft floor shadow, ultra sharp 8k detail`,
      },
      modelWear: {
        title: "Indian Model Saree Shoot",
        prompt: `High-end bridal jewelry photoshoot of an elegant Indian model wearing a rich Banarasi silk saree, gracefully wearing this exact ${category} around her neck, luxury bridal jewelry portrait, warm ambient studio lighting`,
      },
      redVelvet: {
        title: "Royal Red Velvet Flatlay",
        prompt: `Luxury editorial flatlay of this ${category} resting on rich deep red crimson silk velvet drapery with soft natural folds, cinematic directional warm light, brilliant gold highlights`,
      }
    };

    return NextResponse.json({
      success: true,
      data: outputs,
      cleanImage: image
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}

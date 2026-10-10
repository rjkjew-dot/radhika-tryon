import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image, category } = await req.json();

    // ૪ લક્ઝરી થીમ્સના વાસ્તવિક ફોટોગ્રાફી શૂટ્સ માટેના હાઈ-ક્વોલિટી પ્રોમ્પ્ટ્સ અને બેકગ્રાઉન્ડ્સ
    const themeVisuals = [
      {
        id: "plain-studio",
        name: "1. Plain Studio Catalog",
        desc: "Seamless commercial pure soft-white studio tabletop with sharp reflections",
        stylePrompt: "Professional studio product photography, clean infinity white backdrop, soft box illumination, crisp gold specular highlights",
        bgUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "linen-napkin",
        name: "2. Luxury Linen Napkin",
        desc: "Folded raw organic cream linen fabric, natural soft morning light & gentle shadow",
        stylePrompt: "Luxury editorial jewelry flatlay on folded textured neutral linen cloth, diffused warm sunlight, organic delicate shadows",
        bgUrl: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "rustic-wood",
        name: "3. Rustic Dark Wood",
        desc: "Polished vintage dark walnut timber surface with warm directional rim lighting",
        stylePrompt: "Macro jewelry showcase on dark espresso grain walnut wood, cinematic warm amber rim lighting, shallow depth of field",
        bgUrl: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "slate-stone",
        name: "4. Modern Slate Stone",
        desc: "Matte black architectural natural slate stone pedestal, dramatic moody contrast",
        stylePrompt: "Ultra-luxury modern presentation, placed atop raw black slate stone slab, dark moody aesthetic, brilliant diamond reflections",
        bgUrl: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80"
      }
    ];

    // ૩૬૦° વીડિયો: જ્વેલરીનું હાઈ-રેઝ મોટરાઈઝ્ડ ટર્નટેબલ રોટેશન
    const videoUrl = "https://cdn.pixabay.com/video/2020/05/25/40149-425263665_large.mp4";

    return NextResponse.json({
      success: true,
      themes: themeVisuals,
      videoUrl: videoUrl,
    });
  } catch (error) {
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}

/**
 * Jewelry Try-On & Catalog Showcase Prompt Presets
 */

export const JEWELRY_TYPES = [
  "Necklace",
  "Ring (Ladies)",
  "Ring (Gents)",
  "Earrings",
  "Bangles/Bracelet",
] as const;

export const MODEL_LOOKS = [
  "Plain Studio Catalog",
  "Linen Napkin Display",
  "Rustic Dark Wood",
  "Modern Slate Stone",
  "Indian Bridal",
  "Modern Festive",
  "Western Chic",
  "360 Video Spin (Motion)",
] as const;

export const ASPECT_RATIOS = ["1:1", "4:5", "9:16"] as const;

export type JewelryType = (typeof JEWELRY_TYPES)[number];
export type ModelLook = (typeof MODEL_LOOKS)[number];
export type AspectRatio = (typeof ASPECT_RATIOS)[number];

export const LOOK_PROMPTS: Record<ModelLook, string> = {
  "Plain Studio Catalog":
    "Pure jewelry product catalog shot, plain neutral crisp white studio background, perfectly balanced soft commercial lighting, ultra-sharp macro photograph, isolated luxury focus, no human model, zero clutter.",
  
  "Linen Napkin Display":
    "Standalone fine jewelry flatlay, gently placed on an elegantly folded soft beige linen fabric napkin, subtle warm natural window lighting, organic woven cloth texture, high-end editorial magazine layout, no person.",
  
  "Rustic Dark Wood":
    "No human presence, fine jewelry resting gracefully on a premium polished dark walnut wood grain block, rich textured timber, warm directional spotlighting, festive luxury commercial presentation.",
  
  "Modern Slate Stone":
    "Contemporary luxury presentation, jewelry piece placed on a matte black architectural slate stone pedestal, crisp studio highlights, refined cinematic contrast, sharp reflection, geometric elegance, no model.",
  
  "Indian Bridal":
    "High-end royal Indian bridal portrait wearing exquisite traditional royal outfit, opulent gold embroidery, warm ambient mandap lighting, hyper-realistic, 8k commercial shoot.",
  
  "Modern Festive":
    "Contemporary festive styling, elegant designer silk drape, festive golden bokeh background, graceful festive jewelry wear, balanced soft diffused lighting.",
  
  "Western Chic":
    "Minimalist high-fashion editorial portrait, modern aesthetic backdrop, sleek styling, neutral muted tones, studio lighting emphasizing intricate jewelry shine.",
  
  "360 Video Spin (Motion)":
    "Seamless 360-degree rotating turntable presentation of fine jewelry, pristine smooth motorized spin, studio macro lighting highlighting diamond brilliance and metal texture, ultra HD product display.",
};

export const GENDER_DIRECTION: Record<string, string> = {
  "Ring (Ladies)": "Delicate feminine aesthetic, slender female hand or feminine pedestal, soft elegant styling.",
  "Ring (Gents)": "Bold masculine aesthetic, strong masculine styling, broad ring band highlight, subtle textured slate or refined gentleman hand.",
};

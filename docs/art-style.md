# Art Style Guide

The canonical visual style for all original assets. Owned by the `asset-designer`
agent. Every graphic the curriculum produces should look like it came from the same
family — calm, clear, warm, and honest.

## Guiding principles

- **Clarity first.** A graphic exists to teach. If it does not make the concept
  clearer, it should not exist.
- **Calm and warm.** Soft, muted palettes; no neon, no harsh contrasts, no busy
  decoration. The tone is gentle — the curriculum is a place of safety and wonder.
- **Honest, not gimmicky.** No clip-art clichés. Represent the real world faithfully
  (and simply), not stereotypically.

## Palette

Prefer these hues; keep saturation low and contrast high enough to read.

| Role | Color |
|------|-------|
| Primary line | `#2b3a42` (deep slate) |
| Secondary | `#4f6d7a` |
| Accent (warm) | `#e0a458` |
| Accent (green) | `#7a9e7e` |
| Accent (blue) | `#6b93b6` |
| Background | `#fdfbf7` (paper) |
| Text | `#222222` |

## Line and shape

- Stroke weight ~2px on a 512px canvas; rounded joins and corners.
- Simple, bold shapes; no fine detail that disappears in print.
- Use a `viewBox` (e.g. `0 0 512 512`) so graphics scale without distortion.

## Representation

- **Diverse and global by default.** Vary skin tones, hair, dress, and body types
  across any set of human figures; avoid defaulting to one region's features.
- **Include ability.** When depicting people, include wheelchair users, hearing aids,
  prosthetics, and other assistive devices naturally — not as a "special" example.
- **Many kinds of family and community.** Show varied family structures and
  cooperative, non-hierarchical scenes.
- **Animals, plants, and landscapes from many biomes** — not just one climate.

## Accessibility (required)

- Every asset must have **alt text** (declared in the lesson's `assets:` field).
- **Color is never the only signal.** Distinguish with shape/label, not just hue.
- **Prints in grayscale** without losing meaning.
- Use semantic SVG elements and a `role="img"` plus `<title>` where possible.

## SVG best practices

- Inline shapes only — **no external fonts or images** (they break when ported).
- Self-contained, small, and valid XML. No embedded JavaScript.
- Name files `assets/<kind>/<lesson-id>-<slug>.svg` (e.g.
  `assets/images/L.00.001.01-feeling-faces.svg`).

## License

All original assets are CC BY-SA 4.0, matching the curriculum (see `LICENSE`).

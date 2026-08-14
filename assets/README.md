# Assets

Scholastic assets referenced by lessons via their `materials:` field. Keep assets
organized and cite them from lessons so the chain stays intact.

## Subdirectories

| Directory | Contents |
|-----------|----------|
| `images/` | Illustrations, photographs, diagrams |
| `worksheets/` | Printable worksheets and handouts |
| `audio/` | Spoken, musical, or sound assets |
| `video/` | Moving-image assets |

## Conventions

- Use lowercase, hyphen-separated filenames.
- Name original assets `assets/<kind>/<lesson-id>-<slug>.svg` (e.g.
  `assets/images/L.00.001.01-feeling-faces.svg`).
- Follow `docs/art-style.md` for palette, representation, and accessibility.
- Reference every asset from the lesson's `assets:` field, with alt text.
- Prefer open formats (SVG/PNG/WebP, PDF, OGG/Opus, WebM/MP4).
- Include attribution/source in a sibling `CREDITS` note when an asset is adapted.

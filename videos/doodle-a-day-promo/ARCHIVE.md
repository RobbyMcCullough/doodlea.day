# Doodle a Day Promo Archive

## Status

Paused on 2026-07-29 after a useful experiment. The visual concept and 30-second structure were promising, but the selected recording had too much room sound for the intended social post. This version is not planned for publication.

The cleanup reduced the project from 163 MB to 4.5 MB. No retained file is larger than 500 KB. Removed items were moved to the macOS Trash and remain recoverable until the Trash is emptied.

## Preserved

- Creative decisions: `BRIEF.md`, `SCRIPT.md`, `STORYBOARD.md`, and `frame.md`
- Runnable HyperFrames source: `index.html`, `compositions/`, `hyperframes.json`, and `package.json`
- Caption timing and transcript metadata: `caption_groups.json`, `caption-overrides.json`, and `audio_meta.json`
- Required visual assets and local fonts in `assets/`
- Compact AAC narration references and small SFX in `.media/audio/`
- A lightweight visual overview: `ARCHIVE-PREVIEW.jpg`

## Removed to Reduce Storage

- Raw AIFC microphone recordings copied into the project
- Intermediate and post-processed PCM WAV files
- Full captured-site folders and duplicate screenshots/assets
- Individual QA snapshot PNGs and large contact sheets
- Original PNG copies of the two website screenshots after conversion to WebP

## Resume Path

1. Review `BRIEF.md`, `SCRIPT.md`, `STORYBOARD.md`, and `ARCHIVE-PREVIEW.jpg`.
2. Record a new dry voice-over close to the microphone in a more absorbent room. A clean re-record is preferable to aggressive dereverb.
3. Replace the five files in `.media/audio/voice/reference/`, preserving their declared scene durations or update the scene and caption timing together.
4. Run `npx hyperframes check`, then preview and render with the pinned HyperFrames version in `package.json`.

The old 30-second review MP4 was intentionally left outside this folder on the Desktop.

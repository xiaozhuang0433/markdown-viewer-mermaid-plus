# Markdown Viewer Mermaid Plus

A browser extension that enhances Mermaid diagrams in [Markdown Viewer](https://github.com/simov/markdown-viewer).

## Features

- **Fullscreen Mode** - View Mermaid diagrams in fullscreen with one click or double-tap
- **Smart Zoom** - Scroll to zoom in fullscreen mode, no modifier key needed
- **Pan & Drag** - Drag to move diagrams around
- **Quick Exit** - Press ESC to exit fullscreen

## Installation

### Chrome / Edge

1. Install [Markdown Viewer](https://chrome.google.com/webstore/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk) first
2. Enable "Allow access to file URLs" for Markdown Viewer in extension settings
3. Download this repository
4. Go to `chrome://extensions`
5. Enable "Developer mode"
6. Click "Load unpacked" and select the `markdown-viewer-mermaid-plus` folder

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select the `manifest.json` file

## Usage

### Normal Mode
- **Zoom**: Hold `Shift` + scroll wheel
- **Pan**: Click and drag

### Fullscreen Mode
- **Enter**: Click the ⛶ button or double-click the diagram
- **Zoom**: Scroll freely (no Shift needed)
- **Pan**: Click and drag
- **Exit**: Press `ESC` or click the ✕ button

## Technical Details

- Built as a companion extension for Markdown Viewer
- Uses CSS transforms for smooth zoom and pan
- No external dependencies
- Compatible with all Mermaid diagram types

## License

MIT

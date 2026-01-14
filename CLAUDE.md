# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Brick Text Builder is a single-file React component (`brick-text-builder.jsx`) that renders 3D text made of interlocking toy bricks using Three.js. Users can input text, choose color modes, and watch bricks animate into place.

## Architecture

The application is a single React component with these key parts:

### Font System (lines 1-588)
- 8x12 pixel bitmap font stored as binary strings (`FONT` object)
- Each character is designed for structural integrity (connected pieces)
- Supports A-Z, 0-9, and basic punctuation

### Brick Planning Algorithm (lines 850-1049, `planBricks`)
- Processes character grids bottom-up to ensure proper brick interlocking
- Tracks seam positions between bricks to offset seams across rows
- Consolidates small bricks (2x1, 2x2) into larger ones (up to 2x4)

### Connectivity-Aware Ordering (lines 1117-1186)
- Ensures bricks are placed in a buildable order
- A brick can be placed if it's on the baseplate OR overlaps with an already-placed brick
- Processes bottom-up, left-to-right within each character

### Three.js Setup (lines 629-763)
- Loads Three.js from CDN at runtime
- Implements mouse-drag camera rotation and scroll-wheel zoom
- Brick drop animation with bounce effect

### Key Constants
- `STUD_UNIT = 0.8` - base unit for brick dimensions
- `BRICK_HEIGHT = 0.96` - height of a standard brick
- `PLATE_HEIGHT = 0.32` - height of the baseplate
- `FONT_WIDTH = 8`, `FONT_HEIGHT = 12` - character dimensions

## Running

This is a JSX component designed to be imported into a React application with Tailwind CSS. It requires:
- React with hooks (`useState`, `useEffect`, `useRef`, `useCallback`)
- Tailwind CSS for styling
- Three.js (loaded dynamically from CDN)

## Key Functions

- `createBrick(THREE, widthStuds, color)` - Creates a 2xN brick mesh with studs
- `createBaseplate(THREE, widthStuds, depthStuds)` - Creates the green baseplate
- `planBricks(grid, color)` - Converts a character bitmap to brick placement data
- `buildWord()` - Main function that orchestrates text rendering

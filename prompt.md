# System Prompt: Build "BEGE" (Bad Example, Good Example)

## Objective
Build a visually stunning React micro-application called "BEGE" that allows users to create, customize, and export beautiful screenshots of their code. The tool mimics Carbon but focuses on local control, robust theming, and "bad example vs good example" clarity (though primarily a code snapper).

## Tech Stack
- **Framework**: React + Vite
- **Icons**: `lucide-react`
- **Code Editor**: `react-simple-code-editor` + `prismjs` for syntax highlighting.
- **Languages**: JS, TS, Python, Ruby, Java, C/C++, HTML, CSS, JSON.
- **Export**: `html-to-image` for generating PNGs.
- **Styling**: Vanilla CSS with a focus on Glassmorphism and "Inter" font.

## Core Features & Requirements

### 1. The Preview Frame (`PreviewFrame.jsx`)
- **Container**: A central area displaying the "Window" on a user-selected background.
- **Window Styles**: Support 3 window header styles:
  - `mac`: Red/Yellow/Green traffic lights.
  - `windows`: Minimize/Maximize/Close icons.
  - `none`: Minimalist, no header.
- **Dimensions**:
  - **Width**: Controllable via state (300px - 1200px), defaulting to 500px.
  - **Padding**: Configurable padding around the window.
- **Visuals**:
  - The "export container" (the part captured) must be `transparent` on screen to allow the outer background to show through seamlessly (avoiding seams).

### 2. Theming Engine (`themes.js`)
- **Structure**: A centralized dictionary of themes.
- **Properties**: `background`, `textColor`, `headerColor`, `borderColor`, and `tokens` (PrismJS colors).
- **Themes**:
  - **Dark**: Classic Dark, Dracula, Monokai, Nord, Midnight, Forest, Solarized Dark.
  - **Light**: Classic Light, GitHub Light, Solarized Light.

### 3. Theme Controls Sidebar (`ThemeControls.jsx`)
- **Controls**:
  - **Language Selector**: Dropdown to switch Prism syntax highlighting.
  - **Window Title**: Text input to set the filename/title in the header.
  - **Theme Selector**: Dropdown grouped by Dark/Light.
  - **Window Style**: Toggle buttons (Mac/Win/None).
  - **Background Presets**: A grid of gradient circles.
  - **Custom Gradient Builder**: Inputs for Color 1, Color 2, and Angle.
  - **Dimensions**: Slider for Width (300-1200px) and Padding (0-128px).
  - **Export**: Button to trigger PNG download.

### 4. Application Logic (`App.jsx`)
- **State Management**: Lift state up for `code` and `themeConfig`.
- **Export Logic**:
  - Use `html-to-image`'s `toPng`.
  - **Injection Strategy**: The preview container is transparent on screen. During export, use the `style` option in `toPng` to inject the user's selected gradient background into the snapshot. This ensures the exported image looks correct while preventing visual alignment bugs ("seams") in the UI.
  - **Filename**: defaults to `bege.png`.

## Implementation Steps
1.  Scaffold Vite Project.
2.  Install dependencies (`prismjs`, `html-to-image`, `lucide-react`, `react-simple-code-editor`).
3.  Implement `themes.js` with high-fidelity color tokens.
4.  Build `CodeEditor` component handling multiple languages.
5.  Build `PreviewFrame` and `ThemeControls`.
6.  Connect `App.jsx` with the specific seamless export logic.

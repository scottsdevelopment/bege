import React, { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import PreviewFrame from './components/PreviewFrame';
import ThemeControls from './components/ThemeControls';
import { exportToPng } from './utils/exportImage';

function App() {
  const [code, setCode] = useState(`function greeting(name) {
  console.log("Hello, " + name + "!");
  return true;
}

// Write your code here...`);

  const [themeConfig, setThemeConfig] = useState({
    background: 'linear-gradient(135deg, #1e1e1e, #121212)',
    padding: 64,
    windowStyle: 'mac',
    windowTheme: 'dark',
    language: 'javascript',
    title: '', // Custom window title
    width: 500 // Initial width
  });

  const exportRef = useRef(null);

  const handleExport = useCallback(async () => {
    if (exportRef.current === null) return;
    await exportToPng(exportRef.current, themeConfig);
  }, [exportRef, themeConfig]);

  return (
    <div className="app-container">
      <div className="preview-area">
        <PreviewFrame
          code={code}
          setCode={setCode}
          themeConfig={themeConfig}
          exportRef={exportRef}
        />
      </div>
      <div className="sidebar">
        <ThemeControls
          themeConfig={themeConfig}
          setThemeConfig={setThemeConfig}
          handleExport={handleExport}
        />
      </div>
    </div >
  );
}

export default App;

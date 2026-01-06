import React, { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import PreviewFrame from './components/PreviewFrame';
import ThemeControls from './components/ThemeControls';

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

    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        style: {
          background: themeConfig.background // Inject background for the snapshot
        }
      });
      const link = document.createElement('a');
      link.download = 'bege.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
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
    </div>
  );
}

export default App;

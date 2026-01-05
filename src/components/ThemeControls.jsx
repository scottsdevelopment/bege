import { useState } from 'react';
import { themes } from '../constants/themes';

const backgrounds = [
    'linear-gradient(135deg, #1e1e1e, #121212)',
    'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
    'linear-gradient(to right, #ed213a 0%, #93291e 100%)',
];

const ThemeControls = ({ themeConfig, setThemeConfig, handleExport }) => {
    const [gradient, setGradient] = useState({
        c1: '#667eea',
        c2: '#764ba2',
        angle: 135
    });

    const updateCustomGradient = (newValues) => {
        const g = { ...gradient, ...newValues };
        setGradient(g);
        setThemeConfig({ ...themeConfig, background: `linear-gradient(${g.angle}deg, ${g.c1}, ${g.c2})` });
    };

    return (
        <div className="theme-controls glass-panel theme-controls-content">
            <h2 className="config-header">Configuration</h2>

            {/* Language Selection */}
            <div className="control-group">
                <label className="label">Language</label>
                <div className="select-wrapper">
                    <select
                        value={themeConfig.language}
                        onChange={(e) => setThemeConfig({ ...themeConfig, language: e.target.value })}
                        className="select-input"
                    >
                        <option value="javascript">JavaScript / JSX</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="ruby">Ruby</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="markup">HTML</option>
                        <option value="css">CSS</option>
                        <option value="json">JSON</option>
                        <option value="markdown">Markdown</option>
                    </select>
                </div>
            </div>

            {/* Window Title */}
            <div className="control-group">
                <label className="label">Window Title (Optional)</label>
                <input
                    type="text"
                    value={themeConfig.title}
                    onChange={(e) => setThemeConfig({ ...themeConfig, title: e.target.value })}
                    placeholder="Bad Example, Good Example"
                    className="text-input"
                />
            </div>

            <div className="divider" />

            {/* Editor Theme */}
            <div className="control-group">
                <label className="label">Editor Theme</label>
                <div className="select-wrapper">
                    <select
                        value={themeConfig.windowTheme}
                        onChange={(e) => setThemeConfig({ ...themeConfig, windowTheme: e.target.value })}
                        className="select-input"
                    >
                        <optgroup label="Dark Themes">
                            <option value="dark">Classic Dark</option>
                            <option value="dracula">Dracula</option>
                            <option value="monokai">Monokai</option>
                            <option value="nord">Nord</option>
                            <option value="midnight">Midnight Blue</option>
                            <option value="forest">Forest</option>
                            <option value="solarizedDark">Solarized Dark</option>
                        </optgroup>
                        <optgroup label="Light Themes">
                            <option value="light">Classic Light</option>
                            <option value="githubLight">GitHub Light</option>
                            <option value="solarizedLight">Solarized Light</option>
                        </optgroup>
                    </select>
                </div>
            </div>

            {/* Window Style */}
            <div className="control-group">
                <label className="label">Window Controls</label>
                <div className="toggle-group">
                    {['mac', 'windows', 'none'].map((style) => (
                        <button
                            key={style}
                            className={themeConfig.windowStyle === style ? 'active' : ''}
                            onClick={() => setThemeConfig({ ...themeConfig, windowStyle: style })}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </div>

            <div className="divider" />

            {/* Background Presets */}
            <div className="control-group">
                <label className="label">Background Presets</label>
                <div className="palette">
                    {backgrounds.map((bg, i) => (
                        <button
                            key={i}
                            onClick={() => setThemeConfig({ ...themeConfig, background: bg })}
                            style={{ background: bg }}
                            className={themeConfig.background === bg ? 'active-swatch' : ''}
                        />
                    ))}
                </div>
            </div>

            {/* Custom Gradient Builder */}
            <div className="control-group custom-gradient-group">
                <label className="label" style={{ marginBottom: '12px', color: '#fff' }}>Custom Gradient</label>
                <div className="color-inputs">
                    <input type="color" className="color-picker" value={gradient.c1} onChange={e => updateCustomGradient({ c1: e.target.value })} />
                    <input type="color" className="color-picker" value={gradient.c2} onChange={e => updateCustomGradient({ c2: e.target.value })} />
                </div>
                <div className="angle-control">
                    <span className="angle-label">Angle:</span>
                    <input
                        type="range" min="0" max="360"
                        value={gradient.angle}
                        onChange={e => updateCustomGradient({ angle: e.target.value })}
                        className="angle-input"
                    />
                    <span className="angle-label" style={{ minWidth: '30px' }}>{gradient.angle}°</span>
                </div>
            </div>

            <div className="control-group">
                <label className="label label-row">
                    <span>Width</span>
                    <span>{themeConfig.width}px</span>
                </label>
                <input
                    type="range" min="300" max="1200" step="10"
                    value={themeConfig.width}
                    onChange={(e) => setThemeConfig({ ...themeConfig, width: Number(e.target.value) })}
                    className="range-input"
                />
            </div>

            <div className="control-group">
                <label className="label label-row">
                    <span>Padding</span>
                    <span>{themeConfig.padding}px</span>
                </label>
                <input
                    type="range" min="0" max="128" step="8"
                    value={themeConfig.padding}
                    onChange={(e) => setThemeConfig({ ...themeConfig, padding: Number(e.target.value) })}
                    className="range-input"
                />
            </div>

            <button onClick={handleExport} className="export-btn">
                ✨ Export PNG
            </button>
        </div>
    );
};

export default ThemeControls;

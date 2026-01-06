import React from 'react';
import CodeEditor from './CodeEditor';
import { themes } from '../constants/themes';

const PreviewFrame = ({
    code,
    setCode,
    themeConfig,
    exportRef
}) => {
    const { background, windowStyle, windowTheme, padding, title, width, language } = themeConfig;

    const currentTheme = themes[windowTheme] || themes.dark;

    // Generate dynamic CSS for Prism tokens
    const tokenStyles = `
    .token.comment, .token.prolog, .token.doctype, .token.cdata { color: ${currentTheme.tokens.comment}; }
    .token.punctuation { color: ${currentTheme.tokens.punctuation}; }
    .token.namespace { opacity: .7; }
    .token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted { color: ${currentTheme.tokens.number}; }
    .token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color: ${currentTheme.tokens.string}; }
    .token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string { color: ${currentTheme.tokens.punctuation}; }
    .token.atrule, .token.attr-value, .token.keyword { color: ${currentTheme.tokens.keyword}; }
    .token.function, .token.class-name { color: ${currentTheme.tokens.function}; }
    .token.regex, .token.important, .token.variable { color: ${currentTheme.tokens.attrName}; }
    .token.bold { font-weight: bold; }
    .token.italic { font-style: italic; }
  `;

    return (
        <div
            className="preview-outer-container flex-center preview-frame-container"
            style={{
                background: background,
            }}
        >
            <style>{tokenStyles}</style>

            {/* EXPORT CONTAINER */}
            <div
                ref={exportRef}
                style={{
                    background: 'transparent',
                    padding: `${padding}px`,
                    width: 'auto',
                    maxWidth: '100%',
                    borderRadius: '0',
                    display: 'flex',
                }}
            >
                <div
                    className={`window-frame glass-panel`}
                    style={{
                        width: `${width}px`, // Controlled width
                        minWidth: '300px', // Minimum safety
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        background: currentTheme.background,
                        border: currentTheme.borderColor,
                        transition: 'width 0.3s ease'
                    }}
                >
                    {windowStyle !== 'none' && (
                        <div
                            className="window-header"
                            style={{
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                background: currentTheme.headerColor,
                                borderBottom: currentTheme.borderColor
                            }}
                        >
                            {windowStyle === 'mac' && (
                                <div className="window-controls mac" style={{ display: 'flex', gap: '8px' }}>
                                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                                </div>
                            )}
                            {windowStyle === 'windows' && (
                                <div className="window-controls windows" style={{ display: 'flex', gap: '12px', marginLeft: 'auto' }}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1" stroke={currentTheme.textColor}><path d="M1 6h10" /></svg>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1" stroke={currentTheme.textColor}><rect x="1.5" y="1.5" width="9" height="9" /></svg>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1" stroke={currentTheme.textColor}><path d="M1 1l10 10M11 1L1 11" /></svg>
                                </div>
                            )}

                            {title && windowStyle !== 'none' && (
                                <div style={{
                                    position: 'absolute', left: 0, right: 0, textAlign: 'center', pointerEvents: 'none',
                                    color: currentTheme.textColor, fontSize: '13px', opacity: 0.7, fontFamily: 'sans-serif', fontWeight: 500
                                }}>
                                    {title}
                                </div>
                            )}

                        </div>
                    )}

                    <div className="window-content" style={{ color: currentTheme.textColor }}>
                        <CodeEditor code={code} setCode={setCode} language={language} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewFrame;

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
            className="preview-frame-wrapper"
            style={{
                background: background,
            }}
        >
            <style>{tokenStyles}</style>

            {/* EXPORT CONTAINER */}
            <div
                ref={exportRef}
                className="preview-export-container"
                style={{
                    '--user-padding': `${padding}px`,
                }}
            >
                <div
                    className={`preview-window glass-panel`}
                    style={{
                        width: `${width}px`,
                        '--bg-color': currentTheme.background,
                        '--border-color': currentTheme.borderColor,
                        '--header-bg': currentTheme.headerColor,
                        '--text-color': currentTheme.textColor,
                    }}
                >
                    {windowStyle !== 'none' && (
                        <div className="preview-window-header">
                            {windowStyle === 'mac' && (
                                <div className="preview-window-controls mac">
                                    <span className="control-dot red" />
                                    <span className="control-dot yellow" />
                                    <span className="control-dot green" />
                                </div>
                            )}
                            {windowStyle === 'windows' && (
                                <div className="preview-window-controls windows">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1" stroke="currentColor"><path d="M1 6h10" /></svg>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1" stroke="currentColor"><rect x="1.5" y="1.5" width="9" height="9" /></svg>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1" stroke="currentColor"><path d="M1 1l10 10M11 1L1 11" /></svg>
                                </div>
                            )}

                            {title && (
                                <div className="preview-window-title">
                                    {title}
                                </div>
                            )}

                        </div>
                    )}

                    <div className="window-content">
                        <CodeEditor code={code} setCode={setCode} language={language} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewFrame;

import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-markdown'; // Still useful for syntax highlighting even if not rendering
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css';

const CodeEditor = ({ code, setCode, language = 'javascript' }) => {
  return (
    <div className="code-editor-container">
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => {
          const grammar = Prism.languages[language] || Prism.languages.javascript;
          return Prism.highlight(code, grammar, language);
        }}
        padding={24}
        style={{
          fontFamily: '"Fira Code", "Fira Mono", monospace',
          fontSize: 16,
          backgroundColor: 'transparent',
          minHeight: '100px',
          lineHeight: '1.5',
        }}
        textareaClassName="focus:outline-none"
      />
    </div>
  );
};

export default CodeEditor;

import { useState } from 'react';

const DEFAULT_CODE = `function greeting(name) {
  console.log("Hello, " + name + "!");
  return true;
}

// Write your code here...`;

const DEFAULT_CONFIG = {
    background: 'linear-gradient(135deg, #1e1e1e, #121212)',
    padding: 64,
    windowStyle: 'mac',
    windowTheme: 'dark',
    language: 'javascript',
    title: '',
    width: 500
};

export const useAppConfig = () => {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [themeConfig, setThemeConfig] = useState(DEFAULT_CONFIG);

    return {
        code,
        setCode,
        themeConfig,
        setThemeConfig
    };
};

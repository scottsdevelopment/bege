import { toPng } from 'html-to-image';

export const exportToPng = async (element, themeConfig, filename = 'bege.png') => {
    if (!element) return;

    try {
        // 1. Create a deep clone of the element to manipulate without affecting the UI
        const clone = element.cloneNode(true);

        // 2. Wrap the clone in a container that forces the desired width
        const wrapper = document.createElement('div');
        const targetWidth = themeConfig.width + (themeConfig.padding * 2);

        wrapper.style.position = 'fixed';
        wrapper.style.top = '-9999px';
        wrapper.style.left = '-9999px';
        wrapper.style.width = `${targetWidth}px`;
        wrapper.style.height = 'auto';
        wrapper.style.zIndex = '-1000';
        // Force desktop-like context
        wrapper.className = 'export-wrapper-force-desktop';

        wrapper.appendChild(clone);
        document.body.appendChild(wrapper);

        // 3. Force styles on the clone to override mobile constraints
        const windowDiv = clone.querySelector('.preview-window');
        if (windowDiv) {
            windowDiv.style.maxWidth = 'none';
            windowDiv.style.width = '100%';
        }

        clone.style.width = '100%';
        clone.style.maxWidth = 'none';
        clone.style.padding = `${themeConfig.padding}px`;
        clone.style.background = themeConfig.background;
        clone.style.boxSizing = 'border-box';

        // 4. Generate Image from the wrapper/clone
        const dataUrl = await toPng(clone, {
            cacheBust: true,
            pixelRatio: 2,
            width: targetWidth,
            windowWidth: targetWidth, // Ensure media queries match this width
        });

        // 5. Cleanup
        document.body.removeChild(wrapper);

        // 6. Download
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();

        return dataUrl; // Return for debugging if needed
    } catch (err) {
        console.error('Export failed:', err);
        throw err;
    }
};

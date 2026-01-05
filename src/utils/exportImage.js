import { toPng } from 'html-to-image';

export const exportToPng = async (element, themeConfig, filename = 'bege.png') => {
    if (!element) return;

    try {
        const dataUrl = await toPng(element, {
            cacheBust: true,
            pixelRatio: 2,
            style: {
                background: themeConfig.background // Inject background for the snapshot
            }
        });

        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
    } catch (err) {
        console.error('Export failed:', err);
        throw err;
    }
};

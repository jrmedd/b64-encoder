function encodeBase64(bytes) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let output = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const c1 = bytes[i];
    const c2 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const c3 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    output += chars[c1 >> 2];
    output += chars[((c1 & 3) << 4) | (c2 >> 4)];
    output += i + 1 < bytes.length ? chars[((c2 & 15) << 2) | (c3 >> 6)] : '=';
    output += i + 2 < bytes.length ? chars[c3 & 63] : '=';
  }
  return output
}

export default function () {
figma.showUI(__html__, { width: 400, height: 400, themeColors: true })
	figma.on('selectionchange', () => {
		const numSelected = figma?.currentPage.selection.length
		figma?.ui.postMessage({type: 'SELECTION_COUNT',  numSelected})
	})
	figma.ui.onmessage = async (message) => {
		if (message?.type === 'EXPORT_SVG') {
			const selection = figma.currentPage.selection[0];
			if (selection) {
				const svgBytes = await selection.exportAsync({ format: 'SVG' });
				const svgBase64 = `
					${message.mode}-image: url("data:image/svg+xml;base64,${encodeBase64(svgBytes)}");
					${message.mode}-position: center;
					${message.mode}-size: contain;
					${message.mode}-repeat: no-repeat;
					${message.mode == 'mask' ? `background-color: ${message.accent};` : ''}
				`;
				figma.notify('SVG copied to clipboard', { timeout: 5000 });
				figma.ui.postMessage({ type: 'SVG_EXPORT_COMPLETE', svgBase64 });
			} else {
				figma.notify('Select something(s) to copy', { error: true });
				figma.ui.postMessage({ type: 'error', message: 'No selection found.' });
			}
			}
		}
}

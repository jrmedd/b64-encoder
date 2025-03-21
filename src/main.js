export default function () {
figma.showUI(__html__, { width: 400, height: 400, themeColors: true })
	figma.on('selectionchange', () => {
		const numSelected = figma?.currentPage.selection.length
		figma?.ui.postMessage({type: 'SELECTION_COUNT',  numSelected})
	})
	figma.ui.onmessage = async (message) => {
		let data
		switch (message?.type) {
			case 'EXPORT_SVG':
				const selection = figma.currentPage.selection[0];
				if (selection) {
					const svgString = await selection.exportAsync({ format: 'SVG_STRING' });
					figma.ui.postMessage({ type: 'SVG_STRING_EXPORT_COMPLETE', svgString, cssOrHtml: message.cssOrHtml, backgroundMode: message.backgroundMode, maskColor: message.maskColor });
				}  else {
					figma.notify('Select something(s) to copy', { error: true });
					figma.ui.postMessage({ type: 'error', message: 'No selection found.' });
				}
				break
			case 'COMPILE_HTML':
				data = `<img src="${message.data}" alt="Add a meaningful description..." />`;
				figma.ui.postMessage({ type: 'COMPILATION_COMPLETE', data, cssOrHtml: message.cssOrHtml });
				break
			case 'COMPILE_CSS':
				data = `${message.backgroundMode}-image: url("${message.data}");\n${message.backgroundMode}-position: center;\n${message.backgroundMode}-size: contain;\n${message.backgroundMode}-repeat: no-repeat;\n${message.backgroundMode == 'mask' ? `background-color: ${message.maskColor};` : ''}`.trim();
				figma.ui.postMessage({ type: 'COMPILATION_COMPLETE', data, cssOrHtml: message.cssOrHtml });
				break
			case 'COPY_COMPLETE':
				figma.notify(`Copied ${message.cssOrHtml.toUpperCase()} to clipboard`, { timeout: 5000 });
				break
		}
	}
}

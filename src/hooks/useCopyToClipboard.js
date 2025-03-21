import { useCallback, useState } from 'react'

/**
 * Custom hook for copying text to clipboard
 * @returns {[string|null, Function]} Array containing the copied text value and the copy function
 */
export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState(null)

  const copy = useCallback(async text => {
    // Try to save to clipboard then save it in the state if worked
    if (window.isSecureContext && typeof navigator?.clipboard?.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedText(text)
        return true
      } 
      catch (error) {
        console.warn('Copy failed', error)
        setCopiedText(null)
        return false
      }
    } else {
      unsecuredCopyToClipboard(text);
    }
  }, [])

  return [copiedText, copy]
}

/**
 * Fallback function to copy text to clipboard in non-secure contexts
 * @param {string} text - The text to copy to clipboard
 * @returns {void}
 */
function unsecuredCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (e) {
    logger.error('Unable to copy content to clipboard!', e);
  }

  document.body.removeChild(textArea);
}
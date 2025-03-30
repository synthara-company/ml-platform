
import { useEffect } from 'react';

export const useCopyPrevention = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    // Prevent default copy/paste/cut events
    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Prevent keyboard shortcuts
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Allow copying in input fields
      }
      
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'c':
          case 'x':
          case 'p':
          case 's':
          case 'u':
          case 'i':
          case 'a':
            e.preventDefault();
            e.stopPropagation();
            break;
        }
      }

      // Prevent F12 and other function keys
      if (e.key === 'F12' || e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
      }
    };

    // Prevent right-click context menu
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent drag and drop
    const preventDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent selection
    const preventSelection = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Apply all event listeners
    document.addEventListener('copy', preventDefault, { capture: true });
    document.addEventListener('cut', preventDefault, { capture: true });
    document.addEventListener('paste', preventDefault, { capture: true });
    document.addEventListener('keydown', preventKeyboardShortcuts, { capture: true });
    document.addEventListener('contextmenu', preventContextMenu, { capture: true });
    document.addEventListener('dragstart', preventDragStart, { capture: true });
    document.addEventListener('selectstart', preventSelection, { capture: true });
    document.addEventListener('mousedown', preventSelection, { capture: true });

    // Apply CSS properties
    document.documentElement.style.cssText = `
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
    `;

    // Disable developer tools shortcuts
    const disableDevTools = () => {
      // Detect DevTools
      const devtools = /./;
      devtools.toString = function() {
        this.opened = true;
      }
      console.log('%c', devtools);
    };

    // Run periodically
    const interval = setInterval(disableDevTools, 1000);

    // Cleanup function
    return () => {
      document.removeEventListener('copy', preventDefault, { capture: true });
      document.removeEventListener('cut', preventDefault, { capture: true });
      document.removeEventListener('paste', preventDefault, { capture: true });
      document.removeEventListener('keydown', preventKeyboardShortcuts, { capture: true });
      document.removeEventListener('contextmenu', preventContextMenu, { capture: true });
      document.removeEventListener('dragstart', preventDragStart, { capture: true });
      document.removeEventListener('selectstart', preventSelection, { capture: true });
      document.removeEventListener('mousedown', preventSelection, { capture: true });
      
      document.documentElement.style.cssText = '';
      clearInterval(interval);
    };
  }, [enabled]);
};


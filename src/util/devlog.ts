import React from 'react';
import log from './log';

/** Log things exclusively in development mode.
 * @param {string} text text to be printed.
 * @param {string} mode one of ['success', 'warn', 'error']. It only changes the colour.
 * @param {string} customStyle CSS styling to be applied.
*/
export default function devlog(text: string, mode: string = "success", customStyle?: string) {
    if (isDev()) {
        // Just pass everything to log function, yes? :)
        log(text, mode, customStyle);
    }
}

const isDev = () => {
    // Detect if in development mode
    return '_self' in React.createElement('div');
}
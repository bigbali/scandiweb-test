import React from 'react';
import log from './log';

/*
    This thingy will log things, but only in development mode.
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
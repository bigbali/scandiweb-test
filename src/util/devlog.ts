import React from 'react';
import log from './log';

/*
    In developmend mode, this will log whatever is passed as argument.
    In production mode, this will do nothing.
*/
export default function devlog(text: string, mode: string = "success", customStyle?: string) {
    if (isDev()) {
        // Just pass everything to log function, yes?
        log(text, mode, customStyle);
    }
}

const isDev = () => {
    // Detect if in development mode
    return '_self' in React.createElement('div');
}
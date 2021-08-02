import devlog from './devlog';

export const saveState = (state) => {
    try {
        localStorage.setItem('state', JSON.stringify(state));

        return true
    } 
    catch {
        devlog("Could not save state to 'localStorage'.", "error")

        return false
    }
};

export const loadState = () => {
    try {
        const state = localStorage.getItem('state');

        if (state === null) {
            return undefined;
        }

        return JSON.parse(state).state
    } 
    catch (error) {
        devlog(error, "error");
        return undefined
    }
  }; 

/**
 * Deconstructs hexadecimal color value to individual channels 
 * (red, green and blue), converts it to base 10 and divides it by 3.
 * @param {string} hexColor hexadecimal color value 
 * @returns {number} integer value between 0 and 255
 */
const getBrightness = (hexColor) => {
    // HEX color value without '#'
    const pureColor = hexColor.replace("#", "");

    // Break HEX value down to red, green and blue channels
    const r = pureColor.slice(0, 2);
    const g = pureColor.slice(2, 4);
    const b = pureColor.slice(4, 6);

    // Convert HEX color value to number
    const rBase10 = parseInt(Number(`0x${r}`), 10);
    const gBase10 = parseInt(Number(`0x${g}`), 10);
    const bBase10 = parseInt(Number(`0x${b}`), 10);

    // Calculate brightness (this isn't a proper way, but good enough for our use case)
    const brightness = (rBase10 + gBase10 + bBase10) / 3;

    // * This is for you, kind souls reviewing my code, in case your curiosity expects things logged in console for a better view
    // (because I know how much I like to print this stuff out in the console)
    
    // devlog(`${rBase10}, ${gBase10}, ${bBase10}`)
    // devlog(`${brightness}`)
    return brightness;
}

export default getBrightness;
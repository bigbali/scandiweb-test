export default function log(text: string, mode?: string, customStyle?: string) {
    const padding = "padding: 0.5rem;";
    const corner = "border-radius: 0.25rem;";
    const fontSize = "font-size: 1.2rem;";
    const color = "color: black;"

    let modifier;

    switch (mode) {
        case "success":
            modifier = `${padding}${corner}${fontSize}${color}background-color: #39ba46`;
            break;
        case "warn":
            modifier = `${padding}${corner}${fontSize}${color}background-color: #f4dd49`;
            break;
        case "error":
            modifier = `${padding}${corner}${fontSize}${color}background-color: #cc4337`;
            break;
        case "custom":
            // add CSS at the end to override previous
            modifier = `${padding}${corner}${fontSize}background-color: black; color:white; ${customStyle}`;
            break;
        default:
            modifier = `${padding}${corner}${fontSize}background-color: black; color: white`;
            break;
    }
    console.log(`%c${text}`, modifier)
}
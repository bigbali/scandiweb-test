const getSubtitle = (text) => {
    const words = text.split(" ");
    let textWithoutFirstWord = "";

    // We only want to return something here if we have multiple words
    if (words.length > 1) {
        const sliceHere = words[0].length;
        // Remove first word
        words.shift();
        textWithoutFirstWord = text.slice(sliceHere);
    }

    return textWithoutFirstWord
}

export default getSubtitle;
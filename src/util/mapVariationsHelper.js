/**
 * Set background color if 'attributeType' is 'swatch'.
 * @param {string} attributeType swatch or text.
 * @param {*} value value of attribute item (e.g.: '#ffffff', 'XXL'...).
 * @returns React inline style.
 */
export const getInlineStyleModifier = (attributeType, value) => {
    const color = value;
    let inlineStyleModifier;

    if (attributeType === "swatch") {
        inlineStyleModifier = {
            backgroundColor: color
        }
    }

    return inlineStyleModifier
}

/**
 * If variation doesn't yet have this value, add it.
 * @param {object} attributeTypes 
 * @param {string} attributeName 
 * @param {object} attributeData 
 */
export const appendValueIfMissing = (attributeTypes, attributeName, attributeData) => {
    const attributeTypeValues = attributeTypes[attributeName].values;
    let newAttributeTypeValues = attributeTypeValues;

    let isValueAlreadyPresent = false;

    // Remove type property so we can compare
    let { type, ...attributeDataWithoutType } = { ...attributeData }

    // Compare type values against the one already in 'attributeTypes'
    attributeTypeValues.forEach(typeValue => {
        if (JSON.stringify(typeValue) === JSON.stringify(attributeDataWithoutType)) {
            isValueAlreadyPresent = true;
        }
    })

    if (!isValueAlreadyPresent) {
        newAttributeTypeValues.push({
            value: attributeData.value,
            displayValue: attributeData.displayValue,
        })
    }

    // Change value of object which is passed by reference like this
    // (all this code was copied over, and it's working, so it's fine, I guess)
    attributeTypes[attributeName].values = newAttributeTypeValues;
}

/**
 * If value is of type 'swatch', shorten to one character.
 * @param {*} displayValue 
 * @param {string} attributeType 
 * @returns {string} first character of 'displayValue'.
 */
export const getAttributeDisplayValue = (displayValue, attributeType) => {
    if (attributeType === "swatch") {
        // Even though it doesn't do much, displaying the first character of a color
        // makes it just a bit easier for colorblind people to identify specific colors.
        // It also looks better this way, I think.
        return displayValue.slice(0, 1)
    }

    return displayValue
}
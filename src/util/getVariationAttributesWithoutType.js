/**
 * Remove 'type' property from all attributes.
 * @param {*} variationAttributes attributes of a variation of a product in cart.
 * @returns whatever was passed in, without the 'type' properties.
 */
const getVariationAttributesWithoutType = (variationAttributes) => {
    let variationAttributesWithoutType = {};
    const indexableAttributes = Object.entries(variationAttributes);

    indexableAttributes.forEach(attribute => {
        const attributeName = attribute[0];
        const attributeValues = attribute[1];

        // Remove 'type' property
        const {type, ...attributeValuesWithoutType} = attributeValues;
        variationAttributesWithoutType[attributeName] = attributeValuesWithoutType;
    })

    return variationAttributesWithoutType
}

export default getVariationAttributesWithoutType
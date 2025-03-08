
export const removeDomElementsFromInput = (text) => {
    const htmlTagsRegex = /<[^>]*>/g;
  
    const plainText = typeof text == "string" ? text?.replace(htmlTagsRegex, '') || "" : text;
  
    return plainText;
};
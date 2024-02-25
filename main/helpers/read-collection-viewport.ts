import path from "path";
import readAssetHero from "./read-asset-hero";

export default async function readCollectionViewport(dir, content) {
  // Create an array to store the results
  const resultArray = [];

  // Iterate over each array of objects in the assets array
  for (const row of content) {
    // Create a new array to store the modified objects
    const modifiedObjects = [];

    // Iterate over each object in the current assetArray
    for (const asset of row) {
      // Check if the current object has a 'path' key
      if ("path" in asset) {
        const fullFilePath = path.join(dir, asset.path);
        // Read the asset data using readAsset function
        const heroImage = await readAssetHero(fullFilePath);

        // Create a copy of the current object with the extra data
        const modifiedObj = { ...asset, data: {heroImage} };

        // Push the modified object to the array
        modifiedObjects.push(modifiedObj);
      } else {
        // If 'filepath' key is not present, push the object as is
        modifiedObjects.push(asset);
      }
    }

    // Push the modified array of objects to the resultArray
    resultArray.push(modifiedObjects);
  }

  return resultArray;
}

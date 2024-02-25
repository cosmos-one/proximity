import fs from "fs";
import * as Types from "@/types";

// Function to update a collection file with new metadata
export default async function updateCollection(
  fullPath: string, // Full path to the collection file
  original: Types.AssetMetaType, // Original metadata of the collection
  collection: Types.CollectionType // New metadata for the collection
) {
  // Construct the updated body metadata for the collection
  const body = {
    id: original.body.id,
    name: collection.name,
    description: collection.description,
    collectionX: collection.collectionX,
    collectionY: collection.collectionY,
    content: collection.content,
    createdAt: original.body.createdAt,
    lastModified: new Date().toISOString(),
  };

  // Prepare the updated collection metadata object
  const collectionFile = {
    type: "collection",
    name: "proximity",
    version: "0.1.0",
    body: body,
  };

  // If the name of the collection has changed, rename the file
  if (collection.name !== original.body.name) {
    // Construct the new file path with the new name
    const newFilePath = fullPath.replace(
      `${original.body.name}.pcol`,
      `${collection.name}.pcol`
    );

    // Write the updated metadata to the new file path
    fs.writeFileSync(newFilePath, JSON.stringify(collectionFile));

    // Delete the existing file using the old name
    fs.unlinkSync(fullPath);

    // Return the new file path as the ID and file name in the response object
    const res: Types.CollectionFileType = {
      id: `${collection.name}.pcol`,
      file: `${collection.name}.pcol`,
      meta: collectionFile,
    };

    return res; // Return the response object
  } else {
    // Write the updated metadata to the original file path
    fs.writeFileSync(fullPath, JSON.stringify(collectionFile));

    // Construct the response object containing updated information
    const res: Types.CollectionFileType = {
      id: `${collection.name}.pcol`, // ID of the collection file
      file: `${collection.name}.pcol`, // Name of the collection file
      meta: collectionFile, // Updated metadata of the collection
    };

    return res; // Return the response object
  }
}

import fs from "fs";
import * as Types from "@/types";

export default async function updateCollection(
  fullPath: string,
  original: Types.AssetMetaType,
  collection: Types.CollectionType
) {
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
  const collectionFile = {
    type: "collection",
    name: "proximity",
    version: "0.1.0",
    body: body,
  };

  fs.writeFile(fullPath, JSON.stringify(collectionFile), (err) => {
    if (err) throw err;
  });

  const res: Types.CollectionFileType = {
    id: `${collection.name}.pcol`,
    file: `${collection.name}.pcol`,
    meta: collectionFile,
  };
  return res;
}

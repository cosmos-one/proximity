import fs from "fs";
import path from "path";
import archiver from "archiver";
import * as Types from "@/types";

type AssetCreateType = {
  type: string;
  name: string;
  source: string;
  notes: string;
};

// Function to update an asset with new data and metadata
export default async function updateAsset(
  fullPath: string, // Full path to the asset file
  original: Types.AssetMetaType, // Original metadata of the asset
  asset: AssetCreateType, // New metadata for the asset
  fileData: Buffer, // Binary data of the asset file
  imageData: Buffer // Binary data of the asset's hero image
) {
  // Create a zip archive for the updated asset
  const archive = archiver("zip", { zlib: { level: 9 } });

  // Create a write stream to save the zip archive
  const output = fs.createWriteStream(path.join(fullPath));

  // Append the hero image data to the zip archive
  archive.append(Buffer.from(imageData), { name: "heroImage.png" });

  // Append the asset file data to the zip archive
  archive.append(Buffer.from(fileData), {
    name: asset.name + "." + original.body.type.split("/")[1],
  });

  // Prepare the updated body metadata for the asset
  const body = {
    id: original.body.id,
    name: asset.name,
    source: asset.source,
    notes: asset.notes,
    type: original.body.type,
    createdAt: original.body.createdAt,
    lastModified: new Date().toISOString(),
  };

  // Prepare the updated asset metadata
  const assetFile = {
    type: "asset",
    name: "proximity",
    version: "0.1.0",
    body: body,
  };

  // Append the updated asset metadata to the zip archive
  archive.append(JSON.stringify(assetFile, null, 2), {
    name: "meta.json",
  });

  // Pipe the zip archive to the output stream
  archive.pipe(output);

  // Finalize the zip archive and perform additional operations after completion
  await archive.finalize().then(() => {
    // Rename the asset file to have a ".pas" extension
    fs.renameSync(
      fullPath,
      path.join(path.dirname(fullPath), asset.name + ".pas")
    );
  });

  // Prepare and return the response object containing updated information
  const res = {
    id: asset.name + ".pas",
    file: asset.name + ".pas",
    meta: assetFile,
    heroImage: imageData,
    fileData: fileData,
  };
  return res;
}

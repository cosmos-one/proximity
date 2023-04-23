import fs from "fs";
import path from "path";
import archiver from "archiver";

type AssetCreateType = {
  filePath: string;
  type: string;
  name: string;
  source: string;
  notes: string;
};

export default async function createAssets(
  directory: string,
  assets: AssetCreateType[]
) {
  if (assets.length > 0) {
    for (let i = 0; i < assets.length; i++) {
      let asset = assets[i];

      const archive = archiver("zip", { zlib: { level: 9 } });
      const output = fs.createWriteStream(
        path.join(directory, asset.name + ".pas")
      );
      // Add the file from the file path
      archive.file(asset.filePath, {
        name: asset.name + path.extname(asset.filePath),
      });

      // Add the json metadata
      const body = {
        name: asset.name,
        source: asset.source,
        notes: asset.notes,
        type: asset.type,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      };
      const assetFile = {
        type: "asset",
        name: "proximity-native",
        version: "0.1.0",
        body: body,
      };
      archive.append(JSON.stringify(assetFile, null, 2), {
        name: "meta.json",
      });
      // Pipe the output to the file
      archive.pipe(output);

      // Finalize the archive
      await archive.finalize();
    }
  }
}

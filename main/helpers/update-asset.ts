import fs from "fs";
import path from "path";
import archiver from "archiver";
import sharp from "sharp";
import https from "https";
import cuid from "cuid";
import * as Types from "@/types";

type AssetCreateType = {
  type: string;
  name: string;
  source: string;
  notes: string;
};

export default async function updateAsset(
  fullPath: string,
  original: Types.AssetMetaType,
  asset: AssetCreateType,
  fileData: Buffer,
  imageData: Buffer
) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const output = fs.createWriteStream(path.join(fullPath));
  archive.append(Buffer.from(imageData), { name: "heroImage.png" });
  archive.append(Buffer.from(fileData), {
    name: asset.name + "." + original.body.type.split("/")[1],
  });
  const body = {
    id: original.body.id,
    name: asset.name,
    source: asset.source,
    notes: asset.notes,
    type: original.body.type,
    createdAt: original.body.createdAt,
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
  archive.pipe(output);
  await archive.finalize()
  .then(() => {
    fs.renameSync(fullPath, path.join(path.dirname(fullPath), asset.name + ".pas"))
  })
  const res = {
    id: asset.name + ".pas",
    file: asset.name + ".pas",
    meta: assetFile,
    heroImage: imageData,
    fileData: fileData,
  };
  return res;
}

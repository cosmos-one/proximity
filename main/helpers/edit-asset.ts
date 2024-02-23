import fs from "fs";
import path from "path";
import archiver from "archiver";
import sharp from "sharp";
import https from "https";
import cuid from "cuid";

type AssetCreateType = {
  filePath: string;
  type: string;
  name: string;
  source: string;
  notes: string;
};

export default async function editAsset(
  filePath: string,
  name: string,
  source: string,
  notes: string
) {
  let asset = filePath
  // Unzip the asset file
  // Extract the metadata content
  // Update the metadata object
  // Write the new metadata and overwrite the original metadata file
  // Return the function
}

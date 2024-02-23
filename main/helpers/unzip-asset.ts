import fs from "fs";
import path from "path";
import unzipper from "unzipper";

export default async function unzipAsset(filePath) {
  // Determine the output directory by removing the ".pas" extension
  const outputDirectory = path.dirname(filePath);

  // Read the ZIP file
  fs.createReadStream(filePath)
    .pipe(unzipper.Extract({ path: outputDirectory }))
    .on("error", (err) => {
      console.error("Error unzipping file:", err);
    })
    .on("finish", () => {
      console.log("Extraction complete.");
    });
}

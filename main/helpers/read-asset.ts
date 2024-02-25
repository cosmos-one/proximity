import fs from "fs";
import path from "path";
import unzipper from "unzipper";

// Function to read asset data from a file
export default function readAsset(slug) {
  // Parse the file path
  const parsed = path.parse(slug);

  // Return a promise to handle asynchronous operations
  return new Promise((resolve, reject) => {
    // Create a read stream for the file
    const readStream = fs.createReadStream(slug);

    // Pipe the read stream through an unzipper to extract contents from zip files
    const unzipStream = readStream.pipe(unzipper.Parse());

    // Initialize an object to store extracted data
    const res = {
      id: path.basename(slug),
      file: path.basename(slug),
      meta: null,
      heroImage: null,
      fileData: null,
    };

    // Flags to track whether meta, hero image, and file data have been found
    let metaFound = false;
    let heroImageFound = false;
    let fileFound = false;

    // Event listener for each entry (file or directory) found in the zip stream
    unzipStream.on("entry", async (entry) => {
      // Get the file name of the entry
      const fileName = entry.path;

      // Check if the entry is the meta data file
      if (fileName === "meta.json") {
        // If it is, read its content and parse JSON
        const chunks = [];
        for await (const chunk of entry) {
          chunks.push(chunk);
        }
        const data = Buffer.concat(chunks).toString();
        res.meta = JSON.parse(data);
        metaFound = true;
      }
      // Check if the entry is the hero image file
      else if (fileName === "heroImage.png") {
        // If it is, read its content as a buffer
        const chunks = [];
        for await (const chunk of entry) {
          chunks.push(chunk);
        }
        const data = Buffer.concat(chunks);
        res.heroImage = data;
        heroImageFound = true;
      }
      // Check if the entry is the main file (matching the base name of the original file)
      else if (fileName.includes(parsed.name)) {
        // If it is, read its content as a buffer
        const chunks = [];
        for await (const chunk of entry) {
          chunks.push(chunk);
        }
        const data = Buffer.concat(chunks);
        res.fileData = data;
        fileFound = true;
      }
      // If none of the above conditions match, skip the entry
      else {
        entry.autodrain();
      }

      // If all required data has been found, resolve the promise with the result
      if (metaFound && heroImageFound && fileFound) {
        resolve(res);
      }
    });

    // Event listener for any errors that occur during unzipping or reading
    unzipStream.on("error", reject);
    readStream.on("error", reject);
  });
}

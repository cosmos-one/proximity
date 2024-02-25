import fs from "fs";
import path from "path";
import unzipper from "unzipper";

// Function to read asset data from a file
export default function readAssetHero(slug) {
  // Return a promise to handle asynchronous operations
  return new Promise((resolve, reject) => {
    // Create a read stream for the file
    const readStream = fs.createReadStream(slug);

    // Pipe the read stream through an unzipper to extract contents from zip files
    const unzipStream = readStream.pipe(unzipper.Parse());

    // Initialize a variable to store the heroImage data
    let heroImageData = null;

    // Event listener for each entry (file or directory) found in the zip stream
    unzipStream.on("entry", async (entry) => {
      // Get the file name of the entry
      const fileName = entry.path;

      // Check if the entry is the hero image file
      if (fileName === "heroImage.png") {
        // If it is, read its content as a buffer
        const chunks = [];
        for await (const chunk of entry) {
          chunks.push(chunk);
        }
        heroImageData = Buffer.concat(chunks);
        // Resolve the promise with the heroImage data
        resolve(heroImageData);
      } else {
        // If the entry is not the hero image, skip it
        entry.autodrain();
      }
    });

    // Event listener for any errors that occur during unzipping or reading
    unzipStream.on("error", reject);
    readStream.on("error", reject);
  });
}

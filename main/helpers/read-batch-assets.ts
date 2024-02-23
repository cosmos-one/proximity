import fs from "fs";
import path from "path";
import unzipper from "unzipper";

export default function readAsset(slug) {
  const parsed = path.parse(slug);
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(slug);
    const unzipStream = readStream.pipe(unzipper.Parse());
    const res = {
      id: path.basename(slug),
      file: path.basename(slug),
      meta: null,
      heroImage: null,
      fileData: null,
    };

    let metaFound = false;
    let heroImageFound = false;
    let fileFound = false;

    unzipStream.on("entry", async (entry) => {
      const fileName = entry.path;
      if (fileName === "meta.json") {
        const chunks = [];
        for await (const chunk of entry) {
          chunks.push(chunk);
        }
        const data = Buffer.concat(chunks).toString();
        res.meta = JSON.parse(data);
        metaFound = true;
      } else if (fileName === "heroImage.png") {
        const chunks = [];
        for await (const chunk of entry) {
          chunks.push(chunk);
        }
        const data = Buffer.concat(chunks);
        res.heroImage = data;
        heroImageFound = true;
      } else if (fileName.includes(parsed.name)) {
        const chunks = [];
        for await (const chunk of entry) {
          chunks.push(chunk);
        }
        const data = Buffer.concat(chunks);
        res.fileData = data;
        fileFound = true;
      } else {
        entry.autodrain();
      }

      if (metaFound && heroImageFound && fileFound) {
        resolve(res);
      }
    });

    unzipStream.on("error", reject);
    readStream.on("error", reject);
  });
}

// import fs from "fs";
// import path from "path";
// import archiver from "archiver";
// import sharp from "sharp";

// type AssetCreateType = {
//   filePath: string;
//   type: string;
//   name: string;
//   source: string;
//   notes: string;
// };

// export default async function createAssets(
//   directory: string,
//   assets: AssetCreateType[]
// ) {
//   if (assets.length > 0) {
//     for (let i = 0; i < assets.length; i++) {
//       let asset = assets[i];

//       const archive = archiver("zip", { zlib: { level: 9 } });
//       const output = fs.createWriteStream(
//         path.join(directory, asset.name + ".pas")
//       );

//       // If filePath is an image, resize it
//       if (asset.type.includes("image")) {
//         const imageBuffer = await sharp(asset.filePath)
//           .resize({ width: 1800 })
//           .png()
//           .toBuffer();
//         archive.append(imageBuffer, { name: "heroImage.png" });
//         // Add the file from the file path
//         archive.file(asset.filePath, {
//           name: asset.name + path.extname(asset.filePath),
//         });
//       } else {
//         // Add the file from the file path
//         archive.file(asset.filePath, {
//           name: asset.name + path.extname(asset.filePath),
//         });
//       }

//       // Add the json metadata
//       const body = {
//         name: asset.name,
//         source: asset.source,
//         notes: asset.notes,
//         type: asset.type,
//         createdAt: new Date().toISOString(),
//         lastModified: new Date().toISOString(),
//       };
//       const assetFile = {
//         type: "asset",
//         name: "proximity-native",
//         version: "0.1.0",
//         body: body,
//       };
//       archive.append(JSON.stringify(assetFile, null, 2), {
//         name: "meta.json",
//       });
//       // Pipe the output to the file
//       archive.pipe(output);

//       // Finalize the archive
//       await archive.finalize();
//     }
//   }
// }

import fs from "fs";
import path from "path";
import archiver from "archiver";
import sharp from "sharp";
import https from "https";

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

      // If filePath is an image, resize it
      if (asset.type.includes("image")) {
        const imageBuffer = await sharp(asset.filePath)
          .resize({ width: 1800 })
          .png()
          .toBuffer();
        archive.append(imageBuffer, { name: "heroImage.png" });
        // Add the file from the file path
        archive.file(asset.filePath, {
          name: asset.name + path.extname(asset.filePath),
        });
      } else {
        // Download the image from the given link
        const response = await new Promise<Buffer>((resolve, reject) => {
          https.get(
            "https://proximity-sensorium.s3.eu-west-2.amazonaws.com/proximity-placeholder.png",
            (res) => {
              const chunks: Buffer[] = [];
              res.on("data", (chunk: Buffer) => {
                chunks.push(chunk);
              });
              res.on("end", () => {
                resolve(Buffer.concat(chunks));
              });
              res.on("error", (error) => {
                reject(error);
              });
            }
          );
        });
        archive.append(response, { name: "heroImage.png" });
        // Add the file from the file path
        archive.file(asset.filePath, {
          name: asset.name + path.extname(asset.filePath),
        });
      }

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

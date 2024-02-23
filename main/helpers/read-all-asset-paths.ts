import fs from "fs";
import path from "path";

const getAllFiles = function (
  dirPath: string,
  arrayOfFiles?: string[]
): string[] {
  let files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      if (path.extname(file) === ".pas") {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
};

export default function readAllAssetPaths(
  pathDir: string
): { files: string[] } {
  let files = getAllFiles(pathDir);

  return { files };
}

import fs from 'fs';
import path from 'path';

const getAllFiles = function (dirPath: string, arrayOfFiles?: string[]): string[] {
  let files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
};

export default function openDirectory(pathDir: string): { files: string[]; size: number } {
  let files = getAllFiles(pathDir);
  let size = files.reduce((acc, file) => {
    return acc + fs.statSync(file).size;
  }, 0);

  return { files: files, size: size };
}

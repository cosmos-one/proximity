import fs from "fs";
import path from "path";
import * as Types from "@/types";
import cuid from "cuid";

export default async function createCollection(
  directory: string,
  name: string,
  content?: string
): Promise<Types.CollectionFileType> {
  if (content) {
    const filePath = path.join(directory, name + ".pcol");
    fs.writeFile(filePath, JSON.stringify(content), (err) => {
      if (err) throw err;
    });
    const file: Types.CollectionFileType = {
      id: `${name}.pcol`,
      file: `${name}.pcol`,
      meta: content,
    };
    return file;
  } else {
    const filePath = path.join(directory, name + ".pcol");
    let columns = [];
    for (let i = 0; i < 15; i++) {
      columns.push({});
    }
    let content = [];
    for (let i = 0; i < 10; i++) {
      content.push(columns);
    }
    const body = {
      id: cuid(),
      name: name,
      description: "",
      collectionX: 15,
      collectionY: 10,
      content: content,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    const collectionFile = {
      type: "collection",
      name: "proximity",
      version: "0.1.0",
      body: body,
    };
    fs.writeFile(filePath, JSON.stringify(collectionFile), (err) => {
      if (err) throw err;
    });
    const file: Types.CollectionFileType = {
      id: `${name}.pcol`,
      file: `${name}.pcol`,
      meta: collectionFile,
    };
    return file;
  }
}

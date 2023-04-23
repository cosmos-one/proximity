import fs from 'fs';
import path from 'path';
import * as Types from '@/types'

export default async function createCollection(directory: string, name: string, content?: string): Promise<Types.CollectionFileType> {
  if (content) {
    const filePath = path.join(directory, name + ".pcol");
    fs.writeFile(filePath, JSON.stringify(content), (err) => {
      if (err) throw err;
    });
    const file: Types.CollectionFileType = { id: `${name}.pcol`, file: `${name}.pcol`, data: content };
    return file;
  } else {
    const filePath = path.join(directory, name + '.pcol');
    let columns = []
    for (let i = 0; i < 10; i++) {
    columns.push({})
    }
    let content = []
    for (let i = 0; i < 5; i++) {
    content.push(columns)
    }
    const body = {
        "name": name,
        "description": "",
        "x": 10,
        "y": 5,
        "content": content,
        "createdAt": new Date().toISOString(),
        "lastModified": new Date().toISOString(),
    }
    const collectionFile = {
        "type": "collection",
        "name": "proximity-native",
        "version": "0.1.0",
        "body": body
    }
    fs.writeFile(filePath, JSON.stringify(collectionFile), (err) => {
      if (err) throw err;
    });
    const file: Types.CollectionFileType = { id: `${name}.pcol`, file: `${name}.pcol`, data: collectionFile};
    return file;
  }
}

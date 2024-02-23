import fs from 'fs'
import path from 'path';

export default async function readCollection(slug) {
    let id = path.basename(slug)
    const fileContents = fs.readFileSync(slug, 'utf8');

    //Combine the data with the id
    return {
        id,
        file: id,
        meta: JSON.parse(fileContents)
    };
}
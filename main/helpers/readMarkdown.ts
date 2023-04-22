
import fs from 'fs'
import matter from 'gray-matter';

export default async function readMarkdown(slug) {
    let title = slug.split("/")
    let id = title[title.length-1]
    const fileContents = fs.readFileSync(slug, 'utf8');

    //Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    //Combine the data with the id
    return {
        id,
        ...matterResult.data,
        content: matterResult.content
    };
}
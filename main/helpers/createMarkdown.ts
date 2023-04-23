import fs from 'fs';
import path from 'path';
import * as Types from '@/types'
import TurndownService from 'turndown';
const turndownService = new TurndownService();

export default async function createMarkdown(string: string, directory: string, title: string, content?: string): Promise<Types.MarkdownType> {
  if (content) {
    const filePath = path.join(directory, string + '.md');
    const headers = `---\ntitle: '${title}'\n---\n`;
    const markdown = turndownService.turndown(content);
    fs.writeFile(filePath, headers + markdown, (err) => {
      if (err) throw err;
    });
    const file: Types.MarkdownType = { id: `${string}.md`, file: `${string}.md`, title: title, contentHtml: content };
    return file;
  } else {
    const filePath = directory + '/' + `${string}.md`;
    fs.writeFile(filePath, ' ', (err) => {
      if (err) throw err;
    });
    const file: Types.MarkdownType = { id: `${string}.md`, file: `${string}.md`, title: title, contentHtml: content };
    return file;
  }
}

import fs from 'fs';
import TurndownService from 'turndown';

const turndownService = new TurndownService();

interface File {
  id: string;
  file: string;
  title: string;
  contentHtml: string;
}

export default async function createMarkdown(string: string, directory: string, title: string, content?: string): Promise<File> {
  if (content) {
    const filePath = directory + '/' + `${string}.md`;
    const headers = `---\ntitle: '${title}'\n---\n`;
    const markdown = turndownService.turndown(content);
    fs.writeFile(filePath, headers + markdown, (err) => {
      if (err) throw err;
    });
    const file: File = { id: `${string}.md`, file: `${string}.md`, title: title, contentHtml: content };
    return file;
  } else {
    const filePath = directory + '/' + `${string}.md`;
    fs.writeFile(filePath, ' ', (err) => {
      if (err) throw err;
    });
    const file: File = { id: `${string}.md`, file: `${string}.md`, title: title, contentHtml: content };
    return file;
  }
}

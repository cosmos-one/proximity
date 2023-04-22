import { app, ipcMain, dialog } from 'electron';
import serve from 'electron-serve';
import { createWindow, openDirectory, readRecentDirectories, writeRecentDirectories, createMarkdown, readMarkdown } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden'
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

//Recents
ipcMain.handle('get-recent-directories', async (event) => {
  const recentDirectories = await readRecentDirectories();
  return recentDirectories;
});

ipcMain.handle('add-recent-directory', (event, message) => {
  const recentDirs = readRecentDirectories();
  const newRecentDirs = [message, ...recentDirs.filter(dir => dir !== message)];
  writeRecentDirectories(newRecentDirs);
  return newRecentDirs;
});

//Open Project
ipcMain.handle('choose-directory', async () => {
  const result = await dialog.showOpenDialog({
    properties: [
      "openDirectory"
    ]
  });
  if (!result.canceled && result.filePaths.length > 0) {
    const data = openDirectory(result.filePaths[0])
    return {dir: result.filePaths[0], data: data}
  } else {
    return null; // or you can return an error object
  }
});

ipcMain.handle('open-directory', (event, dir) => {
  const data = openDirectory(dir)
  return data
})

//Markdown
ipcMain.handle('markdown', async (event, message) => {
  if (!message.req) {
    return
  }
  //Get data for a single recipe
  else if (message.req === "GET") {
    let recipe = await readMarkdown(message.path)
    return recipe
  }
  else if (message.req === "POST") {
    //Save recipe
    let md = await createMarkdown(message.name, message.path, message.title, message.body)
    return md
  }
})
import path from "path";
import { app, ipcMain, dialog } from "electron";
import serve from "electron-serve";
import {
  createWindow,
  openDirectory,
  readRecentDirectories,
  writeRecentDirectories,
  createMarkdown,
  readMarkdown,
  createAssets,
  readAsset,
  updateAsset,
  unzipAsset,
  readAllAssetPaths,
  createCollection,
  readCollection,
  updateCollection,
  readCollectionViewport
} from "./helpers";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1200,
    height: 800,
    titleBarStyle: "hidden",
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }

})();

app.on("window-all-closed", () => {
  app.quit();
});

//Recents
ipcMain.handle("get-recent-directories", async (event) => {
  const recentDirectories = await readRecentDirectories();
  return recentDirectories;
});

ipcMain.handle("add-recent-directory", (event, message) => {
  const recentDirs = readRecentDirectories();
  const newRecentDirs = [
    message,
    ...recentDirs.filter((dir) => dir !== message),
  ];
  writeRecentDirectories(newRecentDirs);
  return newRecentDirs;
});

//Open Project
ipcMain.handle("choose-directory", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (!result.canceled && result.filePaths.length > 0) {
    const data = openDirectory(result.filePaths[0]);
    return { dir: result.filePaths[0], data: data };
  } else {
    return null; // or you can return an error object
  }
});

ipcMain.handle("open-directory", (event, dir) => {
  const data = openDirectory(dir);
  return data;
});

//Assets
ipcMain.handle("asset", async (event, message) => {
  if (!message.req) {
    return;
  } else if (message.req === "GET") {
    let asset = await readAsset(message.path);
    return asset;
  } else if (message.req === "POST") {
    let asset = await createAssets(message.path, message.data);
    return asset;
  } else if (message.req === "PATCH") {
    let asset = await updateAsset(
      message.path,
      message.original,
      message.update,
      message.fileData,
      message.imageData
    );
    return asset;
  } else if (message.req === "UNZIP") {
    let asset = await unzipAsset(message.path);
    return asset;
  }
});

ipcMain.handle("assets", async (event, message) => {
  if (!message.req) {
    return;
  } else if (message.req === "GET") {
    let assetPaths = await readAllAssetPaths(message.path);
    let assets = [];
    for (let i = 0; i < assetPaths.files.length; i++) {
      let asset = await readAsset(assetPaths.files[i]);
      assets.push(asset);
    }
    return assets;
  }
});

//Collections
ipcMain.handle("collection", async (event, message) => {
  if (!message.req) {
    return;
  } else if (message.req === "GET") {
    let col = await readCollection(message.path);
    return col;
  } else if (message.req === "POST") {
    let col = await createCollection(message.path, message.name);
    return col;
  } else if (message.req === "PATCH") {
    let col = await updateCollection(
      message.path,
      message.original,
      message.collection
    );
    return col;
  }
});

ipcMain.handle("collection-viewport", async (event, message) => {
  if (!message.req) {
    return;
  } else if (message.req === "GET") {
    let view = await readCollectionViewport(message.dir, message.content);
    return view
  }
})

ipcMain.handle("collection-asset", async (event, message) => {
  if (!message.req) {
    return;
  } else if (message.req === "GET") {
    const fullAssetPath = path.join(message.dir, message.path);
    let view = await readAsset(fullAssetPath);
    return view
  }
})

//Markdown
ipcMain.handle("markdown", async (event, message) => {
  if (!message.req) {
    return;
  }
  //Get data for a single markdown
  else if (message.req === "GET") {
    let md = await readMarkdown(message.path);
    return md;
  } else if (message.req === "POST") {
    //Save markdown
    let md = await createMarkdown(
      message.name,
      message.path,
      message.title,
      message.body
    );
    return md;
  }
});

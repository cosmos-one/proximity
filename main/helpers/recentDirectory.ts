const { app, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const MAX_RECENT_DIRECTORIES = 5;
const RECENT_DIRECTORIES_FILENAME = 'recentDirectories.json';

export function readRecentDirectories() {
  const userDataPath = app.getPath('userData');
  const filePath = path.join(userDataPath, RECENT_DIRECTORIES_FILENAME);
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (err) {
    return [];
  }
}

export function writeRecentDirectories(recentDirectories) {
  const userDataPath = app.getPath('userData');
  const filePath = path.join(userDataPath, RECENT_DIRECTORIES_FILENAME);
  const recentDirectoriesToSave = recentDirectories.slice(0, MAX_RECENT_DIRECTORIES);
  const dataToSave = JSON.stringify(recentDirectoriesToSave);
  fs.writeFileSync(filePath, dataToSave);
}
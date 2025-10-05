import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getAssetPath, getPreloadPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";

// Menu.setApplicationMenu(null);

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath()
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pollResources(mainWindow);

  // handleGetStaticData(() => {
  //   return getStaticData();
  // })

  // ipcMain.handle('getStaticData', (event) => {
  //   return getStaticData();
  // });

  ipcMainHandle('getStaticData', () => {
    return getStaticData();
  });

  createTray(mainWindow);
  createMenu(mainWindow);

  // new Tray(path.join(getAssetPath(), "trayIcon.png"));
  // to use template icon for dark mode in macOS
  // new Tray(path.join(getAssetPath(), process.platform === "darwin" ? "trayIconTemplate.png" : "trayIcon.png"));

  handleCloseEvents(mainWindow);

});

// function handleGetStaticData(callback: () => StaticData) {
//   ipcMain.handle('getStaticData', callback);
// }

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if(app.dock) { // macOS (uses dock)
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}
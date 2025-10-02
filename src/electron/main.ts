import { app, BrowserWindow, ipcMain, Tray } from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getAssetPath, getPreloadPath } from "./pathResolver.js";

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

  new Tray(path.join(getAssetPath(), "trayIcon.png"));
  // to use template icon for dark mode in macOS
  // new Tray(path.join(getAssetPath(), process.platform === "darwin" ? "trayIconTemplate.png" : "trayIcon.png"));

  // close window warning
  mainWindow.on("close", (e) => {
    e.preventDefault();
  });
});

// function handleGetStaticData(callback: () => StaticData) {
//   ipcMain.handle('getStaticData', callback);
// }
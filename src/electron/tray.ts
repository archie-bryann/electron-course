import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import { getAssetPath } from "./pathResolver.js";

export function createTray(mainWindow: BrowserWindow) {
    const tray = new Tray(path.join(getAssetPath(), "trayIcon.png"));
    
    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: "Show",
            click: () => {
                mainWindow.show();
                if(app.dock) { // macOS (uses dock)
                    app.dock.show();
                }
            },
            type: "normal" // allow different types
        },
        {
            label: "Quit",
            click: () => app.quit()
        },
        // {
        //     label: "Options",
        //     submenu: [
        //     {
        //         label: "Option 1",
        //         click: () => {
        //         console.log("Option 1 selected");
        //         }
        //     },
        //     {
        //         label: "Option 2",
        //         click: () => {
        //         console.log("Option 2 selected");
        //         }
        //     }
        //     ]
        // }
    ]));
}


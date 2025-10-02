const electron = require("electron");

electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => {
        // electron.ipcRenderer.on("statistics", (event: Electron.IpcRendererEvent, stats: Statistics) => {
        return ipcOn("statistics", (stats) => {
            callback(stats);
        })
    },
    // getStaticData: () => electron.ipcRenderer.invoke("getStaticData")
    getStaticData: () => ipcInvoke("getStaticData")
} satisfies Window['electron']);

function ipcInvoke<Key extends keyof EventPayloadMapping>(
    key: Key,
): Promise<EventPayloadMapping[Key]> {
    return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
    key: Key,
    callback: (payload: EventPayloadMapping[Key]) => void
) {
    const cb = (event: Electron.IpcRendererEvent, payload: EventPayloadMapping[Key]) => callback(payload)
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
}
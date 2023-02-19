// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

let saveData = (fname, city, site, car, song, mobile) => {
  let data = { fname, city, site, car, song, mobile };
  ipcRenderer.send("saveData", data);
};

let bridge = {
  saveData,
};

contextBridge.exposeInMainWorld("Bridge", bridge);

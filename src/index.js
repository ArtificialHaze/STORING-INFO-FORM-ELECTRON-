const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

// ===========================<<<<<!!!IMPORTANT!!!>>>>>==========================

// 1. DO NOT ENABLE NODE INTEGRATION
// 2. ENABLE CONTEXT ISOLATION
// 3. DEFINE CONTENT SECURITY POLICY IN HTML
// 4. VALIDATE USER INPUT
// 5. png to ico - icon for electron app, nsis installer for windows,license file.md,
// 6. webpreferences: devtools:false,

if (require("electron-squirrel-startup")) {
  app.quit();
}

let win;

ipcMain.on("save-data", (sender, data) => {
  let savingData = JSON.stringify(data);
  fs.writeFileSync("data/data.json", savingData);
});

const createWindow = () => {
  win = new BrowserWindow({
    width: 1366,
    height: 768,
    show: false,
    acceptFirstMouse: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });
  win.loadFile(path.join(__dirname, "index.html"));

  win.on("ready-to-show", () => {
    win.show();
  });

  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  let res = fs.existsSync("data/data.json");
  if (res) {
    let dt = fs.readFileSync("data/data.json");
    let data = JSON.parse(dt);
    console.log(data);
  }
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

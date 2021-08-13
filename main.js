// Main Process (responsible for running main file (in this case main.js))
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

const createWindow = () => {
  // BrowserWindow <- Renderer Process
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("index.html");
  isDev && win.webContents.openDevTools();
};

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron")
  });
}

app.whenReady().then(createWindow);

ipcMain.on("notify", (_, message) => {
  new Notification({
    title: "Notification",
    body: message
  }).show();
});

app.on("window-all-closed", () => {
  // if not running on Mac
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// if running on Mac
if (process.platform === "darwin") {
  app.on("activate", () => {
    // if all window are closed
    // (getAllWindows array is empty)
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}
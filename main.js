const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "core", "api", "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
    title: "Nerd Quiz Engine.",
    icon: path.join(__dirname, "core", "assets", "logo.png"),
  });

  win.loadFile(path.join(__dirname, "core", "mainScreen", "mainScreen.html"));
}

ipcMain.handle("log", async (event, ...args) => {
  console.log("[API]:", ...args);
});

ipcMain.handle("create-file", async (event, content, fileName) => {
  const filePath = path.join(app.getPath("userData"), fileName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(content));
    console.log("[API]: file created!");
    return { success: true, path: filePath };
  } catch (error) {
    console.log("[API]: cant create file...", error.message);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("load-save", async () => {
  try {
    const fileContent = fs.readFileSync(
      path.join(app.getPath("userData"), "user.json"),
      "utf-8",
    );
    console.log("[API]: load file data!", fileContent);
    return { success: true, content: fileContent };
  } catch (err) {
    console.log("[API]:", err.message);
    return { success: false, error: err.message };
  }
});

ipcMain.handle("load-settings", async () => {
  const configPath = path.join(app.getPath("userData"), "settings.json");
  try {
    const fileContent = fs.readFileSync(configPath, "utf-8");
    console.log("[API]: load settings data!", fileContent);
    return { success: true, content: fileContent };
  } catch (err) {
    console.log("[API]:", err.message);
    return { success: false, error: err.message };
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

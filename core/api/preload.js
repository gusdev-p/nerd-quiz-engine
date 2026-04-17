const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  call: (channel, ...data) => ipcRenderer.invoke(channel, ...data),
});

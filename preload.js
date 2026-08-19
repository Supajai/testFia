const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // File Export
  exportPDF: (options) => ipcRenderer.invoke('export-pdf', options),
  saveFile: (options) => ipcRenderer.invoke('save-file', options),
  
  // Excel Operations
  openExcelDialog: () => ipcRenderer.invoke('open-excel-dialog'),
  createExcelTemplate: (options) => ipcRenderer.invoke('create-excel-template', options),
  readExcelFile: (options) => ipcRenderer.invoke('read-excel-file', options),
  saveExcelFile: (options) => ipcRenderer.invoke('save-excel-file', options),
  
  // Local Image Operations
  selectImageDialog: () => ipcRenderer.invoke('select-image-dialog'),
  loadImageFile: (filePath) => ipcRenderer.invoke('load-image-file', filePath)
});

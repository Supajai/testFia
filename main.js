const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

// Disable GPU shader disk cache and HTTP cache to prevent Windows Access Denied (0x5) cache errors
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.commandLine.appendSwitch('disable-http-cache');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1024,
    minHeight: 700,
    title: 'Excel ID Card Badge Manager',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: false
    },
    show: false,
    backgroundColor: '#0f172a'
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * IPC Handler: Save Base64 / Binary Data to File (PDF or PNG)
 */
ipcMain.handle('save-file', async (event, options = {}) => {
  try {
    const win = BrowserWindow.fromWebContents(event.sender) || mainWindow;
    const { data, defaultFilename, filterType } = options;
    if (!data) return { success: false, error: 'No data provided' };

    const filters = filterType === 'png' 
      ? [{ name: 'PNG Image (*.png)', extensions: ['png'] }]
      : [{ name: 'PDF Document (*.pdf)', extensions: ['pdf'] }];

    if (win && !win.isDestroyed()) win.focus();
    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      title: filterType === 'png' ? 'Export ID Card as Image' : 'Export ID Card to PDF',
      defaultPath: defaultFilename || `IDCard_${Date.now()}.${filterType || 'pdf'}`,
      filters
    });

    if (win && !win.isDestroyed()) win.focus();

    if (canceled || !filePath) {
      return { success: false, canceled: true };
    }

    // Extract Base64 binary and write to disk cleanly
    let base64Data = data;
    const commaIndex = data.indexOf(',');
    if (commaIndex !== -1) {
      base64Data = data.substring(commaIndex + 1);
    }
    const buffer = Buffer.from(base64Data.trim(), 'base64');
    await fs.promises.writeFile(filePath, buffer);

    return { success: true, filePath };

  } catch (err) {
    console.error('Failed to save file:', err);
    return { success: false, error: err.message };
  }
});

/**
 * IPC Handler: Export Document to PDF via Isolated Dedicated Print Window
 */
ipcMain.handle('export-pdf', async (event, options = {}) => {
  try {
    const win = BrowserWindow.fromWebContents(event.sender) || mainWindow;
    const defaultFilename = options.filename || `IDCard_${Date.now()}.pdf`;
    
    // Prompt save dialog
    if (win && !win.isDestroyed()) win.focus();
    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      title: 'Export ID Card to PDF',
      defaultPath: defaultFilename,
      filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
    });

    if (win && !win.isDestroyed()) win.focus();

    if (canceled || !filePath) {
      return { success: false, canceled: true };
    }

    // Configure print window
    const printWin = new BrowserWindow({
      show: false,
      width: 800,
      height: 1200,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: false
      }
    });

    const widthMm = options.widthMm || 55;
    const heightMm = options.heightMm || 85;
    const pageSize = {
      width: Math.round(widthMm * 1000),
      height: Math.round(heightMm * 1000)
    };

    const cssFilePath = path.join(__dirname, 'style.css');
    const mainCss = fs.existsSync(cssFilePath) ? fs.readFileSync(cssFilePath, 'utf8') : '';

    const cardStyles = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      @page { margin: 0; size: auto; }
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: #ffffff;
        font-family: 'Sarabun', -apple-system, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .id-card-badge {
        width: 100vw;
        height: 100vh;
        min-height: 100vh;
        position: relative;
        background-color: #ffffff;
        overflow: hidden;
        border-radius: 0 !important;
      }
    `;

    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          ${mainCss}
          ${cardStyles}
        </style>
      </head>
      <body>
        ${options.cardHtml || ''}
      </body>
      </html>
    `;

    await printWin.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`);
    
    // Give fonts and images time to settle
    await new Promise(r => setTimeout(r, 350));

    const pdfOptions = {
      marginsType: 1,
      margins: { marginType: 'none' },
      pageSize: pageSize,
      printBackground: true,
      printSelectionOnly: false,
      landscape: false
    };

    const pdfBuffer = await printWin.webContents.printToPDF(pdfOptions);
    await fs.promises.writeFile(filePath, pdfBuffer);
    printWin.destroy();

    return { success: true, filePath: filePath };

  } catch (err) {
    console.error('Failed to export PDF:', err);
    return { success: false, error: err.message };
  }
});

/**
 * ==============================================================================
 * EXCEL (.XLSX / .XLS / .CSV) IPC HANDLERS
 * ==============================================================================
 */

// Open Excel File Dialog
ipcMain.handle('open-excel-dialog', async (event) => {
  try {
    const win = BrowserWindow.fromWebContents(event.sender) || mainWindow;
    if (win && !win.isDestroyed()) win.focus();
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      title: 'เลือกไฟล์ตารางข้อมูล Excel (.xlsx, .xls, .csv)',
      filters: [
        { name: 'Excel Workbooks (*.xlsx, *.xls, *.csv)', extensions: ['xlsx', 'xls', 'csv'] },
        { name: 'All Files (*.*)', extensions: ['*'] }
      ],
      properties: ['openFile']
    });

    if (win && !win.isDestroyed()) win.focus();

    if (canceled || !filePaths || filePaths.length === 0) {
      return { success: false, canceled: true };
    }

    return { success: true, filePath: filePaths[0] };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// Create Standard Excel Template File Dialog
ipcMain.handle('create-excel-template', async (event) => {
  try {
    const win = BrowserWindow.fromWebContents(event.sender) || mainWindow;
    if (win && !win.isDestroyed()) win.focus();
    const defaultFilename = `ตารางข้อมูลบัตรประจำตัว_${Date.now()}.xlsx`;
    const { canceled, filePath } = await dialog.showSaveDialog(win, {
      title: 'สร้างและบันทึกไฟล์ Excel แม่แบบใหม่ (.xlsx)',
      defaultPath: defaultFilename,
      filters: [{ name: 'Excel Workbook (*.xlsx)', extensions: ['xlsx'] }]
    });

    if (win && !win.isDestroyed()) win.focus();

    if (canceled || !filePath) {
      return { success: false, canceled: true };
    }

    const headers = ['ลำดับ', 'ยศ', 'ชื่อ-นามสกุล', 'ยศ (อังกฤษ)', 'ชื่อ-นามสกุล (อังกฤษ)', 'แผนก', 'วันหมดอายุ', 'หมายเหตุ', 'รูปถ่าย'];
    const sampleRows = [
      headers,
      ['1', 'น.อ.', 'สมชาย ใจดี', 'Gp.Capt.', 'Somchai Jaidee', 'กองบังคับการ', '31 ธ.ค. 2570', 'ตัวอย่างข้อมูล', 'sample_photo.png'],
      ['2', 'น.ท.', 'วิชัย รักชาติ', 'Wg.Cdr.', 'Wichai Rakchat', 'แผนกการข่าว', '31 ธ.ค. 2570', '', '']
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(sampleRows);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'รายชื่อบุคลากร');
    XLSX.writeFile(workbook, filePath);

    return { success: true, filePath };
  } catch (err) {
    console.error('Failed to create Excel template:', err);
    return { success: false, error: err.message };
  }
});

// Read Excel File
ipcMain.handle('read-excel-file', async (event, options = {}) => {
  try {
    const { filePath, sheetName } = options;
    if (!filePath || !fs.existsSync(filePath)) {
      return { success: false, error: 'ไม่พบไฟล์: ' + filePath };
    }

    const workbook = XLSX.readFile(filePath, { cellDates: true });
    const sheetNames = workbook.SheetNames;
    if (!sheetNames || sheetNames.length === 0) {
      return { success: false, error: 'ไฟล์ Excel ไม่มีแผ่นงาน (Worksheet)' };
    }

    const targetSheetName = (sheetName && sheetNames.includes(sheetName)) ? sheetName : sheetNames[0];
    const worksheet = workbook.Sheets[targetSheetName];

    // Read all rows as raw arrays (no header assumption)
    const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

    if (!rawRows || rawRows.length === 0) {
      return { success: true, filePath, fileName: path.basename(filePath), sheetNames, currentSheet: targetSheetName, headers: [], data: [] };
    }

    // === Smart Header Row Auto-Detection ===
    // Some Excel files have title/heading rows above the actual column headers.
    // We detect the real header row by finding the row (among the first 10)
    // that has the most non-empty cells — that's likely the column headers.
    const maxScanRows = Math.min(rawRows.length, 10);
    let headerRowIndex = 0;
    let maxNonEmptyCols = 0;

    for (let i = 0; i < maxScanRows; i++) {
      const row = rawRows[i];
      if (!Array.isArray(row)) continue;
      const nonEmptyCount = row.filter(cell => {
        const val = String(cell || '').trim();
        return val.length > 0;
      }).length;

      if (nonEmptyCount > maxNonEmptyCols) {
        maxNonEmptyCols = nonEmptyCount;
        headerRowIndex = i;
      }
    }

    // Extract headers from the detected header row
    let headers = rawRows[headerRowIndex]
      .map(h => String(h || '').trim())
      .filter(h => h.length > 0);

    // Build data rows from all rows below the header row
    const dataStartIndex = headerRowIndex + 1;
    const rows = [];
    for (let i = dataStartIndex; i < rawRows.length; i++) {
      const rawRow = rawRows[i];
      if (!Array.isArray(rawRow)) continue;

      // Skip completely empty rows
      const hasData = rawRow.some(cell => String(cell || '').trim().length > 0);
      if (!hasData) continue;

      const rowObj = { _rowIndex: i + 1 }; // 1-based Excel row number
      headers.forEach((header, colIdx) => {
        rowObj[header] = (colIdx < rawRow.length) ? rawRow[colIdx] : '';
      });
      rows.push(rowObj);
    }

    console.log(`[Excel] Detected header at row ${headerRowIndex + 1}: [${headers.join(', ')}]  |  Data rows: ${rows.length}`);

    const fileName = path.basename(filePath);

    return {
      success: true,
      filePath,
      fileName,
      sheetNames,
      currentSheet: targetSheetName,
      headers,
      headerRowIndex,
      data: rows
    };

  } catch (err) {
    console.error('Failed to read Excel file:', err);
    return { success: false, error: err.message };
  }
});

// Save Excel File
ipcMain.handle('save-excel-file', async (event, options = {}) => {
  try {
    const { filePath, sheetName, data, headers, headerRowIndex: hri } = options;
    if (!filePath) return { success: false, error: 'ไม่ได้ระบุที่อยู่ไฟล์ Excel' };

    let workbook;
    let titleRows = []; // Rows above the header (title/heading rows to preserve)

    if (fs.existsSync(filePath)) {
      workbook = XLSX.readFile(filePath);

      // If there were title rows above the header, read and preserve them
      const headerRow = (typeof hri === 'number' && hri > 0) ? hri : 0;
      if (headerRow > 0) {
        const targetSheet = sheetName || (workbook.SheetNames.length > 0 ? workbook.SheetNames[0] : 'Sheet1');
        const existingSheet = workbook.Sheets[targetSheet];
        if (existingSheet) {
          const existingRawRows = XLSX.utils.sheet_to_json(existingSheet, { header: 1, defval: '' });
          for (let i = 0; i < headerRow && i < existingRawRows.length; i++) {
            titleRows.push(existingRawRows[i]);
          }
        }
      }
    } else {
      workbook = XLSX.utils.book_new();
    }

    const targetSheet = sheetName || (workbook.SheetNames.length > 0 ? workbook.SheetNames[0] : 'Sheet1');

    // Clean data (strip _rowIndex internal tracking)
    const cleanData = data.map(item => {
      const clean = { ...item };
      delete clean._rowIndex;
      return clean;
    });

    // Build the sheet: title rows + header row + data rows
    const sheetData = [];

    // Add preserved title rows first
    titleRows.forEach(titleRow => {
      sheetData.push(titleRow);
    });

    // Add header row
    sheetData.push(headers);

    // Add data rows in header column order
    cleanData.forEach(row => {
      const rowArray = headers.map(h => (row[h] !== undefined ? row[h] : ''));
      sheetData.push(rowArray);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    workbook.Sheets[targetSheet] = worksheet;
    if (!workbook.SheetNames.includes(targetSheet)) {
      workbook.SheetNames.push(targetSheet);
    }

    XLSX.writeFile(workbook, filePath);

    return { success: true, filePath, savedCount: data.length };

  } catch (err) {
    console.error('Failed to save Excel file:', err);
    return { success: false, error: err.message };
  }
});

/**
 * ==============================================================================
 * LOCAL IMAGE IPC HANDLERS
 * ==============================================================================
 */

// Select Local Image File Dialog
ipcMain.handle('select-image-dialog', async (event) => {
  try {
    const win = BrowserWindow.fromWebContents(event.sender) || mainWindow;
    if (win && !win.isDestroyed()) win.focus();
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      title: 'เลือกรูปถ่ายประจำตัวจากเครื่องคอมพิวเตอร์',
      filters: [
        { name: 'Image Files (*.jpg, *.jpeg, *.png, *.webp)', extensions: ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif'] },
        { name: 'All Files (*.*)', extensions: ['*'] }
      ],
      properties: ['openFile']
    });

    if (win && !win.isDestroyed()) win.focus();

    if (canceled || !filePaths || filePaths.length === 0) {
      return { success: false, canceled: true };
    }

    const selectedPath = filePaths[0];
    const ext = path.extname(selectedPath).toLowerCase().replace('.', '');
    const mime = ext === 'jpg' ? 'jpeg' : (ext || 'png');
    const fileBuffer = await fs.promises.readFile(selectedPath);
    const base64 = `data:image/${mime};base64,${fileBuffer.toString('base64')}`;

    return {
      success: true,
      filePath: selectedPath,
      fileName: path.basename(selectedPath),
      base64
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

// Load Image File by Path
ipcMain.handle('load-image-file', async (event, filePath) => {
  try {
    if (!filePath || !fs.existsSync(filePath)) {
      return { success: false, error: 'File not found' };
    }
    const ext = path.extname(filePath).toLowerCase().replace('.', '');
    const mime = ext === 'jpg' ? 'jpeg' : (ext || 'png');
    const fileBuffer = await fs.promises.readFile(filePath);
    const base64 = `data:image/${mime};base64,${fileBuffer.toString('base64')}`;
    return { success: true, base64 };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

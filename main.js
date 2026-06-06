const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { execSync } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 780,
    minWidth: 900,
    minHeight: 650,
    title: '汉字学习 — 儿童拼音汉字学习',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'src', 'static', 'icon.ico'),
    backgroundColor: '#FFF8F0'
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));
  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC：获取系统已安装字体
ipcMain.handle('get-system-fonts', async () => {
  try {
    let cmd;
    if (process.platform === 'win32') {
      cmd = 'powershell -NoProfile -Command "Add-Type -AssemblyName System.Drawing; [System.Drawing.FontFamily]::Families | ForEach-Object { $_.Name }"';
    } else if (process.platform === 'darwin') {
      cmd = 'system_profiler SPFontsDataType | grep \'Family:\' | sed \'s/.*Family: //\' | sort -u';
    } else {
      cmd = 'fc-list : family | sort -u';
    }
    const output = execSync(cmd, { encoding: 'utf-8', timeout: 10000 });
    const fonts = output.split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0 && f.length < 100)
      .filter((f, i, arr) => arr.indexOf(f) === i);
    return fonts;
  } catch(e) {
    console.error('获取系统字体失败:', e.message);
    return [];
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

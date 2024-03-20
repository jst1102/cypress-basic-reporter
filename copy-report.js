const path = require('path');
const fs = require('fs');

function getAppRootDir () {
  let currentDir = __dirname;
  while (true) {
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      // Check if the parent directory is node_modules
      const parentDir = path.join(currentDir, '..');
      if (path.basename(parentDir) === 'node_modules') {
        // If so, set currentDir to the parent of node_modules
        currentDir = path.join(parentDir, '..');
      } else {
        // If not, we've found the app root
        break;
      }
    } else {
      currentDir = path.join(currentDir, '..');
    }
  }
  return currentDir;
}


class Directory {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  exists() {
    return fs.existsSync(this.dirPath);
  }

  create() {
    if (!this.exists()) {
      fs.mkdirSync(this.dirPath, { recursive: true });
    }
  }
}

class File {
  constructor(filePath) {
    this.filePath = filePath;
  }

  copyTo(destinationPath) {
    fs.copyFile(this.filePath, destinationPath, (err) => {
      if (err) {
        console.error(`Error copying ${this.filePath}:`, err);
        return;
      }
      console.log(`${this.filePath} copied successfully`);
    });
  }
}

const appRootDir = getAppRootDir();
console.log(appRootDir);
const sourceFile = new File(path.join(__dirname, 'report.html'));
const destinationDir = new Directory(path.join(appRootDir, 'reports', 'finalReports'));
const destinationFile = path.join(destinationDir.dirPath, 'report.html');

// Create the 'reports' directory if it doesn't exist
new Directory(path.join(appRootDir, 'reports')).create();

// Create the 'finalReports' directory if it doesn't exist
destinationDir.create();

// Copy the file
sourceFile.copyTo(destinationFile);

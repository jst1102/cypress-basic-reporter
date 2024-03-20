const path = require('path');
const fse = require('fs-extra');

async function getAppRootDir () {
  let currentDir = __dirname;
  while (true) {
    if (await fse.pathExists(path.join(currentDir, 'package.json'))) {
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

  async exists() {
    return await fse.pathExists(this.dirPath);
  }

  async create() {
    if (!(await this.exists())) {
      await fse.mkdir(this.dirPath, { recursive: true });
    }
  }
}

class File {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async copyTo(destinationPath) {
    try {
      await fse.copy(this.filePath, destinationPath);
      console.log(`${this.filePath} copied successfully`);
    } catch (err) {
      console.error(`Error copying ${this.filePath}:`, err);
    }
  }
}

(async () => {
  const appRootDir = await getAppRootDir();
  console.log(appRootDir);
  const sourceFile = new File(path.join(__dirname, 'report.html'));
  const destinationDir = new Directory(path.join(appRootDir, 'reports', 'finalReports'));
  const destinationFile = path.join(destinationDir.dirPath, 'report.html');

  // Create the 'reports' directory if it doesn't exist
  await new Directory(path.join(appRootDir, 'reports')).create();

  // Create the 'finalReports' directory if it doesn't exist
  await destinationDir.create();

  // Copy the file
  await sourceFile.copyTo(destinationFile);
})();

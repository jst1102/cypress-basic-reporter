const path = require('path');
const fs = require('fs');

const writeFile = ({ filePath, data }) => {
  const fullPath = path.join(process.cwd(), filePath);
  const dirPath = path.dirname(fullPath);

  // Check if the directory exists, and create it if it doesn't
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  return fs
    .outputJson(fullPath, data, { spaces: 2 })
    .then(() => {
      return null;
    })
    .catch((err) => {
      console.error('Error writing file:', err);
    });
};

module.exports = { writeFile };
const path = require('path');
const fs = require('fs');

const writeFile = ({ filePath, data }) => {
  const fullPath = path.join(process.cwd(), filePath);
  const reportsDir = path.join(process.cwd(), 'reports');
  const finalReportsDir = path.join(reportsDir, 'finalReports');

  // Check if the 'reports' directory exists, and create it if it doesn't
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Check if the 'finalReports' directory exists, and create it if it doesn't
  if (!fs.existsSync(finalReportsDir)) {
    fs.mkdirSync(finalReportsDir, { recursive: true });
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
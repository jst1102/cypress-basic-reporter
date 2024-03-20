const path = require('path');
const fse = require('fs-extra');

const writeFile = ({ filePath, data }) => {
  const fullPath = path.join(process.cwd(), filePath);
  const reportsDir = path.join(process.cwd(), 'reports');
  const finalReportsDir = path.join(reportsDir, 'finalReports');

  // Check if the 'reports' directory exists, and create it if it doesn't
  if (!fse.existsSync(reportsDir)) {
    fse.mkdirSync(reportsDir, { recursive: true });
  }

  // Check if the 'finalReports' directory exists, and create it if it doesn't
  if (!fse.existsSync(finalReportsDir)) {
    fse.mkdirSync(finalReportsDir, { recursive: true });
  }

  return fse
    .outputJson(fullPath, data, { spaces: 2 })
    .then(() => {
      return null;
    })
    .catch((err) => {
      console.error('Error writing file:', err);
    });
};

module.exports = { writeFile };
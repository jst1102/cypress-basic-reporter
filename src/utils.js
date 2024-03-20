const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const writeFile = ({ filePath, data }) => {
  const fullPath = path.join(process.cwd(), filePath);
  const reportsDir = path.join(process.cwd(), 'reports');
  const finalReportsDir = path.join(reportsDir, 'finalReports');

  // Check if the 'reports' directory exists, and create it if it doesn't
  mkdirp.sync(reportsDir);

  // Check if the 'finalReports' directory exists, and create it if it doesn't
  mkdirp.sync(finalReportsDir);

  return new Promise((resolve, reject) => {
    fs.writeFile(fullPath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
};

module.exports = { writeFile };

const path = require('path');
const fs = require('fs');

const sourceFile = path.join(__dirname, 'report.html');
const reportsDir = path.join(__dirname, '..', 'reports');
const destinationDir = path.join(reportsDir, 'finalReports');
const destinationFile = path.join(destinationDir, 'report.html');

// Create the 'reports' directory if it doesn't exist
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Create the 'finalReports' directory if it doesn't exist
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

// Copy the file
fs.copyFile(sourceFile, destinationFile, (err) => {
  if (err) {
    console.error('Error copying report.html:', err);
    return;
  }
  console.log('report.html copied successfully');
});

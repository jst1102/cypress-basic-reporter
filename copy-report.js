const path = require('path');
const fs = require('fs');

const sourceFile = path.join(__dirname, 'report.html');
const destinationDir = path.join(process.cwd(), 'reports', 'finalReports');
const destinationFile = path.join(destinationDir, 'report.html');

// Create the 'reports' directory if it doesn't exist
const reportsDir = path.join(process.cwd(), 'reports');
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
const ncp = require('ncp').ncp;
const path = require('path');

const sourceFile = path.join(__dirname, 'report.html');
const destinationDir = path.join(__dirname, '..', 'reports', 'finalReports');

ncp(sourceFile, destinationDir, (err) => {
  if (err) {
    console.error('Error copying report.html:', err);
    return;
  }
  console.log('report.html copied successfully');
});
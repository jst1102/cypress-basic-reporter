const fse = require('fs-extra');
const path = require('path');

const folderPath = './reports';
const outputPath = './finalReports/allReports.json';

// Get all JSON files in the folder
const jsonFiles = fse.readdirSync(folderPath).filter(file => path.extname(file).toLowerCase() === '.json');

// Initialize an empty array to store combined JSON data
const combinedData = [];

console.log('Combining JSON files...');

// Loop through each JSON file
for (const file of jsonFiles) {
  const filePath = path.join(folderPath, file);
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  combinedData.push(...jsonData);
}

// Write the combined JSON data to a new file
fse.writeFileSync(outputPath, JSON.stringify(combinedData, null, 2), 'utf8');

console.log('Combining JSON files completed.');
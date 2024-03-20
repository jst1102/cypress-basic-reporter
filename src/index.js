const dayjs = require('dayjs');
const {
  writeFile
} = require('./utils');

let allTestResults = [];

function createReportData(results) {
    const app = window.top;
    const testGroup = app.document.querySelector('.runnable-title').textContent;
    const {
      wallClockDuration,
      title,
      state
    } = results;
    const testTime = wallClockDuration / 1000;
    const roundedTime = Number(testTime.toFixed(3));
    const testFile = Cypress.spec.fileName;
    const testDate = dayjs().format('MM/DD/YYYY');
    const testResult = {
      testDate,
      testFile,
      testGroup,
      title,
      state,
      roundedTime
    };
    const timestamp = new Date().getTime();

    // Append the test result to the array
    allTestResults.push(testResult);

    console.log(allTestResults)
      const fileName = `test-results-${timestamp}.json`;
      const filePath = `./reports/${fileName}`;
      writeFile({
        filePath,
        allTestResults
      }).then(() => {
        console.log(`File ${fileName} written.`);
      }).catch(err => {
        console.error('Error writing file:', err);
      });
}
module.exports = {
  createReportData
};
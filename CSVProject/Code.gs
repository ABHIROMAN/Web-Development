function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('CSV Import')
    .addItem('Import CSV', 'showDialog')
    .addToUi();
}

function showDialog() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('Page')
    .setWidth(400)
    .setHeight(300);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'CSV Import');
}

function importCSV(data) {
  try {
    var csvData = Utilities.parseCsv(data);
    console.log(csvData);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange(sheet.getLastRow() + 1, 1, csvData.length, csvData[0].length).setValues(csvData);
    return "Import successful!";
  } catch (error) {
    return "Error importing CSV: " + error.message;
  }
}
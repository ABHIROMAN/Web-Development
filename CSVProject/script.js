function openCsvImporter() {
    var html = HtmlService.createHtmlOutputFromFile('Index')
        .setWidth(400)
        .setHeight(300);
    SpreadsheetApp.getUi().showModalDialog(html, 'CSV Importer');
  }
  
  function importCsvData(data, selectedColumns) {
    try {
      // Parse the CSV data into rows and columns.
      var rows = Utilities.parseCsv(data);
      
      // Get the active spreadsheet.
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      
      // Determine the next empty row for appending data.
      var lastRow = sheet.getLastRow();
      
      // Find the column indexes for the selected columns.
      var headerRow = rows[0];
      var columnIndexes = [];
      for (var i = 0; i < selectedColumns.length; i++) {
        var columnIndex = headerRow.indexOf(selectedColumns[i]);
        columnIndexes.push(columnIndex);
      }
      
      // Iterate through the rows and append data to the Google Sheet.
      for (var i = 1; i < rows.length; i++) {
        var rowData = [];
        for (var j = 0; j < columnIndexes.length; j++) {
          var columnIndex = columnIndexes[j];
          rowData.push(rows[i][columnIndex]);
        }
        sheet.getRange(lastRow + i, 1, 1, rowData.length).setValues([rowData]);
      }
      
      // Inform the user that the import is complete.
      SpreadsheetApp.getUi().alert('CSV data has been imported successfully.');
    } catch (error) {
      // Handle any errors that occur during the import.
      SpreadsheetApp.getUi().alert('Error importing CSV data: ' + error.message);
    }
  }
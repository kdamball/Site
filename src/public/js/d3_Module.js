var getFootyData = (function() {
	
  
  return {
      //private function variables
      var csvData;
      
      //private function to set the data
      getCSVData: function (type, url, selectId){
        return $.ajax({
          type:	type,
          url:	url,
          data: {id: $(selectId).val()},
          success:	function(data)
          {
            this.drawTable(data); //return the ajax call data to the csvData        
          }
        });
      }
     
      processData : function tabulate(element, data, columns) {
        
            var columnNames = ["Date", "Home Team", "Away Team", "FT Home Goals", "FT Away Goals", "FT Result", "HT Home Goals", "HT Away Goals", "HT Result", "Referee", "Home Team Shots", "Away Team Shots", "Home Team Shots on Target", "Away Team Shots on Target", "Home Team Fouls", "Away Team Fouls", "Home Corners", "Away Corners", "Home Yellow Cards", "Away Yellow Cards", "Home Red Cards", "Away Red Cards"];
        
            var columnsToDisplay = ["Date", "HomeTeam", "AwayTeam", "FTHG", "FTAG", "FTR", "HTHG", "HTAG", "HTR", "Referee", "HS", "AS", "HST", "AST", "HF", "AF", "HC", "AC", "HY", "AY", "HR", "AR"];

            columns = columnsToDisplay;
            
            $(element).empty(); //Clear the placeholder text in the table div
              
            var table = d3.select(element).append("table")
              .style("border-collapse", "collapse")
              .style("border", "1px black solid"),
            thead = table.append("thead"),
            tbody = table.append("tbody");

            // append the header row
            thead.append("tr")
                .selectAll("th")
                .data(columnNames)
                .enter()
                .append("th")
                .style({
                  "border":"1px black solid",
                  "padding": "5px",
                  "background-color":"#72EDED",
                  "cursor":"pointer",
                  "font-size":"0.8em"
                })
                .text(function(column) { return column; });

            // create a row for each object in the data
            var rows = tbody.selectAll("tr")
                .data(data)
                .enter()
                .append("tr");

            // create a cell in each row for each column
            var cells = rows.selectAll("td")
                .data(function(row) {
                    
                    return columns.map(function(column) {
                        return {column: column, value: row[column]};
                    });
                })
                .enter()
                .append("td")
                .style("border", "1px black solid")
                .style({
                    "padding":"2px",
                    "font-size":"0.9em"
                })
                .text(function(d) { return d.value; });
              
            return table;
          }
    }
    
 })();
 $("select").on('change', function(){
    getFootyData.getData();
 })


 
 
 
 
 
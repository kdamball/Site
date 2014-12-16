(function(){
  $('select').on('change', function(){
    var t0, t1,t2,t3;
    t0 = new Date();
    var arrData = [];
    
    $('#table').empty().append("<img src='/pics/ajax-loading.gif'>");
    
    $.ajax({
          type: "post",
          url: "/scripts/csvScrapper.php",
          data: {id: $('select').val()},
          success: function(datum) {
              t1 = (new Date() - t0)/1000;
              console.log(datum);
              ajaxSuccess(datum); // "something"
          },
      });
      
    function ajaxSuccess(csv){
    
      d3.csv.parse(csv, function(dataset) {
        arrData.push(dataset);
      });  
      //function for table creation
      function tabulate(data, columns) {
          
        $('#table').empty(); //Clear the placeholder text in the table div
          
        var table = d3.select("#table").append("table")
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
        
      //The names have to be the exact ones like the ones on the csv file
      var columnsToDisplay = ["Date", "HomeTeam", "AwayTeam", "FTHG", "FTAG", "FTR", "HTHG", "HTAG", "HTR", "Referee", "HS", "AS", "HST", "AST", "HF", "AF", "HC", "AC", "HY", "AY", "HR", "AR"];
      
      //Column names (can't use the above names as they are abbreviations)
      var columnNames = ["Date", "Home Team", "Away Team", "FT Home Goals", "FT Away Goals", "FT Result", "HT Home Goals", "HT Away Goals", "HT Result", "Referee", "Home Team Shots", "Away Team Shots", "Home Team Shots on Target", "Away Team Shots on Target", "Home Team Fouls", "Away Team Fouls", "Home Corners", "Away Corners", "Home Yellow Cards", "Away Yellow Cards", "Home Red Cards", "Away Red Cards"];
      
      //run the tabulate function
      tabulate(arrData, columnsToDisplay);

      //adding tableSorter and DataTable functionalities
      $("th").first().addClass("sorter-ddmmyy");
      $("table").tablesorter({
            headers : { 0 : { sorter: "ddmmyy" } }
          })
          .dataTable( {
            "sScrollY": "400px",
            "bPaginate": false
          });
          
      //main inheriting the table width   
      var tableWidth = $('table').width() + 20;
      $('.main').width(tableWidth);
      
      t2 = (new Date() - t0)/1000;
      console.log("Time after success: " +t1+ "seconds. Time after table drawing: " +t2+ "seconds. Final time run: " +t3+ "seconds.");
    };
    t3 = (new Date() - t0)/1000;
    
    
  });

}());

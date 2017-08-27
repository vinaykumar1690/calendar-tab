google.charts.load("current", {
  packages: ["timeline"]
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var container = document.getElementById('example4.2');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({
    type: 'string',
    id: 'Role'
  });
  
  dataTable.addColumn({
    type: 'string',
    role: 'desc'
  });
  dataTable.addColumn({
    type: 'date',
    id: 'Start'
  });
  dataTable.addColumn({
    type: 'date',
    id: 'End'
  });
  dataTable.addRows([

   ['Your Day', 'M2',new Date(0, 0, 0, 1, 0, 0), new Date(0, 0, 0, 2, 0, 0)],
    ['Your Day', 'M3',new Date(0, 0, 0, 2, 0, 0), new Date(0, 0, 0, 2, 45, 0)],
        ['Your Day', 'M1',new Date(0, 0, 0, 12, 0, 0), new Date(0, 0, 0, 13, 0, 0)]
  ]);

  var options = {
    timeline: {
      groupByRowLabel: true,
      showBarLabels: false,
    },
   avoidOverlappingGridLines: false
  };
  chart.draw(dataTable, options);
}


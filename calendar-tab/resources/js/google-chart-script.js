function drawTimeline(events) {
    var container = document.getElementById('calendar');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn({
      type: 'string',
      id: 'Date'
    });

    dataTable.addColumn({
      type: 'string',
      id: 'Event'
    });

    dataTable.addColumn({
      type: 'date',
      id: 'Start'
    });

    dataTable.addColumn({
      type: 'date',
      id: 'End'
    });

    dataTable.addRows(events);

    var options = {
      timeline: {
        groupByRowLabel: true,
        showBarLabels: false,
      },
      avoidOverlappingGridLines: false
    };

    chart.draw(dataTable, options);
  }

function drawChart(events) {
  google.charts.load("current", {
    packages: ["timeline"]
  });
  google.charts.setOnLoadCallback(function() {
    drawTimeline(events)
  });
}
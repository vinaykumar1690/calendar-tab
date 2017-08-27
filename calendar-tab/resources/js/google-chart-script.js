function drawTimeline(events) {
    var container = document.getElementById('calendar');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    var startDate= new Date();
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
    startDate.setMilliseconds(0)
    var endDate = new Date();
    endDate.setHours(24)
    endDate.setMinutes(0)
    endDate.setSeconds(0)
    endDate.setMilliseconds(0)


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
        showRowLabels : false,
        showBarLabels: false,
      },
      avoidOverlappingGridLines: true,
      hAxis: {
        minValue: startDate,
        maxValue: endDate
      }
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
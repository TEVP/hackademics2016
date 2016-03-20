'use strict';
(function(){

class GeneralAnalysisComponent {
  constructor() {
    this.chartObject = {};
    this.init();
  }

  hideSeries(selectedItem) {
    var col = selectedItem.column;
    if (selectedItem.row === null) {
      if (this.chartObject.view.columns[col] == col) {
        this.chartObject.view.columns[col] = {
          label: this.chartObject.data.cols[col].label,
          type: this.chartObject.data.cols[col].type,
          calc: function() {
            return null;
          }
        };
        this.chartObject.options.colors[col - 1] = '#CCCCCC';
      }
      else {
        this.chartObject.view.columns[col] = col;
        this.chartObject.options.colors[col - 1] = this.chartObject.options.defaultColors[col - 1];
      }
    }
  }

  init() {
    let values = [
      ['4->6',0.52,0.38333333333333,0.425],
      ['6->8',0.63,0.3,0.4],
      ['8->10',0.8,0.36666666666667,0.5],
      ['10->12',0.425,0.28333333333333,0.375],
      ['12->14',0.325,0.31666666666667,0.375],
      ['14->16',0.375,0.23333333333333,0.475],
      ['16->18',0.4,0.35,0.45],
      ['18->20',0.325,0.43333333333333,0.3],
      ['20->22',0.3,0.73333333333333,0.45],
      ['22->24',0.45,0.45,0.5],
      ['0->2',0.2,0.41666666666667,0.3],
      ['2->4',0.25,0.45,0.475]
    ];

    values = values.map(value => {
      return {
        c: value.map(v => {
          return {v: v};
        })
      };
    });

    console.log(values);

    this.chartObject.type = 'LineChart';
    this.chartObject.data = {
      cols: [
        {
          id: 'hours',
          label: 'Hours',
          type: 'string'
        },{
          id: 'logic',
          label: 'Logical Thinking',
          type: 'number'
        },{
          id: 'memory',
          label: 'Memory Retrieval',
          type: 'number'
        },{
          id: 'art',
          label: 'Art sense',
          type: 'number'
        }
      ],

      rows: values
    };

    this.chartObject.options = {
      title: 'Brain Performance',
      colors: ['#0000FF', '#009900', '#CC0000', '#DD9900'],
      defaultColors: ['#0000FF', '#009900', '#CC0000', '#DD9900'],
      isStacked: 'true',
      fill: 20,
      displayExactValues: true,
      vAxis: {
        title: 'Percentage',
        gridlines: {
            count: 10
        }
      },
      curveType: 'function',
      hAxis: {
        title: 'Date'
      },
      legend: {
        position: 'bottom'
      },
      backgroundColor: { fill:'transparent' },
      lineWidth: 4
    };

    this.chartObject.view = {
      columns: [0, 1, 2, 3]
    };
  }
}

angular.module('devApp')
  .component('generalAnalysis', {
    templateUrl: 'app/generalAnalysis/generalAnalysis.html',
    controller: GeneralAnalysisComponent
  });

})();

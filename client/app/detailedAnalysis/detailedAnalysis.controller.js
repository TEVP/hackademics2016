'use strict';
(function(){

class DetailedAnalysisComponent {
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
      ['0->2',0.4,0.3,0.2,0.35,0.35,0.55,0.3,0.3],
      ['2->4',0.4,0.35,0.2,0.25,0.3,0.4,0.4,0.3],
      ['4->6',0.5,0.5,0.45,0.7,0.45,0.4,0.4,0.3],
      ['6->8',0.3,0.45,0.35,0.55,0.9,0.5,0.9,0.3],
      ['8->10',0.4,0.45,0.4,0.6,0.45,0.4,0.25,0.4],
      ['10->12',0.3,0.6,0.35,0.45,0.45,0.3,0.45,0.8],
      ['12->14',0.4,0.6,0.25,0.5,0.5,0.65,0.5,0.4],
      ['14->16',0.55,0.45,0.4,0.6,0.4,0.3,0.15,0.2],
      ['16->18',0.45,0.55,0.35,0.25,0.2,0.5,0.5,0.4],
      ['18->20',0.2,0.2,0.35,0.5,0.4,0.25,0.55,0.3],
      ['20->22',0.4,0.4,0.45,0.3,0.45,0.35,0.4,0.3],
      ['22->24',0.1,0.35,0.3,0.4,0.1,0.3,0.5,0.3]
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
          id: 'science',
          label: 'Science',
          type: 'number'
        },{
          id: 'art',
          label: 'Art',
          type: 'number'
        },{
          id: 'geography',
          label: 'Geography',
          type: 'number'
        },{
          id: 'music',
          label: 'Music',
          type: 'number'
        },{
          id: 'sport',
          label: 'Sport',
          type: 'number'
        },{
          id: 'iq',
          label: 'IQ',
          type: 'number'
        },{
          id: 'general-knowledge',
          label: 'General Knowledge',
          type: 'number'
        },{
          id: 'reflex',
          label: 'Reflex',
          type: 'number'
        }
      ],

      rows: values
    };

    this.chartObject.options = {
      title: 'Brain Performance',
      colors: ['#0000FF', '#009900', '#CC0000', '#DD9900', '#D32F2F', '#C2185B', '#6A1B9A', '#2196F3'],
      defaultColors: ['#0000FF', '#009900', '#CC0000', '#DD9900', '#D32F2F', '#C2185B', '#6A1B9A', '#2196F3'],
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
      }
    };

    this.chartObject.view = {
      columns: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => {
        var col = this.chartObject.data.cols[index];
        col.calc = () => {
          return null;
        }

        return col;
      })
    };
  }
}

angular.module('devApp')
  .component('detailedAnalysis', {
    templateUrl: 'app/detailedAnalysis/detailedAnalysis.html',
    controller: DetailedAnalysisComponent
  });

})();

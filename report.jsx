var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
  { title: 'Date', value: 'date' },
  { title: 'Host', value: 'host' }
]

var reduce = function (row, memo) {

  if (row.type == 'impression') {
    memo.impressions = (memo.impressions || 0) + 1
  }

  if (row.type == 'load') {
    memo.loads = (memo.loads || 0) + 1
  }

  if (row.type == 'display') {
    memo.displays = (memo.displays || 0) + 1
  }
  return memo
}

var calculations = [
  {
    title: 'Impressions', value: 'impressions',
    template: function (val, row) { return val }
  },
  {
    title: 'Loads', value: 'loads',
    template: function (val, row) { return val }
  },
  {
    title: 'Displays', value: 'displays',
    template: function (val, row) { return val }
  },

  {
    title: 'Load Rate',
    value: function (memo) { return memo.loads / memo.impressions },
    template: function (val, row) { return (val * 100).toFixed(1) + '%' },
  },
  {
    title: 'Display Rate',
    value: function (memo) { return memo.displays / memo.loads },
    template: function (val, row) { return (val * 100).toFixed(1) + '%' },
  }
]

module.exports = createReactClass({
  render() {
    return <ReactPivot rows={rows}
      dimensions={dimensions}
      reduce={reduce}
      calculations={calculations} />

  }
})

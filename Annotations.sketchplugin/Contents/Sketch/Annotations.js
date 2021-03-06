const sketch = require('sketch')
var document = require('sketch/dom').Document
var SymbolInstance = require('sketch/dom').SymbolInstance
var UI = require('sketch/ui')
var async = require('sketch/async')
var DataSupplier = require('sketch/data-supplier')
var Settings = require('sketch/settings')
var Artboard = require('sketch/dom').Artboard



var onRun = function(context) {
  var document = sketch.getSelectedDocument()
  var page = document.selectedPage
  var selection = document.selectedLayers

  var annotationList = []

  //Get all selected layers that are named Annotation and add to array
  for(var i = 0; i < selection.layers.length; i++){
    if(selection.layers[i].name.indexOf("Annotation") > -1){
      var annotationInstance = {
        name: selection.layers[i].name,
        y: selection.layers[i].frame.y,
      }
      annotationList.push(annotationInstance)
    }
  }

  //Sort array and reorder based on y value
  annotationList.sort(function(a,b){
    return a.y - b.y
  })

  //Find symbol inststance by name in the array
  annotationList.forEach(function(j,k){
    for (var i = 0; i < selection.layers.length; i++) {
      if (j.name == selection.layers[i].name){
        selection.layers[i].setOverrideValue(selection.layers[i].overrides[0], k+1)
      }
    }
  })
  sketch.UI.message('It worked!')
}

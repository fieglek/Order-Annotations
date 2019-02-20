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

  var sidebarList = []

  console.log("NEW RUN");
  //make an array of selected layers with properties of name and y value
  for(var i=0; i<selection.layers.length; i++){
    var sidebarInstance = {
      name: selection.layers[i].name,
      y: selection.layers[i].frame.y
    }
    sidebarList.push(sidebarInstance);
  }

  //Sort array and reorder based on y value
  sidebarList.sort(function(a,b){
    return a.y - b.y
  })
  console.log("sorted sidebarList:")
  console.log(sidebarList);

  //change first value in string text to match Y axis order
    //cycle through sidebar list and if current iteration of array ==
  sidebarList.forEach(function(j,k){
    for (var i = 0; i < selection.layers.length; i++) {

      if (j.name == selection.layers[i].name){
        console.log("value j:")
        console.log(j);
        var removedNumberText = selection.layers[i].text.slice(1);
        var sidebarNumber = (k+1).toString();
        var updatedText = sidebarNumber.concat(removedNumberText);
        selection.layers[i].text = updatedText;
      }
    }

  })


  sketch.UI.message('It worked!!1')
}

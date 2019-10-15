function onRun(context) {
  var sketch = context.api();
  var selection = context.selection;
  var doc = context.document;

  var sidebarList = []

  //make an array of selected layers with properties of name, y value, layer id
  for(var i=0; i<selection.length; i++){
    var sidebarInstance = {
      name: selection[i].name(),
      y: selection[i].frame().y(),
      layer_id: selection[i].objectID()
    }
    sidebarList.push(sidebarInstance);
  }

  //Sort array and reorder based on y value
  sidebarList.sort(function(a,b){
    return a.y - b.y
  })

  //change first value in string text to match Y axis order
  //j is currentValue, k is index of current element
  sidebarList.forEach(function(j,k){
    for (var i = 0; i < selection.length; i++) {
      if (j.layer_id == selection[i].objectID()){
          //regex means break at first . or -
        var splitText = selection[i].stringValue().split(/[-.](.+)/);
        var sidebarNumber = (k+1).toString();
        var updatedText = sidebarNumber.concat(" -", splitText[1]);
        selection[i].setStringValue(updatedText);
      }
    }
  })
  sketch.UI.message('It worked!')
}

(function(){
  var container = document.getElementById('jsoneditor');
  var options = {
    modes: ['text', 'code', 'tree', 'form', 'view'],
    mode: 'code',
    ace: ace
  };
  var json = {
    'array': [1, 2, 3],
    'boolean': true,
    'null': null,
    'number': 123,
    'object': {'a': 'b', 'c': 'd'},
    'string': 'Hello World'
  };
  window.editor = new JSONEditor(container, options, json);

}());
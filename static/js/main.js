(function () {
  // var CHANNEL = 'pudding';
  var CHANNEL = 'TEST';
  var btn = $('#btn');
  // var socket = io.connect('http://pusher.qcloudtest.cn/?channelId=' + CHANNEL);
  var socket = io.connect('http://localhost:3333/?channelId=' + CHANNEL);
  var url = '/api/data/proxy/';

  btn.click(function (event) {
    event.preventDefault();
    var data = {
      channel: CHANNEL,
      data: editor.get()
    };

    $.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
  })

  socket.on('message', function(msg) {
    var msg = msg || {};
    dataContainer.set(msg);
  });
}());
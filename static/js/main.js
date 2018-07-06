(function () {
    // var CHANNEL = 'pudding';
    var CHANNEL = 'TEST';
    var btn = $('#btn');
    var txt = $(':text');
    var div = $('.j-flag');
    // var socket = io.connect('http://pusher.qcloudtest.cn/?channelId=' + CHANNEL);
    var socket = io.connect('http://localhost:3333/?channelId=' + CHANNEL);
    var url = '/api/data/proxy/';

    btn.click(function (event) {
        event.preventDefault();
        var data = {
            channel: CHANNEL,
            url: txt.val()
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
        var html = '';
        for (key in msg) {
          html += '<p>' + key + ': ' + msg[key] + '</p>';
        }
        div.html(html);
    });
    console.log(editor.get());
    // socket.on('message', function(msg) {
    //     var msg = msg || {};
    //     p.html('<h3>channel: '+ msg.channel +'</h3><h3>content: '+ msg.url +'</h3>');  
    // })
}());
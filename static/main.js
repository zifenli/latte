(function () {
    var CHANNEL = 'pudding';
    var btn = $('#btn');
    var txt = $(':text');
    var p = $('.j-flag');
    var socket = io.connect('http://140.143.187.20:3333/?channelId=' + CHANNEL);
    var url = 'http://qcloudtest.cn/api/async/services/requests/';

    btn.click(function (event) {
        event.preventDefault();
        var data = {
            channel: CHANNEL,
            value: txt.val()
        };

        $.ajax({
            type: 'POST',
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data)
        })
    })

    socket.on('message', function(msg) {
        p.html('<h3>channel: '+ msg.channel +'</h3><h3>content: '+ msg.content +'</h3>');  
    })
}());
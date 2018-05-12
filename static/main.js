(function () {
    var CHANNEL = 'pudding';
    var btn = $('#btn');
    var txt = $(':text');
    var p = $('.j-flag');
    var socket = io.connect('http://127.0.0.1:3333/?channelId=' + CHANNEL);

    btn.click(function (event) {
        event.preventDefault();
        var data = {
            channel: CHANNEL,
            content: txt.val()
        };

        $.ajax({
            type: 'POST',
            url: '/test/',
            contentType: 'application/json',
            data: JSON.stringify(data)
        })
    })

    socket.on('message', function(msg) {
        p.html('<h3>channel: '+ msg.channel +'</h3><h3>content: '+ msg.content +'</h3>');  
    })
}());
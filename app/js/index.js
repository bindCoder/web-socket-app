var socket = io();
var jQeury = $;
socket.on("connect", function () {
    console.log("Connected to server.");
})
socket.on('newMessage', (msg) => {
    var li= $('<li></li>');
    li.text(`${msg.from}:${msg.text}`);
    $("#messages").append(li);
});
socket.on('newMember', (msg) => {
    console.log(msg);
})
socket.on('disconnect', function () {
    console.log('disconect from server');
})

$('#chat-form').on('submit',(e)=>{
    e.preventDefault();
    socket.emit("newMessage",{
        from:'user',
        text:$('[name=message]').val()
    })
    $('[name=message]').val('');
})
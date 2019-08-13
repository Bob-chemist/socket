const socket = io.connect('http://localhost:3000'); //Подключаемся к нашему соккету
const me = 'Bob';

socket.on('connect', () => { //При успешном соединении с сервером    
    console.info("Connected to server");
    socket.emit('name', me);
});

function send() {
    const msg = document.getElementById('m'),
    receiver  = document.getElementById('private-selection').value,
    message = {
        author: me,
        msg: msg.value,
        receiver,
    }


    socket.emit('private message', message);
    msg.value = '';
    msg.focus();
}

function sendToAll() {
    let msg = document.getElementById('m');    
    const message = {
        author: me,
        msg: msg.value,        
    }

    socket.emit('chat message', me, message);
    msg.value = '';
    msg.focus();
}

socket.on('private message', function(msg){ //Когда с сервера приходит сообщение    
    console.info(msg);
    msg.forEach(el => {
        const li = document.createElement("li"),        
            date = new Date(+el.id).toLocaleString();

        li.innerHTML = el.author + ' [' + date + ']: <br>' + el.message;
        document.getElementById("private").appendChild(li);
    });
    
});

socket.on('chat message', function(msg){
    const li=document.createElement("li");
    li.innerHTML = msg.author + ': <br>' + msg.msg;
    document.getElementById("chat").appendChild(li);
    });


var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use('/static',express.static('bower_components'));

app.get('/',(req,resp)=>

{
	resp.sendfile('public/index.html');
})

var conversation = [];

var users = [];

function createUser()
{
	var number = Math.random();
	//has to be unique
	return number;
}

io.on('connection',(socket)=>
{

	var user = createUser();
	console.log('adding user '+user);
	io.emit('userCreated', user);
	users.push(user);
	console.log('connected');
	socket.on('messagePublished',function(ms)
		{
			conversation.push(ms);
			io.emit('messageBroadcasted', ms);
			console.log(ms);
		}
	)
	socket.on('disconnect',()=>{console.log('disconnected');
console.log(conversation);});
})


http.listen(3000,()=>{
	console.log('listening ');
})



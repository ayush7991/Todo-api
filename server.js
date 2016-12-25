var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Watch Forest Gump',
	completed: false
}, {
	id: 2,
	description: 'Play assassin creed unity',
	completed: false
},{
	id: 3,
	description: 'Sleep ,Sleep and Sleep',
	completed: true
}];
app.get('/', function(req,res){
	res.send('Todo api Root')
});

app.get('/todos',function(req,res){
	res.json(todos);
})

app.get('/todos/:id',function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo;
	//res.json(todos[0]);
	todos.forEach(function(todo){
		if(todo.id === todoId){
			matchedTodo = todo;
		}
	});
	if(matchedTodo){
		res.json(matchedTodo);
	}
	else{
		res.status(404).send();
	}

	//res.json('Asking for todos with id ' + req.params.id);
})

app.listen(PORT,function(){
	console.log('express listening on port ' + PORT + '!' );
})
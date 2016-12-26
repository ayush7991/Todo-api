var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todoNextId = 1;
var todos = [];
app.use(bodyParser.json());
app.get('/', function(req,res){
	res.send('Todo api Root')
});

app.get('/todos',function(req,res){
	res.json(todos);
})

app.get('/todos/:id',function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if(matchedTodo){
		res.json(matchedTodo);
	}
	else{
		res.status(404).send();
	}

	//res.json('Asking for todos with id ' + req.params.id);
})

app.post('/todos',function(req,res){
	var body = _.pick(req.body, 'description' , 'completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	body.description = body.description.trim();

	body.id = todoNextId++;
	todos.push(body);
//	console.log('description' + body.description);
	res.json(body);
});
	

app.delete('/todos/:id',function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if(matchedTodo){
		todos = _.without(todos,matchedTodo);
		res.json(matchedTodo);	
	}
	else{
		res.status(404).send();
	}
});

app.listen(PORT,function(){
	console.log('express listening on port ' + PORT + '!' );
})
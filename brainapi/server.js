const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
	{
		id: '987',
		hash: '$2a$10$Fup4FMoZLV7uE95rmxhT5eZ/MuF.ukWXTcp7RpL.xcvuzIlN7zi4y',
		email: 'john@gmail.com'
	},
	{
		id: '988',
		hash: '$2a$10$PTOo4u1gQjlRsa6PUIt5xuUONxyLwFoZ4pY2baH7I4Q2uE99yv.1a',
		email: 'sally@gmail.com'
	}
	]
};

app.get('/', (req, res) => {
	res.send(database.users);
});

app.post('/signin', (req, res) => {
	let auth = false;
	bcrypt.compare(req.body.password, database.login[0].hash, (err, res) => {
		auth = res;
		console.log(auth);
	});
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in');
	}
});

app.post('/register', (req, res) => {
	const { email, password, name } = req.body;
	bcrypt.hash(password, null, null, (err, hash) => {
		console.log(hash);
	});
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	});
	res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			res.json(user);
		}
	});
	if (!found) {
		res.status(400).json('not found');
	}
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			res.json(user.entries);
		}
	});
	if (!found) {
		res.status(400).json('not found');
	}
});

app.listen(3000, () => {
	console.log('app is running on port 3000');
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user obj
/profile/:userId --> GET = user
/image --> PUT --> user(count)

*/
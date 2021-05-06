import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import User from '../model/User.js';

let should = chai.should();
chai.use(chaiHttp);

describe('/POST register', function () {
	// Delete the user if he exists

	before(function () {
		User.deleteOne({ email: 'mdupont@email.com' });
	});

	// it('should return the user informations and his token', function (done) {
	// 	// const credentials = {
	// 	// 	username: 'marcel dupond',
	// 	// 	email: 'mdupont@email.com',
	// 	// 	password: '123456789',
	// 	// };
	// 	chai
	// 		.request(app)
	// 		.post('/api/auth/register')
	// 		.send(credentials)
	// 		.end(function (err, res) {
	// 			res.should.have.status(200);
	// 			res.body.should.be.a('object');
	// 			res.body.should.have.property('newUser');
	// 			res.body.should.have.property('token');
	// 			done();
	// 		});
	// });

	it('should return the unique email error', function (done) {
		const credentials = {
			username: 'kevin jean',
			email: 'kjean@email.com',
			password: '123456789',
		};
		chai
			.request(app)
			.post('/api/auth/register')
			.send(credentials)
			.end(function (error, res) {
				res.should.have.status(400);
				res.body.should.be.a('object');
				res.body.should.have.property('errors');
				res.body.errors.should.have.property('email');
				// Notify that this callback has completed because it runs asynchronously
				done();
			});
	});
});

describe('/POST login', function () {
	// before('connect', async () => {
	// 	await initiateMongoServer();
	// });

	it('should return the name and the token of the user', (done) => {
		const credentials = {
			email: 'kjean@email.com',
			password: '123456789',
		};
		chai
			.request(app)
			.post('/api/auth/login')
			.send(credentials)
			// When we have the server's response
			.end((error, response) => {
				response.should.have.status(200);
				response.body.should.be.a('object');
				response.body.should.have.property('foundUser');
				response.body.should.have.property('token');
				// Notify that this callback has completed because it runs asynchronously
				done();
			});
	});

	it('should return the error the login is not found', (done) => {
		const credentials = {
			email: 'kjean@email.co',
			password: '123456789',
		};
		chai
			.request(app)
			.post('/api/auth/login')
			.send(credentials)
			// When we have the server's response
			.end((error, response) => {
				response.should.have.status(401);
				response.body.should.be.a('object');
				response.body.should.have.property('error');
				response.body.should.have.property('error').eql('Login not found');
				// Notify that this callback has completed because it runs asynchronously
				done();
			});
	});

	it('should return the error the password is not found', (done) => {
		const credentials = {
			email: 'kjean@email.com',
			password: '12345678',
		};
		chai
			.request(app)
			.post('/api/auth/login')
			.send(credentials)
			// When we have the server's response
			.end((error, response) => {
				response.should.have.status(401);
				response.body.should.be.a('object');
				response.body.should.have.property('error');
				response.body.should.have.property('error').eql('Password not found');
				// Notify that this callback has completed because it runs asynchronously
				done();
			});
	});
});

describe('/GET me', function () {});
describe('/POST logout', function () {});
describe('/POST logoutall', function () {});

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import User from '../model/User.js';

let should = chai.should();
chai.use(chaiHttp);
describe('/POST register', function () {
	before(async function () {
		// Delete the user if he exists
		// await : wait the app to delete the user
		await User.deleteOne({
			email: 'testmdupont@email.com',
		});
	});

	it('should return the user information', function (done) {
		const credentials = {
			username: 'TEST_marcel dupont',
			email: 'testmdupont@email.com',
			password: '123456789',
		};
		chai
			.request(app)
			.post('/api/auth/register')
			.send(credentials)
			.end(function (err, res) {
				res.should.have.status(201);
				res.body.should.be.a('object');
				res.body.should.have.property('newUser');
				done();
			});
	});

	it('should return the unique email error', function (done) {
		const credentials = {
			username: 'TEST_kevin jean',
			email: 'testkjean@email.com',
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

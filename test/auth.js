import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
chai.use(chaiHttp);

describe('/POST login', function () {
	it('it should not POST the name, email of the user'),
		(done) => {
			const credentials = {
				email: 'martinmatin@email.com',
				password: '123456789',
			};
			chai
				.request(app)
				.post('/login')
				.send(credentials)
				// When we have the server's response
				.end((error, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have.property('errors');
					// Notify that this callback has completed because it runs asynchronously
					done();
				});
		};
});

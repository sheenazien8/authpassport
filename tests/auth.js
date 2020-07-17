// Import the dependencies for testing
const app = require('./../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const {expect} = chai;
chai.use(chaiHttp);

chai.should(); describe("auth test", () => {
  let token;
  describe("GET /", () => {
    // Test to get all students record
    it("should get status server is 200", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equals(true);
          done();
        });
    });

    it("should get 404 code", (done) => {
      chai
        .request(app)
        .post("/login")
        .send({
          email: 'admin@edsaxample.com',
          password: '12345678'
        })
        .end((err, res) => {
          expect(res).to.have.status(404)
          expect(res.body.success).to.equals(false)
          done()
        })
    });

    it("test success user login", (done) => {
      chai
        .request(app)
        .post("/login")
        .send({
          email: 'admin@example.com',
          password: '12345678'
        })
        .end((err, res) => {
          token = res.body.token
          expect(res).to.have.status(200)
          expect(res.body.success).to.equals(true)
          done()
        })
    });

    it("test wrong password", (done) => {
      chai
        .request(app)
        .post("/login")
        .send({
          email: 'admin@example.com',
          password: '1s2345672138'
        })
        .end((err, res) => {
          expect(res).to.have.status(401)
          expect(res.body.success).to.equals(false)
          done()
        })
    });

    it('test user is cant go to /me if didnot use token', (done) => {
      chai
        .request(app)
        .get('/me')
        .end((err, res) => {
          expect(res).to.have.status(401)
          done()
        })
    });

    it('test user is logged in', (done) => {
      chai
        .request(app)
        .get('/me')
        .auth(token, {type: 'bearer'})
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body.success).to.equals(true)
          done()
        })
    });

  });
});

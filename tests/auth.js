// Import the dependencies for testing
const app = require('./../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const {expect} = chai;
chai.use(chaiHttp);

chai.should(); describe("auth test", () => {
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
  });
});

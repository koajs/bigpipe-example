var superagent = require('supertest')

var app = require('..')

function request() {
  return superagent(app.listen())
}

describe('BigPipe Example', function () {
  describe('Favicon', function () {
    it('should 400', function (done) {
      request()
      .get('/favicon.ico')
      .expect(404, done)
    })
  })

  describe('Home', function () {
    it('should redirect to /taylorswift', function (done) {
      request()
      .get('/')
      .expect(302)
      .expect('location', '/taylorswift')
      .end(done)
    })
  })

  describe('Search', function () {
    it('should redirect to /taylorswift if no ?q', function (done) {
      request()
      .get('/search')
      .expect(302)
      .expect('location', '/taylorswift')
      .end(done)
    })

    it('should 400 if ?q=', function (done) {
      request()
      .get('/search?q')
      .expect(400, done)
    })

    it('should work if ?q=taylor', function (done) {
      request()
      .get('/search?q=taylor')
      .expect(200)
      .end(function (err, res) {
        if (err)
          throw err

        res.body.length.should.be.ok
        res.body[0].display_name.toLowerCase().should.equal('taylorswift')
        done()
      })
    })
  })

  describe('Subreddit', function () {
    describe('/taylorswift', function () {
      it('should work with sequential', function (done) {
        request()
        .get('/taylorswift')
        .expect(200, done)
      })

      it('should work with parallel', function (done) {
        request()
        .get('/taylorswift?parallel')
        .expect(200, done)
      })

      it('should work with bigpipe', function (done) {
        request()
        .get('/taylorswift?bigpipe')
        .expect(200, done)
      })
    })

    describe('/a', function () {
      // Not an actual subreddit

      it('should work with sequential', function (done) {
        request()
        .get('/a')
        .expect(200, done)
      })

      it('should work with parallel', function (done) {
        request()
        .get('/a?parallel')
        .expect(200, done)
      })

      it('should work with bigpipe', function (done) {
        request()
        .get('/a?bigpipe')
        .expect(200, done)
      })
    })
  })
})
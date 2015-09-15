var RF = require('ramda-fantasy')
var Future = RF.Future
var fu = require('..')(Future)
var assert = require('assert')

describe('futureUtils', function() {


  describe('fromPomise', function() {

    it('should convert a resolved promise to a resolved future', function(done) {
      var f = fu.fromPomise(Promise.resolve('foo'))
      f.fork(done, function(val) {
        assert.equal('foo', val)
        done()
      })
    })

    it('should convert a rejected promise to a rejected future', function(done) {
      var f = fu.fromPomise(Promise.reject(new Error('bar')))
      f.fork(function(e) {
        assert.equal('bar', e.message)
        done()
      })
    })

  })

})

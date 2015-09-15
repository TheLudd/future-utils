var RF = require('ramda-fantasy')
var Future = RF.Future
var fu = require('..')(Future)
var fs = require('fs')
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

  describe('futurify', function() {

    var readFile = fu.futurify(fs.readFile)

    it('returns a function that will return a future instead of taking a node callback', function(done) {
      var f = readFile(__filename, 'utf-8')
      f.fork(done, function(contents) {
        assert.notEqual(-1, contents.indexOf("'futurify'"))
        done()
      })
    })

    it('will resolve an error if the node callback gives one', function(done) {
      var f = readFile('./nonexistingfile', 'utf-8')
      f.fork(function(e) {
        assert.equal('ENOENT', e.code)
        done()
      })
    })

  })

})

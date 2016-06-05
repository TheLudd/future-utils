module.exports = function(Future) {

  return {

    fromPomise: function(promise) {
      return new Future(function(reject, resolve) {
        promise.then(resolve, reject)
      })
    },

    futurify: function(f, owner) {
      return function() {
        var args = arguments
        return new Future(function(reject, resolve) {
          function nodeResolver(e, res) {
            return e != null ? reject(e) : resolve(res)
          }
          var fullArgs = Array.prototype.slice.call(args).concat(nodeResolver)
          f.apply(owner, fullArgs)
        })
      }
    }

  }

}

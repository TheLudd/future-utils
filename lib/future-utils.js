module.exports = function(Future) {

  return {

    fromPomise: function(promise) {
      return new Future(function(reject, resolve) {
        promise.then(resolve, reject)
      })
    }

  }

}

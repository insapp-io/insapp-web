export default class Events {
  constructor(AppConstants, $http, $q) {
    'ngInject'

    this._AppConstants = AppConstants
    this._$http = $http
    this._$q = $q
  }

  query(config) {
    let url

    if (config.association) {
      url = this._AppConstants.api + '/associations/' + config.association + '/events'
    } else {
      url = this._AppConstants.api + '/events'
    }

    const request = {
      method: 'GET',
      url
    }

    return this._$http(request).then(res => res.data)
  }

  get(id) {
    let deferred = this._$q.defer()

    this._$http({
      url: this._AppConstants.api + '/events/' + id,
      method: 'GET'
    }).then(
      res => deferred.resolve(res.data),
      err => deferred.reject(err)
    )

    return deferred.promise
  }

  save(post) {
    let request = {}

    if (post.ID) {
      request.url = `${this._AppConstants.api}/events/${post.ID}`
      request.method = 'PUT'

      delete post.imageUrl
      delete post.ID
    } else {
      request.url = `${this._AppConstants.api}/events`
      request.method = 'POST'
    }

    request.data = post

    return this._$http(request).then(res => res.data)
  }

  delete(post) {
    let deferred = this._$q.defer()

    this._$http({
      url: `${this._AppConstants.api}/events/${post.ID}`,
      method: 'DELETE'
    }).then(
      res => deferred.resolve(res.data),
      err => deferred.reject(err)
    )

    return deferred.promise
  }
}
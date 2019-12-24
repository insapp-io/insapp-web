export default class Event {
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

  save(event) {
    let request = {}

    if (event.ID) {
      request.url = `${this._AppConstants.api}/events/${event.ID}`
      request.method = 'PUT'

      delete event.imageUrl
      delete event.ID
    } else {
      request.url = `${this._AppConstants.api}/events`
      request.method = 'POST'
    }

    request.data = event

    return this._$http(request).then(res => res.data)
  }

  delete(event) {
    let deferred = this._$q.defer()

    this._$http({
      url: `${this._AppConstants.api}/events/${event.ID}`,
      method: 'DELETE'
    }).then(
      res => deferred.resolve(res.data),
      err => deferred.reject(err)
    )

    return deferred.promise
  }
}
export default class Posts {
  constructor(AppConstants, $http, $q) {
    'ngInject'

    this._AppConstants = AppConstants
    this._$http = $http
    this._$q = $q
  }

  query(config) {
    let url

    if (config.association) {
      url = this._AppConstants.api + '/associations/' + config.association + '/posts'
    } else {
      url = this._AppConstants.api + '/posts'
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
      url: this._AppConstants.api + '/posts/' + id,
      method: 'GET'
    }).then(
      res => deferred.resolve(res.data),
      err => deferred.reject(err)
    )

    return deferred.promise
  }

  save(post) {
    const request = {
      method: 'POST',
      url: this._AppConstants.api + '/posts',
      data: post
    }

    return this._$http(request).then(res => res.data)
  }
}
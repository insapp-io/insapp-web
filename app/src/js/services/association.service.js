export default class Association {
  constructor(AppConstants, User, $http, $state, $q) {
    'ngInject'

    this._AppConstants = AppConstants
    this._User = User
    this._$http = $http
    this._$state = $state
    this._$q = $q

    this.current = null
  }

  query() {
    const request = {
      url: `${this._AppConstants.api}/associations`,
      method: 'GET'
    }

    return this._$http(request).then(res => res.data)
  }

  getCurrent() {
    return this._$http({
      url: `${this._AppConstants.api}/associations/${this._User.current.association}`,
      method: 'GET'
    }).then(
      res => {
        this.current = res.data
        return this.current
      }
    )
  }

  get(id) {
    let deferred = this._$q.defer()

    this._$http({
      url: `${this._AppConstants.api}/associations/${id}`,
      method: 'GET'
    }).then(
      res => deferred.resolve(res.data),
      err => deferred.reject(err)
    )

    return deferred.promise
  }

  save(association) {
    let request = {}

    if (association.ID) {
      request.url = `${this._AppConstants.api}/associations/${association.ID}`
      request.method = 'PUT'

      delete association.coverPictureUrl
      delete association.profilePictureUrl
      delete association.ID
    } else {
      request.url = `${this._AppConstants.api}/associations`
      request.method = 'POST'
    }

    request.data = association

    return this._$http(request).then(res => res.data)
  }
}
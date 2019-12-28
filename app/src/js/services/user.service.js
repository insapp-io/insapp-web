export default class User {
  constructor(AppConstants, $http, $state, $q) {
    'ngInject'

    this._AppConstants = AppConstants
    this._$http = $http
    this._$state = $state
    this._$q = $q

    this.current = null
  }

  query() {
    const request = {
      url: `${this._AppConstants.api}/users`,
      method: 'GET'
    }

    return this._$http(request).then(res => res.data)
  }

  delete(user) {
    let deferred = this._$q.defer()

    this._$http({
      url: `${this._AppConstants.api}/users/${user.ID}`,
      method: 'DELETE'
    }).then(
      res => deferred.resolve(res.data),
      err => deferred.reject(err)
    )

    return deferred.promise
  }

  attemptAuth(credentials) {
    return this._$http({
      url: `${this._AppConstants.api}/login/association`,
      method: 'POST',
      data: {
        username: credentials.username,
        password: credentials.password
      }
    }).then(
      res => {
        this.current = res.data
        return res
      }
    )
  }

  verifyAuth() {
    let deferred = this._$q.defer()

    if (this.current) {
      deferred.resolve(true)
    } else {
      this._$http({
        url: `${this._AppConstants.api}/association`,
        method: 'GET'
      }).then(
        res => {
          this.current = res.data
          deferred.resolve(true)
        },
        err => {
          deferred.resolve(false)
        }
      )
    }
    
    return deferred.promise
  }
  
  ensureAuthIs(bool) {
    let deferred = this._$q.defer()

    this.verifyAuth().then((authValid) => {
      if (authValid !== bool) {
        this._$state.go('app.login')
        deferred.resolve(false)
      } else {
        deferred.resolve(true)
      }
    })

    return deferred.promise
  }

  logout() {
    this.current = null

    this._$http({
      url: `${this._AppConstants.api}/logout/association`,
      method: 'POST'
    }).then(
      res => this._$state.go(this._$state.$current, null, { reload: true })
    )
  }
}
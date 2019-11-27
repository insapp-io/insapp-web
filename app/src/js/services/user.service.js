export default class User {
  constructor(AppConstants, $http, $state, $q) {
    'ngInject'

    this._AppConstants = AppConstants
    this._$http = $http
    this._$state = $state
    this._$q = $q

    this.current = null
  }
  
  attemptAuth(type, credentials) {
    let route = (type === 'login') ? '/login' : ''

    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      (res) => {
        this.current = res.data.user
        return res;
      }
    )
  }
  
  update(fields) {
    return this._$http({
      url:  this._AppConstants.api + '/user',
      method: 'PUT',
      data: { user: fields }
    }).then(
      (res) => {
        this.current = res.data.user
        return res.data.user
      }
    )
  }

  logout() {
    this.current = null
    this._JWT.destroy()
    this._$state.go(this._$state.$current, null, { reload: true })
  }
  
  verifyAuth() {
    let deferred = this._$q.defer()

    if (this.current) {
      deferred.resolve(true)
    } else {
      this._$http({
        url: this._AppConstants.api + '/association',
        method: 'GET'
      }).then(
        res => {
          this.current = res.data.user
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
        this._$state.go('app.home')
        deferred.resolve(false)
      } else {
        deferred.resolve(true)
      }
    })

    return deferred.promise
  }
}
export default class Comments {
  constructor(AppConstants, $http, $q) {
    'ngInject'

    this._AppConstants = AppConstants
    this._$http = $http
    this._$q = $q
  }

  delete(post, comment) {
    let deferred = this._$q.defer()

    this._$http({
      url: `${this._AppConstants.api}/posts/${post.ID}/comment/${comment.ID}`,
      method: 'DELETE'
    }).then(
      res => deferred.resolve(res.data),
      err => deferred.reject(err)
    )

    return deferred.promise
  }
}

export default class Posts {
  constructor(AppConstants, $http, $q) {
    'ngInject'

    this._AppConstants = AppConstants
    this._$http = $http
    this._$q = $q
  }

  query() {
    // Create the $http object for this request
    let request = {
      url: this._AppConstants.api + '/posts',
      method: 'GET',
    }

    return this._$http(request).then((res) => res.data)
  }
}
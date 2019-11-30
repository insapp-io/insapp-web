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

    return this._$http(request).then((res) => res.data)
  }
}
class PostsController {
  constructor(AppConstants, $scope) {
    'ngInject'

    this.appName = AppConstants.appName
    this._$scope = $scope
  }
}

export default PostsController
function Upload() {
  'ngInject'

  return {
    link: ($scope, el) => {
      el.bind("change", event => {
        $scope.file = (event.srcElement || event.target).files[0]
        $scope.getFile()
      })
    }
  }
}

export default Upload
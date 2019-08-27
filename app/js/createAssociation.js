app.controller('CreateAssociation', ['$scope', '$resource', 'Session', '$location', 'ngDialog', 'configuration', '$loadingOverlay', function($scope, $resource, Session, $location, ngDialog, configuration, $loadingOverlay) {
  var Association = $resource(configuration.api + '/associations?token=:token')
  var User = $resource(configuration.api + '/associations/:id/user?token=:token')

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
};

  $scope.currentAssociation = {
    owner: Session.getAssociation(),
    master : false,
    username : "",
    password : "",
    name : "",
    association : "",
  }

  $scope.monitorLength = function (field, maxLength) {
    if ($scope.currentAssociation[field] && $scope.currentAssociation[field].length && $scope.currentAssociation[field].length > maxLength) {
      $scope.currentAssociation[field] = $scope.currentAssociation[field].substring(0, maxLength);
    }
    if (field == "name" && $scope.currentAssociation[field]){
      $scope.currentAssociation[field] = $scope.currentAssociation[field].replace(/\s/g, '');
    }
  }

  $scope.createAssociation = function() {
    $loadingOverlay.show()
    $("html, body").animate({ scrollTop: 0 }, "slow");
    Association.save({token:Session.getToken()}, $scope.currentAssociation, function(assos) {
        ngDialog.open({
            template: "<h3 style='text-align:center;'>L'association à été créée</h3>",
            plain: true,
            className: 'ngdialog-theme-default'
        });
        $loadingOverlay.hide()
        $location.path('/myEvents')
    }, function(error) {
      displayError = error.status + " " + error.statusText
      if(error.data.error){
        displayError += " -- " + error.data.error
      }
      ngDialog.open({
          template: "<h3 style='text-align:center;'>Une erreur est survenue :\n" + displayError + "</h3>",
          plain: true,
          className: 'ngdialog-theme-default'
      });
      $loadingOverlay.hide()
    });
  }

}])
;

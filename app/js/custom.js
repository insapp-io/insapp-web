angular.module('insapp', ['ngResource'])
.controller('SearchController', ['$scope', '$resource', function($scope, $resource) {
  var Association = $resource('http://fthomasmorel.ml:9000/association/:id');
  console.log("test");
  $scope.newEvent = {
    name: "",
    email: "",
    description: "",
    events: [],
    photoUrl: "",
    bgColor: "eeaaee",
    fgColor: "aaaaaa"
  }

  $scope.associations = Association.query({}, function() {
    console.log("Received the association list");
  });

  $scope.addAssociation = function() {
    var asso = new Association($scope.newEvent);
    asso.$save(function(user, responseHeaders) {
      console.log("New user added");
      //Refresh the list
      $scope.associations = Association.query();
    });
  }

}])
;

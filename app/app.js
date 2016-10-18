var app = angular.module('insapp', ['ngRoute','ngResource','ui.bootstrap.datetimepicker', 'ngFileUpload', 'ngDialog', 'ngFileUpload', 'ngLoadingOverlay','angular-spinkit']);

app.config(['$loadingOverlayConfigProvider', function ($loadingOverlayConfigProvider) {
    $loadingOverlayConfigProvider.defaultConfig('<img style="display: block;margin-left: auto;margin-right: auto; width:50px" src="/web/images/loader.gif"></img><h3>Chargement</h3>', 'rgba(0, 0, 0, 0.5)', '#fff');
  }
]);

app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);
  $routeProvider
        .when('/', {
          templateUrl: "/web/templates/login.html",
          controller:'LoginAssociation',
        })
        .when('/login', {
          templateUrl: "/web/templates/login.html",
          controller:'LoginAssociation',
        })
        .when('/logout', {
          templateUrl: "/web/templates/logout.html",
          controller:'LogoutAssociation',
        })
        .when('/myEvents', {
          templateUrl: "/web/templates/myEvents.html",
          controller:'MyEvents',
         })
        .when('/myPosts', {
          templateUrl: "/web/templates/myPosts.html",
          controller:'MyPosts',
        })
        .when('/myEvents/:id', {
          templateUrl: "/web/templates/myEventReader.html",
          controller:'MyEventReader',
         })
        .when('/myPosts/:id', {
          templateUrl: "/web/templates/myPostsReader.html",
          controller:'MyPostsReader',
        })
        .when('/myAssociation/:id', {
         templateUrl: "/web/templates/myAssociation.html",
         controller:'MyAssociation',
        })
        .when('/createEvent', {
         templateUrl: "/web/templates/createEvent.html",
         controller:'CreateEvent',
        })
        .when('/createPost', {
         templateUrl: "/web/templates/createPost.html",
         controller:'CreatePost',
        })
        .when('/users', {
         templateUrl: "/web/templates/users.html",
         controller:'Users',
        })
        .when('/validationEvent', {
         templateUrl: "/web/templates/validationEvent.html",
         controller:'ValidationEvent',
        })
        .when('/validationPost', {
         templateUrl: "/web/templates/validationPost.html",
         controller:'ValidationPost',
        })
        .when('/validationAssociation', {
         templateUrl: "/web/templates/validationAssociation.html",
         controller:'ValidationAssociation',
        })
        .when('/createAssociation', {
         templateUrl: "/web/templates/createAssociation.html",
         controller:'CreateAssociation',
        })
        .otherwise({
            template: 'does not exists'
        });
});

app.factory('Session', function () {

    var token = '';
    var associationID = '';
    var master = false;
    var loggedInCallback;

    return {
      destroyCredentials: function(){
        window.localStorage.removeItem("authToken");
        window.localStorage.removeItem("associationID");
        window.localStorage.removeItem("master");
        token = ''
        associationID = ''
        master = false
        loggedInCallback()
      },
      getToken: function () {
          token = window.localStorage.getItem("authToken");
          return token;
      },
      setToken: function (t) {
          window.localStorage.setItem("authToken", t);
          token = t;
      },
      setLoggedInCallback: function (f) {
          loggedInCallback = f
      },
      getAssociation: function () {
          associationID = window.localStorage.getItem("associationID");
          return associationID;
      },
      setAssociation: function (a) {
          window.localStorage.setItem("associationID", a);
          associationID = a;
      },
      setMaster: function(m){
        window.localStorage.setItem("master", m);
        master = m;
        loggedInCallback()
      },
      getMaster: function(){
        master = window.localStorage.getItem("master");
        return master;
      }
    };
});

app.directive('search', function () {
    return function ($scope, element) {
        element.bind("keyup", function (event) {
          var val = element.val();
          $scope.search(val);
        });
    };
});

app.service('fileUpload', ['$http', 'ngDialog',  function ($http, ngDialog) {
    this.uploadFileToUrl = function(file, uploadUrl, callback){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data, status, headers, config){
          callback(true, data)
        })
        .error(function(data, status, headers, config){
          callback(false, data)
        });
    }
}]);

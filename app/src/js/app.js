import angular from 'angular'
import config from './config/app.config'

import './config/app.templates'
import 'angular-route'
import 'angular-resource'
import 'angular-ui-bootstrap'
import 'angular-ui-bootstrap-datetimepicker'
import 'ng-dialog'
import 'ng-file-upload'
import 'ng-loading-overlay'

const requires = [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'ngDialog',
  'ngFileUpload',
  'ngLoadingOverlay'
]

var app = angular.module('insapp', requires)

app.constant('configuration', config)

app.factory('session', function() {
  var associationID = '';
  var master = false;
  var loggedInCallback;

  return {
    destroyCredentials: function() {
      window.localStorage.removeItem("associationID");
      window.localStorage.removeItem("master");
      token = ''
      associationID = ''
      master = false
      loggedInCallback()
    },

    setLoggedInCallback: function(f) {
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

app.service('fileUpload', ['$http', 'ngDialog',  function($http, ngDialog) {
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

app.service('authInterceptor', function($q, $location) {
  var service = this;

  service.responseError = function(response) {
    if (response.status == 401) {
      session.destroyCredentials()
      $location.path('/login');
    }

    return $q.reject(response);
  };
})

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}])

app.config(function($routeProvider, $locationProvider, configuration) {
  $locationProvider.html5Mode(false);

  $routeProvider
    .when('/', {
      templateUrl: configuration.baseUrl + "/login.html",
      controller:'LoginAssociation',
    })
    .when('/login', {
      templateUrl: configuration.baseUrl + "/login.html",
      controller:'LoginAssociation',
    })
    .when('/logout', {
      templateUrl: configuration.baseUrl + "/logout.html",
      controller:'LogoutAssociation',
    })
    .when('/myEvents', {
      templateUrl: configuration.baseUrl + "/myEvents.html",
      controller:'MyEvents',
      })
    .when('/myPosts', {
      templateUrl: configuration.baseUrl + "/myPosts.html",
      controller:'MyPosts',
    })
    .when('/myEvents/:id', {
      templateUrl: configuration.baseUrl + "/myEventReader.html",
      controller:'MyEventReader',
      })
    .when('/myPosts/:id', {
      templateUrl: configuration.baseUrl + "/myPostsReader.html",
      controller:'MyPostsReader',
    })
    .when('/myAssociation/:id', {
      templateUrl: configuration.baseUrl + "/myAssociation.html",
      controller:'MyAssociation',
    })
    .when('/createEvent', {
      templateUrl: configuration.baseUrl + "/createEvent.html",
      controller:'CreateEvent',
    })
    .when('/createPost', {
      templateUrl: configuration.baseUrl + "/createPost.html",
      controller:'CreatePost',
    })
    .when('/users', {
      templateUrl: configuration.baseUrl + "/users.html",
      controller:'Users',
    })
    .when('/validationEvent', {
      templateUrl: configuration.baseUrl + "/validationEvent.html",
      controller:'ValidationEvent',
    })
    .when('/validationPost', {
      templateUrl: configuration.baseUrl + "/validationPost.html",
      controller:'ValidationPost',
    })
    .when('/validationAssociation', {
      templateUrl: configuration.baseUrl + "/validationAssociation.html",
      controller:'ValidationAssociation',
    })
    .when('/createAssociation', {
      templateUrl: configuration.baseUrl + "/createAssociation.html",
      controller:'CreateAssociation',
    })
    .otherwise({
        template: 'does not exist'
    });
});

app.config(['$loadingOverlayConfigProvider', 'configuration', function ($loadingOverlayConfigProvider, configuration) {
  $loadingOverlayConfigProvider.defaultConfig('<img style="display: block;margin-left: auto;margin-right: auto; width:50px" src="' + configuration.baseUrl + '/images/loader.gif"></img><h3>Chargement</h3>', 'rgba(0, 0, 0, 0.5)', '#fff');
}]);

app.directive('search', function() {
  return function ($scope, element) {
    element.bind("keyup", function(event) {
      var val = element.val();
      $scope.search(val);
    });
  };
});

app.controller('NavigationController', ['$scope', 'session', '$location', 'configuration', function($scope, session, $location, configuration) {
  $scope.master = null;
  $scope.baseUrl = configuration.baseUrl
  $scope.isLoggedIn = isLoggedIn()
  session.setLoggedInCallback(isLoggedIn)

  function isLoggedIn(){
    $scope.master = (session.getMaster() == 'true')
    $scope.loggedIn = session.getAssociation() != null
  }

  $scope.isActive = function (viewLocation) {
    return $location.path().indexOf(viewLocation) > -1
  };
}]);

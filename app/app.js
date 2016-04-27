var app = angular.module('insapp', ['ngRoute','ngResource','ui.bootstrap.datetimepicker']);

app.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
        .when('/', {
          templateUrl: "templates/myEvents.html",
          controller:'MyEvents',
        })
       .when('/myEvents', {
         templateUrl: "templates/myEvents.html",
         controller:'MyEvents',
        })
        .when('/myEvents/:id', {
          templateUrl: "templates/myEventReader.html",
          controller:'MyEventReader',
         })
        .when('/myAssociation', {
         templateUrl: "templates/myAssociation.html",
         controller:'MyAssociation',
        })
        .when('/createEvent', {
         templateUrl: "templates/createEvent.html",
         controller:'CreateEvent',
        })
        .otherwise({
            template: 'does not exists'
        });
});

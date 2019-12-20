import angular from 'angular'

// Event list module
let eventListModule = angular.module('app.eventlist', [])

import EventListConfig from './list.config'
eventListModule.config(EventListConfig)

import EventListController from './list.controller'
eventListModule.controller('EventListController', EventListController)

// Event create module
let eventCreateModule = angular.module('app.eventcreate', [])

import EventCreateConfig from './create.config'
eventCreateModule.config(EventCreateConfig)

import EventCreateController from './create.controller'
eventCreateModule.controller('EventCreateController', EventCreateController)

// Event view module
let eventViewModule = angular.module('app.eventview', [])

import EventViewConfig from './view.config'
eventViewModule.config(EventViewConfig)

import EventViewController from './view.controller'
eventViewModule.controller('EventViewController', EventViewController)

export { 
  eventListModule,
  eventCreateModule,
  eventViewModule
}

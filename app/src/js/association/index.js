import angular from 'angular'

// Association view module
let associationViewModule = angular.module('app.associationview', [])

import AssociationViewConfig from './view.config'
associationViewModule.config(AssociationViewConfig)

import AssociationViewController from './view.controller'
associationViewModule.controller('AssociationViewController', AssociationViewController)

export {
  associationViewModule
}

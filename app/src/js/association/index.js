import angular from 'angular'

// Association view module
let associationViewModule = angular.module('app.associationview', [])

import AssociationViewConfig from './view.config'
associationViewModule.config(AssociationViewConfig)

import AssociationViewController from './view.controller'
associationViewModule.controller('AssociationViewController', AssociationViewController)

// Association create module
let associationCreateModule = angular.module('app.associationcreate', [])

import AssociationCreateConfig from './create.config'
associationCreateModule.config(AssociationCreateConfig)

import AssociationCreateController from './create.controller'
associationCreateModule.controller('AssociationCreateController', AssociationCreateController)

// Association validate module
let associationValidateModule = angular.module('app.associationvalidate', [])

import AssociationValidateConfig from './validate.config'
associationValidateModule.config(AssociationValidateConfig)

import AssociationValidateController from './validate.controller'
associationValidateModule.controller('AssociationValidateController', AssociationValidateController)

export {
  associationViewModule,
  associationCreateModule,
  associationValidateModule
}

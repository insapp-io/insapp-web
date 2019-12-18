import angular from 'angular'

let directivesModule = angular.module('app.directives', [])

import ShowAuthed from './show-authed.directive'
directivesModule.directive('showAuthed', ShowAuthed)

import ShowAdmin from './show-admin.directive'
directivesModule.directive('showAdmin', ShowAdmin)

export default directivesModule
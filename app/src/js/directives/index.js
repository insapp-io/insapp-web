import angular from 'angular'

let directivesModule = angular.module('app.directives', [])

import ShowAuthed from './show-authed.directive'
directivesModule.directive('showAuthed', ShowAuthed)

import ShowAdmin from './show-admin.directive'
directivesModule.directive('showAdmin', ShowAdmin)

import ConfirmClick from './confirm-click.directive'
directivesModule.directive('confirmClick', ConfirmClick)

export default directivesModule
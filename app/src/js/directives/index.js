import angular from 'angular'

let directivesModule = angular.module('app.directives', [])

import ShowAuthed from './show-authed.directive'
directivesModule.directive('showAuthed', ShowAuthed)

export default directivesModule
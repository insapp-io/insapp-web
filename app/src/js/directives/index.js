import angular from 'angular'

let directivesModule = angular.module('app.directives', [])

import ShowAuthed from './show-authed.directive'
directivesModule.directive('showAuthed', ShowAuthed)

import ShowAdmin from './show-admin.directive'
directivesModule.directive('showAdmin', ShowAdmin)

import Upload from './upload.directive'
directivesModule.directive('upload', Upload)

export default directivesModule
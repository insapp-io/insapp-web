import angular from 'angular'

let servicesModule = angular.module('app.services', [])

import UserService from './user.service'
servicesModule.service('User', UserService)

import AssociationService from './association.service'
servicesModule.service('Association', AssociationService)

import PostService from './post.service'
servicesModule.service('Post', PostService)

import EventService from './event.service'
servicesModule.service('Event', EventService)

import CommentService from './comment.service'
servicesModule.service('Comment', CommentService)

export default servicesModule
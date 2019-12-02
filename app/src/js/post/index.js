import angular from 'angular'

// Post list module
let postListModule = angular.module('app.postlist', [])

import PostListConfig from './list.config'
postListModule.config(PostListConfig)

import PostListController from './list.controller'
postListModule.controller('PostListController', PostListController)

// Post create module
let postCreateModule = angular.module('app.postcreate', [])

import PostCreateConfig from './create.config'
postCreateModule.config(PostCreateConfig)

import PostCreateController from './create.controller'
postCreateModule.controller('PostCreateController', PostCreateController)

let fileReader = function($q) {
  let onLoad = (reader, deferred, $scope) => {
    return () => {
      $scope.$apply(() => {
        deferred.resolve(reader.result)
      })
    }
  }

  let onError = (reader, deferred, $scope) => {
    return () => {
      $scope.$apply(() => {
        deferred.reject(reader.result)
      })
    }
  }

  let onProgress = (reader, $scope) => {
    return event => {
      $scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      })
    }
  }

  let getReader = (deferred, $scope) => {
    let reader = new FileReader()

    reader.onload = onLoad(reader, deferred, $scope)
    reader.onerror = onError(reader, deferred, $scope)
    reader.onprogress = onProgress(reader, $scope)

    return reader
  }

  return {
    readAsDataUrl: (file, $scope) => {
      let deferred = $q.defer()
        
      let reader = getReader(deferred, $scope)    
      reader.readAsDataURL(file)
        
      return deferred.promise
    }
  }
}

postCreateModule.factory('FileReader', fileReader)

postCreateModule.controller('UploadController', (FileReader, $scope) => {
  $scope.getFile = () => {
    $scope.progress = 0

    FileReader.readAsDataUrl($scope.file, $scope)
      .then(result => {
          $scope.imageSrc = result
      })
  }

  $scope.$on("fileProgress", progress => {
    $scope.progress = progress.loaded / progress.total
  })
})

export { 
  postListModule,
  postCreateModule
}
